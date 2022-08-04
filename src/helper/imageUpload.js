import cloudinary from "cloudinary";
import fs from "fs-extra";
import { CLOUDINARY } from "../config/config.js";

// Cloudinary configuration
cloudinary.config({
  cloud_name: CLOUDINARY.NAME,
  api_key: CLOUDINARY.KEY,
  api_secret: CLOUDINARY.SECRET,
  secure: true,
});

// Upload each image
const generateUrl = async (files) => {
  const urls = [];
  for (const file of files) {
    const url = await upload(file.path);
    urls.push(url);
    fs.unlinkSync(file.path);
  }

  return urls;  
};

// Destroy each image
const destroyUrls = async (images) =>{
  for (const image of images) {
    await destroy(image.id_media);
  }
}

// Upload image and get the public_id
const upload = async (file) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(
      file,
      (result) => {
        resolve({
          id_media: result.public_id,
          media: result.secure_url,
        });
      },
      {
        resource_type: "auto",
        folder: "AxioWeb",
      }
    );
  });
};

// Destroy image by id_media
const destroy = async (id_media) => {
  await cloudinary.v2.uploader.destroy(id_media);
};

export { generateUrl, destroyUrls };
