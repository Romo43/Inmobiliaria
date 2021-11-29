const cloudinary = require('cloudinary');
require('dotenv').config();

// Save configurations
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

// Upload each image and get the public_id and url
exports.uploads = (file, folder) => {
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
exports.destroys = (id_media) => {
    cloudinary.uploader.destroy(id_media)
}