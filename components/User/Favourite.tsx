import { Typography, Box } from "@mui/material";
import { Carousel } from '../'
import axios from "axios";
import { useState, useEffect } from "react";

interface IProps {
    userId: string,
    token: string
}

interface ICarouselData {
    title: string,
    posterPath: string,
    id: number
}

interface IData {
    people?: ICarouselData[],
    tv?: ICarouselData[],
    movie?: ICarouselData[],
}

const Favourite = ({ userId, token }: IProps) => {
    const [Data, setData] = useState<IData>({})
    useEffect(() => {
        if (typeof userId !== 'undefined' && typeof token !== 'undefined') {
            axios.get(`/api/user/${userId}/favourite?token=${token}`).then(res => {
                setData(res.data)
            })
        }
    }, [userId, token])

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