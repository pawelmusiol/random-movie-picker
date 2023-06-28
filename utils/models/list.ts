import { Schema, model, models, Model } from 'mongoose'

interface IList {
    name: string,
    private: boolean,
    users: {
        name: string,
        _id: string,
        isOwner: boolean,
        isAdmin: boolean,
    }[],
    requests: {
        name: string,
        _id: string,
        status: string,
    }[],
    films: IFilm[],
    queue: {
        id: number,
        name: string,
        type: string,
    }[]
}

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

const film = {
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
}

const listSchema = new Schema<IList>({
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
        isOwner: {
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
        ...film,
        addedBy: shortUser
    }],
    queue: [film]
})



export default (models.List as Model<IList>) || model<IList>('List', listSchema)