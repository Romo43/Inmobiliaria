import cloudinary from 'cloudinary'
import { CLOUDINARY } from "../config.js";

// Save configurations
cloudinary.v2.config({
    cloud_name: CLOUDINARY.NAME,
    api_key: CLOUDINARY.KEY,
    api_secret: CLOUDINARY.SECRET,
    secure: true
});

// Upload each image and get the public_id and url
const upload = async (file, folder) => {
    return new Promise(resolve => {
         cloudinary.uploader.upload(file, (result) => {
            resolve({
                id_media: result.public_id,
                media: result.secure_url
            })
        },{
            resource_type: "auto",
            folder: folder
        })
    })
};
// Destroy each image by means of the id_public
const destroy = async (id_media) => {
     cloudinary.uploader.destroy(id_media)
}

export { upload, destroy };