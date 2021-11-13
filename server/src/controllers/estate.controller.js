import Estate from '../models/Estate'
import fs from 'fs-extra'
import cloudinary from '../helper/imageUpload'

// Get all estates
export const allEstates = async (req, res) => {
    try {
        const estates = await Estate.find().sort()
        if (!estates) {
            res.status(404).json({ message: "There are not estates"})
        }
        res.status(200).json(estates)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}
// Get estate by id
export const findEstate = async (req, res) => {
    const id = req.params.id
    try {
        const estate = await Estate.findById(id)
        // if (!estate) {
        //     res.status(404).json({ message: "This estate does not exist"})
        //     next();
        // }
        res.status(200).json(estate)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}
// Create estate
export const createEstate = async (req, res) => {
    const { key, name, description, price, estate_type, estate_status, areas, equipped, terrain, preserved, service_room, rooms, floors, parking, construction, old_estate, bathrooms, maintenance, coordinates, type} = req.body
    try {
        const result = await cloudinary.v2.uploader.upload(req.file.path , {folder: 'AxioWeb'})
        const newEstate = new Estate({
            key,
            name,
            description,
            price,
            estate_type,
            estate_status,
            imgs:{
                id_media: result.public_id,
                media: result.url
            },
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
                type: type,
                coordinates
            }
        })
        await Estate.create(newEstate)
        await fs.unlink(req.file.path)
        res.status(201).json(newEstate)
    } catch (err) {
        await fs.unlink(req.file.path)
        res.status(400).json({ message: err.message })
    }
}
// Update estate by id
export const updateEstate = async (req, res) => {
    const id = req.params.id
    const { key, name, description, price, estate_type, estate_status, areas, equipped, terrain, preserved, service_room, rooms, floors, parking, construction, old_estate, bathrooms, maintenance, coordinates, type} = req.body
    try {
        const estate = await Estate.findById(id)
        await cloudinary.v2.uploader.destroy(estate.imgs.id_media)
        const result = await cloudinary.v2.uploader.upload(req.file.path, {folder: "AxioWeb"})
        const newEstate = new Estate({
            _id: id,
            key: key,
            name: name,
            description: description,
            price: price,
            estate_type: estate_type,
            estate_status: estate_status,
            imgs:{
                id_media: result.public_id,
                media: result.url
            },
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
        await Estate.findByIdAndUpdate(id, newEstate)
        await fs.unlink(req.file.path)
        res.status(200).json({ message: 'Estate updated successfully'})
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}
// Update estate status 
export const statusEstate = async (req, res) => {
    const id = req.params.id
    const { status } = req.body
    try {
        const estate = await Estate.findById(id)
        if(!estate){
            res.status(404).json({ message: "This estate does not exist" })
        }
        if (status === true) {
            await Estate.updateOne(id, {status: false})
        }else{
            await Estate.updateOne(id, {status: true})
        }
        res.status(201).json({ message: "Estate updated successfully" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}
// Delete estate by id
export const deleteEstate = async (req, res) => {
    const id = req.params.id;
        try{
            const data = await Estate.findById(id)
            await cloudinary.v2.uploader.destroy(data.imgs.id_media)
            await data.remove()
            res.status(200).json({ message: "Estate deleted successfully"})
        } catch (err) {
            res.status(404).json({ message: err.message })
        }
}