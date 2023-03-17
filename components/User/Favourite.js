import { Typography, Box } from "@mui/material";
import { Carousel } from '../'
import axios from "axios";
import { useState, useEffect } from "react";

const Favourite = ({ userId }) => {
    const [Data, setData] = useState({})
    useEffect(() => {
        axios.get(`/api/user/${userId}/favourite`).then(res => {
            setData(res.data)
        })
    },[userId])

    return (
        <Box>
            <Typography>Favourites</Typography>
            {Data.movie && <Carousel data={Data.movie} title="Movies" type='movie' />}
            {Data.tv && <Carousel data={Data.tv} title="TV Shows" type='tv' />}
            {Data.people && <Carousel data={Data.people} title="People" type='people' />}
        </Box>
    )
}

export default Favourite