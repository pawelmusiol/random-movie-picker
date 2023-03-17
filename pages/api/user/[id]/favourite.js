import dbConnect from "../../../../utils/DbConnent";
import userModel from "../../../../utils/models/user";
import axios from "axios";

export default async function handler(req, res) {
    const { method, query, body } = req
    await dbConnect()

    switch (method) {
        case "GET":
            let result = await userModel.findById(query.id).select('favourite')
            let favourite = await getFavouritesFromDB(result.favourite)
            console.log(favourite)
            res.send(favourite)
            break
        case "POST":
            await addToFavourites(body.newId, body.type, query.id)

            res.send('dupa')
    }
}

const getFavouritesFromDB = async (data) => {

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
        }
    }))


}

const addToFavourites = async (id, type, userId) => {

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