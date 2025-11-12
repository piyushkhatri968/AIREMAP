import EcuFile from "../models/ecuFile.model.js";
import { sendResponse } from "../utils/sendResponse.js";
import { uploadToCloudinary } from "../utils/Cloudinary/uploadDataToCloudinary.js";
import fs from "fs/promises";
import { sendEcuFileCreatedEmailConfirmation } from "../utils/EmailTemplates/sendEcuFileCreatedEmailConfirmation.js";
import { sendEmail } from "../utils/SendEmails/sendEmail.js";
import Auth from "../models/auth.model.js";
import { cleanupUploads } from "../utils/Cloudinary/fileCleanup.js";

export const CreateEcuFile = async (req, res) => {
  const {
    ecuId,
    make,
    masterSlave,
    model,
    notes,
    options,
    readTool,
    readType,
    registration,
    stage,
    transmission,
    year,
  } = req.body;

  try {
    if (
      !ecuId ||
      !make ||
      !masterSlave ||
      !model ||
      !readTool ||
      !readType ||
      !registration ||
      !stage ||
      !transmission ||
      !year
    ) {
      await cleanupUploads(req.files);
      return sendResponse(res, 400, false, "All fields are required", null);
    }

    if (!req.files.ecuFile?.[0]) {
      await cleanupUploads(req.files);
      return sendResponse(res, 400, false, "ECU file is required", null);
    }

    if (req.user.credits < 1) {
      await cleanupUploads(req.files);
      return sendResponse(
        res,
        400,
        false,
        "You must have at least 1 credit to submit a file",
        null
      );
    }

    const existing = await EcuFile.findOne({ registration });
    if (existing) {
      await cleanupUploads(req.files);
      return sendResponse(
        res,
        400,
        false,
        "Registration No already used",
        null
      );
    }

    // CREDITS LOGIC
    let creditsNeed = 1; // default 1

    // Helper lists
    const ecuPrefixes = [
      "ME7",
      "MED17",
      "MJ10",
      "EDC17",
      "MG1",
      "MD1",
      "MEVD7",
      "MEV17",
    ];

    const oneCreditStages = ["Gear Box", "Original File (Back To Stock)"];
    const twoCreditStages = ["ECU Cloning"];
    const optionBasedStages = ["No Engine Mud", "Eco", "Stage 1", "Stage 2"];

    const paidOptions1Credit = [
      "CVN FIX",
      "POP & BANG (PETROL ONLY)",
      "ENCRYPT / DECRYPT (Includes 1 Encrypt and 1 Decrypt)",
      "FLEX FUEL E85",
      "ORIGINAL FILE REQUEST",
      "ADDITIONAL SOLUTIONS ADDED TO MASTER FILE",
    ];
    const paidOptions2Credit = ["IMMO OFF"];

    // normalize values
    const ecu = ecuId?.trim() || "";
    const stg = stage?.trim() || "";
    const opts = options ? options.split(",").map((o) => o.trim()) : [];

    // (1) ECU-based logic
    const ecuMatch = ecuPrefixes.some((prefix) =>
      ecu.toUpperCase().includes(prefix)
    );
    if (ecuMatch) {
      creditsNeed = 2;
    }

    // (2) Stage-based logic
    if (oneCreditStages.includes(stg)) {
      creditsNeed = 1;
    } else if (twoCreditStages.includes(stg)) {
      creditsNeed = 2;
    } else if (optionBasedStages.includes(stg)) {
      // (3) Option-based logic
      let extraCredits = 0;
      for (const opt of opts) {
        if (paidOptions2Credit.includes(opt)) extraCredits += 2;
        else if (paidOptions1Credit.includes(opt)) extraCredits += 1;
      }

      // if base ecu was already 2, add them up
      creditsNeed += extraCredits;
    }

    // upload ecu file
    let ecuFileUrl;
    if (req?.files?.ecuFile?.[0]) {
      const ecuFilePath = req.files.ecuFile[0].path;
      const cloudinaryUrl = await uploadToCloudinary(ecuFilePath);
      await fs.unlink(ecuFilePath).catch(() => { }); // safe cleanup
      if (!cloudinaryUrl) {
        return sendResponse(res, 500, false, "Failed to upload ECU file", null);
      }
      ecuFileUrl = cloudinaryUrl;
    }

    // upload additional files
    let commonFilesUrls = [];
    if (req?.files?.commonFiles) {
      const uploads = req.files.commonFiles.map((file) =>
        uploadToCloudinary(file.path)
      );
      commonFilesUrls = await Promise.all(uploads);
      await Promise.all(
        req.files.commonFiles.map((f) => fs.unlink(f.path).catch(() => { }))
      );
    }

    const newEcuFile = await EcuFile.create({
      userId: req.user._id,
      ticketNumber: registration,
      make,
      model,
      year,
      registration,
      ecuId,
      transmission,
      readType,
      readTool,
      masterSlave,
      stage,
      notes,
      modificationOptions: options,
      originalFile: ecuFileUrl,
      additionalFiles: commonFilesUrls,
      creditsNeed,
    });

    // update userfileUpload count
    await Auth.findByIdAndUpdate(
      req.user._id,
      {
        $inc: { totalFilesSubmitted: Number(1) },
      },
      { new: true }
    );

    const emailTemplate = sendEcuFileCreatedEmailConfirmation({
      firstName: req.user.firstName,
      ticketNo: newEcuFile.ticketNumber,
    });

    try {
      await sendEmail({
        to: req.user.email,
        html: emailTemplate,
        subject: "Ticket Created succesfully",
      });
    } catch (error) {
      console.error("Email send failed:", error.message);
    }

    return sendResponse(res, 201, true, "ECU File created successfully", null);
  } catch (error) {
    console.error("Error in CreateEcuFile controller", error);
    await cleanupUploads(req.files);
    return sendResponse(
      res,
      500,
      false,
      error.message || "Internal Server Error",
      null
    );
  }
};

export const GetEcuFiles = async (req, res) => {
  try {
    let userId = req.user._id;
    const data = await EcuFile.find({ userId })
      .select(
        "make model registration ticketNumber creditsUsed creditsNeed readTool readType status createdAt"
      )
      .sort({ createdAt: -1 });
    return sendResponse(res, 200, true, "Ecu Files fetched succesfully", data);
  } catch (error) {
    console.error("Error in GetEcuFiles controller", error);
    return sendResponse(
      res,
      500,
      false,
      error.message || "Internal Server Error",
      null
    );
  }
};

export const GetTicketDetails = async (req, res) => {
  try {
    const { ticketNumber } = req.params;
    if (!ticketNumber) {
      return sendResponse(res, 400, false, "Ticker Number is required", null);
    }
    const response = await EcuFile.findOne({ ticketNumber }).populate(
      "userId",
      "firstName lastName email"
    );
    if (!response) {
      return sendResponse(res, 404, false, "Ticket not found", null);
    }
    return sendResponse(
      res,
      200,
      true,
      "Ticket details fetched successfully",
      response
    );
  } catch (error) {
    console.error("Error in GetTicketDetails controller", error);
    return sendResponse(
      res,
      500,
      false,
      error.message || "Internal Server Error",
      null
    );
  }
};

export const EligibleToDownload = async (req, res) => {
  try {
    const { ticketNumber } = req.body;
    if (!ticketNumber) {
      return sendResponse(res, 400, false, "Ticket number is required", null);
    }
    const ecuFile = await EcuFile.findOne({
      ticketNumber,
      userId: req.user._id,
    });

    if (!ecuFile) {
      return sendResponse(res, 404, false, "Ticket not found", null);
    }

    const userCredits = req.user.credits;
    const creditsNeed = ecuFile.creditsNeed;

    // Check credit eligibility
    if (userCredits < creditsNeed) {
      return sendResponse(
        res,
        403,
        false,
        `You need ${creditsNeed} credits to download this file.`,
        { eligible: false }
      );
    }

    // Deduct user credits
    await Auth.findByIdAndUpdate(
      req.user._id,
      {
        $inc: { credits: -Number(creditsNeed) },
      },
      { new: true }
    );

    ecuFile.creditsNeed = 0;
    await ecuFile.save();

    let message = creditsNeed === 0 ? null : `${creditsNeed} credits used for downloading the file`

    return sendResponse(
      res,
      200,
      true,
      "You are eligible to download the file",
      {
        eligible: true,
        message: message
      }
    );
  } catch (error) {
    console.error("Error in EligibleToDownload controller", error);
    return sendResponse(
      res,
      500,
      false,
      error.message || "Internal Server Error",
      null
    );
  }
};

export const QueueFiles = async (req, res) => {
  try {
    const data = await EcuFile.countDocuments({ userId: req.user._id, status: "In Progress" })
    return sendResponse(res, 200, true, "Queue Files fetched succesfully", data);
  } catch (error) {
    console.error("Error in FileRoomAndQueueStatus controller", error);
    return sendResponse(
      res,
      500,
      false,
      error.message || "Internal Server Error",
      null
    );
  }
}
