import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dtfvymy9c",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "AIREMAP/Files",
      resource_type: "auto",
      use_filename: true,
      unique_filename: false,
      transformation: [
        { quality: "auto", fetch_format: "auto" }, // applies to images only
      ],
    });

    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return null;
  }
};
