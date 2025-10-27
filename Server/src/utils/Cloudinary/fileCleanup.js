import fs from "fs/promises";

export const cleanupUploads = async (filesObj) => {
  if (!filesObj) return;

  const allFiles = [
    ...(filesObj.ecuFile || []),
    ...(filesObj.commonFiles || []),
  ];

  await Promise.all(
    allFiles.map(async (file) => {
      try {
        await fs.unlink(file.path);
      } catch (err) {
        console.warn("Failed to delete temp file:", file.path);
      }
    })
  );
};
