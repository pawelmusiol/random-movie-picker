import { Schema, model, models, Model } from 'mongoose'

interface IUser {
    displayName?: string,
    name: string,
    email: string,
    password: string,
    providers: number[],
    image?: string,
    favourite: {
        movie: number[],
        tv: number[],
        people: number[],
    }
}

const userSchema = new Schema<IUser>({
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
    }],
    image: {
        type: String,
    },
    favourite: {
        movie: [{
            type: Number,
            default: [undefined],
        }],
        tv: [{
            type: Number,
            default: [undefined],
        }],
        people: [{
            type: Number,
            default: [undefined],
        }]
    }
})

export default (models.User as Model<IUser>) || model<IUser>('User', userSchema)