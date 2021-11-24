const Estate = require('../models/Estate.js');
const fs = require('fs-extra');
const cloudinary = require('../helper/imageUpload.js');
module.exports = class estateCtrl {
// Get all estates
    static async allEstates(req, res){
        try {
            const estates = await Estate.find();
            if (estates === null) {
                res.status(404).json({ message: "There are not estates"});
            }
            res.status(200).json(estates);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
// Get estate by id
    static async findEstate(req, res){
        const id = req.params.id;
        try {
            const estate = await Estate.findById(id);
            res.status(200).json(estate);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
// Create estate
    static async createEstate(req, res){
        const { key, name, description, price, estate_type, estate_status, areas, equipped, terrain, preserved, service_room, rooms, floors, parking, construction, old_estate, bathrooms, maintenance, coordinates} = req.body;
        try {
            const uploader = async (path) => await cloudinary.uploads(path , 'AxioWeb');
            const urls = [];
            const files = req.files;
            for(const file of files){
                const {path} = file;
                const newPath = await uploader(path);
                urls.push(newPath)
                fs.unlinkSync(path);
            }
            const newEstate = new Estate({
                key,
                name,
                description,
                price,
                estate_type,
                estate_status,
                imgs: urls,
                areas,
                equipped,
                details:{
                    terrain,
                    preserved,
                    service_room,
                    rooms,
                    floors,
                    parking,
                    construction,
                    old_estate,
                    bathrooms,
                    maintenance
                },
                location: {
                    coordinates
                }
            })
            await Estate.create(newEstate);
            res.status(201).json({message: "Estate created successfully"});
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
// Update estate by id
    static async updateEstate(req, res){
        const id = req.params.id;
        const { key, name, description, price, estate_type, estate_status, areas, equipped, terrain, preserved, service_room, rooms, floors, parking, construction, old_estate, bathrooms, maintenance, coordinates, type} = req.body;
        try {
            const data = await Estate.findById(id);
            // Destroy imgs
            const images = data.imgs;
            for(const image of images){
                const id_media = image.id_media;
                cloudinary.destroys(id_media);
            }
            // Upload imgs
            const uploader = async (path) => await cloudinary.uploads(path , 'AxioWeb');
            const urls = [];
            const files = req.files;
            for(const file of files){
                const {path} = file;
                const newPath = await uploader(path);
                urls.push(newPath)
                fs.unlinkSync(path);
            }
                const newEstate = new Estate({
                    _id: id,
                    key: key,
                    name: name,
                    description: description,
                    price: price,
                    estate_type: estate_type,
                    estate_status: estate_status,
                    imgs: urls,
                    areas: areas,
                    equipped: equipped,
                    details:{
                        terrain: terrain,
                        preserved: preserved,
                        service_room: service_room,
                        rooms: rooms,
                        floors: floors,
                        parking: parking,
                        construction: construction,
                        old_estate: old_estate,
                        bathrooms: bathrooms,
                        maintenance: maintenance
                    },
                    location: {
                        type: type,
                        coordinates: coordinates
                    }
                })
                await Estate.findByIdAndUpdate(id, newEstate);
            res.status(200).json({ message: 'Estate updated successfully'});
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
// Update estate status 
    static async statusEstate(req, res){
        const id = req.params.id;
        try {
            const estate = await Estate.findById(id);
            if(!estate){
                res.status(404).json({ message: "This estate does not exist" });
            }
            if (estate.status === "SALE") {
                await Estate.updateOne({id}, {status: "SOLD"});
            }else{
                await Estate.updateOne({id}, {status: "SALE"});
            }
            res.status(200).json({ message: "Estate updated successfully" });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
// Delete estate by id
    static async deleteEstate(req, res){
        const id = req.params.id;
        try{
            const data = await Estate.findById(id);
            const images = data.imgs;
            for(const image of images){
                const id_media = image.id_media;
                cloudinary.destroys(id_media);
            }
            await data.remove();
            res.status(200).json({ message: "Estate deleted successfully"});
        } catch (err) {
            res.status(404).json({ message: err.message });
            
        }
    }
}