import { v2 as cloudinary } from "cloudinary";
import path from "path";

cloudinary.config({
  cloud_name: "dtfvymy9c",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImageToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "Eventify/Images",
      resource_type: "image",
      transformation: [{ quality: "auto", fetch_format: "auto" }],
    });
    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary image upload error:", error);
    return null;
  }
};

export const uploadFileToCloudinary = async (filePath) => {
  try {
    const ext = path.extname(filePath).toLowerCase();

    // allow only PDFs or Word docs
    const allowedExtensions = [".pdf", ".doc", ".docx"];
    if (!allowedExtensions.includes(ext)) {
      throw new Error("Invalid file type. Only PDF or DOC/DOCX allowed.");
    }

    const result = await cloudinary.uploader.upload(filePath, {
      folder: "Eventify/Files",
      resource_type: "raw", // raw = any non-image file (PDF, ZIP, DOC, etc.)
      use_filename: true,
      unique_filename: false,
    });

    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary file upload error:", error);
    return null;
  }
};
