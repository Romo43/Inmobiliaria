import { Schema, model } from 'mongoose'

const EstateSchema = new Schema({
    Estate:{
        clave: String,
        name: String,
        description: String,
        price: Number,
        type: String,
        status: Boolean,
        images:[{
            url: String,
            public_id: String
        }],
        Areas:[String],
        Equipo:[String],
        Details:{
            terreno: Number,
            conservacion: String,
            service_room: Boolean,
            rooms: Number,
            floors: Number,
            parking: Number,
            construccion: Number,
            old_estate: Number,
            bathrooms: Number,
            mantenimiento: Number
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
        },
        Contact:{
            employee_id: Schema.Types.ObjectId
        }
    }
    },{
        timestamps: true
    }
)

export default model('estates', EstateSchema)