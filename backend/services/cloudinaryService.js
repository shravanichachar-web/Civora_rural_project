import { v2 as cloudinary } from 'cloudinary';

const isCloudinaryConfigured = () => {
  return (
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_CLOUD_NAME !== 'your_cloud_name' &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  );
};

if (isCloudinaryConfigured()) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

export const uploadToCloudinary = (fileBuffer, folder = 'civora_complaints') => {
  return new Promise((resolve, reject) => {
    if (!isCloudinaryConfigured()) {
      // Fallback: If Cloudinary credentials aren't provided in .env during local testing, return base64 Data URI
      const base64Image = `data:image/jpeg;base64,${fileBuffer.toString('base64')}`;
      return resolve(base64Image);
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: folder },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );

    uploadStream.end(fileBuffer);
  });
};
