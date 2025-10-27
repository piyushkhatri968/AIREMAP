import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dtfvymy9c",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (filePath) => {
  try {
    const fileName = filePath.split("\\").pop().split("/").pop(); // get filename with ext
    const folder = "AIREMAP/Files";

    // Force raw type so Cloudinary keeps extension for all file types
    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      resource_type: "raw", // this keeps extensions consistent for all
      use_filename: true,
      unique_filename: false,
      public_id: fileName.replace(/\.[^/.]+$/, ""), // remove extension in ID (Cloudinary adds it internally)
    });

    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error.message);
    return null;
  }
};
