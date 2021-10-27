import Estate from '../models/Estate'
import fs from 'fs-extra'
import cloudinary from '../helper/imageUpload'

// Get all estates
export const allEstates = async (req, res) =>{
    try {
        const data = await Estate.find()
        res.status(200).json(data)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

// Get estate by id
export const findEstate = async(req, res) =>{
    const id = req.params.id
    try {
        const data = await Estate.findById(id)
        res.status(200).json(data)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

// Create estate
export const createEstate = async(req, res) =>{
    const { key, name, description, price, type, estate_status, media, id_media, areas, equipped, terrain, preserved, service_room, rooms, floors, parking, construction, old_estate, bathrooms, maintenance, Coordinates} = req.body
        try {
            const result = await cloudinary.v2.uploader.upload(req.file.path , {public_id: '/AxioWeb'})
            const newEstate = new Estate({
                key: String,
                name: String,
                description: String,
                price: Number,
                type: {
                    type: String,
                    enum: ['HOUSE', 'DEPARTMENT']
                },
                estate_status:{
                    type: String,
                    enum: ['RENT', 'SALE']
                },
                status: {
                    type: String,
                    enum: ['SALE', 'SOLD']
                },
                Imgs:[{
                    url: String,
                    public_id: String
                }],
                Areas:[String],
                Equipped:[String],
                Details:{
                    terrain: Number,
                    preserved: String,
                    service_room: Boolean,
                    rooms: Number,
                    floors: Number,
                    parking: Number,
                    construction: Number,
                    old_estate: Number,
                    bathrooms: Number,
                    maintenance: Number
                },
                Location: {
                    Type: {
                        type: String, 
                        enum: ['Point'],
                        required: true
                    },
                    Coordinates: {
                    type: [Number],
                    required: true
                    }
                }
            })
            await News.create(newNews)
            await fs.unlink(req.file.path)
            res.status(201).json(newNews)
        } catch (error) {
            res.status(400).json({ message: err.message })
        }
}

// Update estate by id
export const updateEstate = async(req, res) =>{
    const id = req.params.id
        const { type_news, app, tag, version, title, description, id_media, media, day_begins, day_ends} = req.body
        try {
            const news = await News.findById(id)
            await cloudinary.v2.uploader.destroy(news.img.id_media)
            const result = await cloudinary.v2.uploader.upload(req.file.path)
            const newNews = new News({
                _id: id,
                type_news: type_news,
                app: app,
                tag: tag,
                version: version,
                title: title,
                description: description,
                img:{
                    id_media: result.public_id,
                    media: result.url
                },
                publication_date:{
                    day_begins: day_begins,
                    day_end: day_ends
                }
            })
            await News.findByIdAndUpdate(id, newNews)
            await fs.unlink(req.file.path)
            res.status(200).json({ message: 'News updated successfully'})
        } catch (err) {
            res.status(404).json({ message: err.message })
        }
}

// Update estate status 
export const statusEstate = async(req, res) =>{
    const id = req.params.id
    const status = req.params.status
    try {
        await Estate.findByIdAndUpdate(id, )
        res.status(201).json({ message: "Estate updated successfully" })
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

// Delete estate by id
export const deleteEstate = async(req, res) =>{
    const id = req.params.id;
        try{
            const data = await News.findById(id)
            await cloudinary.v2.uploader.destroy(data.img.id_media)
            await data.remove()
            res.status(200).json({ message: "News deleted successfully"})
        } catch (err) {
            res.status(404).json({ message: err.message })
        }
}