import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dtfvymy9c",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const deleteFromCloudinary = async (fileUrl) => {
  try {
    if (!fileUrl) return;

    // extract everything after /upload/
    const match = fileUrl.match(/\/upload\/(?:v\d+\/)?(.+)$/);
    if (!match) {
      console.warn("Could not parse Cloudinary URL:", fileUrl);
      return;
    }

    // decode spaces (%20) and special chars
    const decodedId = decodeURIComponent(match[1]);

    const resourceType = fileUrl.includes("/image/")
      ? "image"
      : fileUrl.includes("/video/")
      ? "video"
      : "raw";

    await cloudinary.uploader.destroy(decodedId, {
      resource_type: resourceType,
    });
  } catch (error) {
    console.error("Cloudinary deletion error:", error.message);
  }
};
