const Estate = require('../models/Estate');
const User = require('../models/User');
const Role = require('../models/Role');
const fs = require('fs-extra');
const cloudinary = require('../helper/imageUpload');
module.exports = class estateCtrl {

// Get all public estates
    static async allPublicEstates(req, res){
        try {
            const estates = await Estate.find();
            res.status(200).json(estates);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
// Get all user estates
    static async allUserEstates(req, res){
        try {
            const user = await User.findById(req.userId);
            const userEstates = await Estate.find({"contact.email": { $in: user.email}});
            res.status(200).json(userEstates);
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
        const { name, description, price, estate_type, estate_status, areas, equipped, terrain, preserved, service_room, rooms, floors, parking, construction, old_estate, bathrooms, maintenance, coordinates } = req.body;
        try {
            const user = await User.findById(req.userId);
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
                },
                contact:{
                    username: user.username,
                    email: user.email
                }
            });
            await Estate.create(newEstate);
            res.status(201).json({message: "Estate created successfully"});
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
// Update estate by id
    static async updateEstate(req, res){
        const id = req.params.id;
        const { name, description, price, estate_type, estate_status, areas, equipped, terrain, preserved, service_room, rooms, floors, parking, construction, old_estate, bathrooms, maintenance, coordinates, type } = req.body;
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
                },
                contact:{
                    username: data.contact.username,
                    email: data.contact.email
                }
            });
                await Estate.findByIdAndUpdate(id, newEstate);
            res.status(200).json({ message: 'Estate updated successfully'});
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
// Update estate status 
    static async updateEstateStatus(req, res){
        const id = req.params.id;
        try {
            const estate = await Estate.findById(id);
            if(!estate){
                res.status(404).json({ message: "This estate does not exist" });
            }
            if (estate.status === "SALE") {
                await Estate.updateOne({id}, {status: "SOLD"});
                res.status(200).json({ message: "Estate sold successfully" });
            }else{
                await Estate.updateOne({id}, {status: "SALE"});
                res.status(200).json({ message: "Estate for sale again" });
            }
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