import { styled } from '@mui/material'
import { StarEmpty, StarHalf, StarFilled } from "../icons";

const SingleStar = styled('img')({
    height: 20,
    width: 20,
})

interface IProps {
    rating: number
}

const VoteStars = ({ rating }: IProps) => {

    let stars = []

    for (let i = 0; i < Math.round(rating * 2); i += 2) {
        if (Math.round(rating * 2) - i === 1) {
            stars.push(<SingleStar src={StarHalf.src} />)
        }
        else {
            stars.push(<SingleStar src={StarFilled.src} />)
        }
    }
    if (stars.length < 10) {
        let len = 10 - stars.length
        for (let i = 0; i < len; i++) {
            stars.push(<SingleStar src={StarEmpty.src} />)

        }
    }

    return (
        <>
            {stars}
        </>
    )
}

export default VoteStars