import dbConnect from "../../../../utils/DbConnent";
import userModel from "../../../../utils/models/user";
import axios from "axios";
import { verifyToken } from "../../auth";

export default async function handler(req, res) {
    const { method, query, body } = req
    await dbConnect()

    let tokenData

    switch (method) {
        case "GET":
            try {
                tokenData = verifyToken(query.token)

                if (tokenData.isExpired) {
                    res.status(401).send({ message: "Token expired" })
                    break
                }
                console.log(query.id)
                let result = await userModel.findById(query.id).select('favourite')
                let favourite = await getFavouriteFromDB(result.favourite)
                res.status(200).send(favourite)
            } catch (err) {
                res.status(404).send({ message: "User not Found" })
            }
            break
        case "POST":
            try {
                tokenData = verifyToken(query.token)
                if (tokenData.isExpired) {
                    res.status(401).send({ message: "Token expired" })
                    break
                }
                if (tokenData.id !== query.id) {
                    res.status(401).send({ message: "Profile Id and Token Missmatch" })
                    break
                }

                await addToFavourite(body.newId, body.type, query.id)

                res.status(201).send({ message: "Added to Favourite" })
            } catch (err) {
                console.log(err)
                res.status(500).send({ message: "Something Went Wrong" })
            }
    }
}

const getFavouriteFromDB = async (data) => {

    return {
        people: await processData(data.people, 'person'),
        tv: await processData(data.tv, 'tv'),
        movie: await processData(data.movie, 'movie'),
    }
}

const processData = async (data, type) => {
    return Promise.all(data.map(async (singleFav) => {
        let res = (await axios.get(`https://api.themoviedb.org/3/${type}/${singleFav}?api_key=${process.env.TMDB_API_KEY}`)).data
        return {
            title: res.title ? res.title : res.name,
            posterPath: res.poster_path ? res.poster_path : res.profile_path,
            id: res.id,
        }
    }))


}

const addToFavourite = async (id, type, userId) => {

    let newKey = 'favourite.' + type
    console.log(newKey)
    let result = await userModel.findByIdAndUpdate(
        userId,
        {
            $addToSet: {
                [newKey]: id
            }
        }
    )
    console.log(result)
}