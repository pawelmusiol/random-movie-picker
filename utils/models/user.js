import { Schema, model, models } from 'mongoose'

const userSchema = new Schema({
    displayName: {
        type: String,
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    providers: [{
        type: Number,
        default: [undefined],
    }]
})

export default models.User || model('User', userSchema)