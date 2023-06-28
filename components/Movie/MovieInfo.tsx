import { Typography } from "@mui/material";

interface IProps {
    budget: number,
    revenue: number,
}
const MovieInfo = ({budget, revenue }) => {
    const displayNumber = (num) => {
        num = new String(num)
        let result = ''
        for (let i = 0; i < num.length; i++) {
            result += num[i]
            if ((num.length - i - 1) % 3 === 0) result += ' '
        }
        return result
    }
    return (
        <>
            <Typography>Budget: {displayNumber(budget)} $</Typography>
            <Typography>Boxoffice: {displayNumber(revenue)} $</Typography>
        </>
    )
}

export default MovieInfo