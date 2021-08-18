const { Schema, model } = require('mongoose');

const POISchema = new Schema(
    {
        name: {
            type: String,
            require: true,
            unique: true 
        },
        rating: {
            type: Number,
        },
        img:{
            type:Image,

        },
        business_status: {
            type: String,
        },
        vicinity: {
            type: String,
        },


    }
)







module.exports = POISchema
