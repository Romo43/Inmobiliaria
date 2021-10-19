import { Schema, model } from 'mongoose'

const EstateSchema = new Schema({
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
    // ,
    // Contact:{
    //     employee_id: Schema.Types.ObjectId
    // }
    
    },{
        timestamps: true
    }
)

export default model('estates', EstateSchema)