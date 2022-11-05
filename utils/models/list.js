import { Schema, model, models } from 'mongoose'

const shortUser = {
    name: {
        type: String,
        required: true,
    },
    _id: {
        type: Schema.Types.ObjectId,
        required: true,
    }
}

const listSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    private: {
        type: Boolean,
        required: true,
        default: true,
    },
    users: [{
        ...shortUser,
        isOwner:{
            type: Boolean,
            required: true,
            default: false,
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        }
    }],
    requests: [{
        ...shortUser,
        status: {
            type: String,
            required: true,
            default: 'pending'
        }
    }],
    films: [{
        id: {
            type: Number,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        addedBy: shortUser
    }]
})



export default models.List || model('List', listSchema)