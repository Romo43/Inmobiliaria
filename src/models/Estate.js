const mongoose = require("mongoose");
const EstateSchema = mongoose.Schema({
    key: String,
    name: String,
    description: String,
    price: String,
    estate_type: {
        type: String,
        enum: ['HOUSE', 'DEPARTMENT']
    },
    estate_status:{
        type: String,
        enum: ['RENT', 'SALE']
    },
    status: {
        type: String,
        enum: ['SALE', 'SOLD'],
        default: 'SALE' 
    },
    imgs:{
        id_media: String,
        media: String
    },
    areas:[String],
    equipped:[String],
    details:{
        terrain: String,
        preserved: String,
        service_room: Boolean,
        rooms: Number,
        floors: Number,
        parking: Number,
        construction: String,
        old_estate: String,
        bathrooms: String,
        maintenance: String
    },
    location: {
        type: {
            type: String, 
            enum: ['Point'],
            required: true
        },
        coordinates: {
        type: [Number],
        required: true
        }
    }
    
    },{
        timestamps: true
    }
)

module.exports = mongoose.model('estates', EstateSchema)