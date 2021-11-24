const cloudinary = require('cloudinary');
require('dotenv').config();

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

exports.uploads = (file, folder) => {
    return new Promise(resolve => {
        cloudinary.uploader.upload(file, (result) => {
            resolve({
                id_media: result.public_id,
                media: result.url
            })
        },{
            resource_type: "auto",
            folder: folder
        })
    })
};
exports.destroys = (id_media) => {
    cloudinary.uploader.destroy(id_media)
}