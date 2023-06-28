import { Typography } from "@mui/material";

interface IProps {
    firstEpisode: string,
    lastEpisode: string,
    inProduction: boolean
}

const TvInfo = ({ firstEpisode, lastEpisode, inProduction }:IProps) => {
    return (
        <>
            <Typography>First Episode {firstEpisode}</Typography>
            <Typography>Last Episode {lastEpisode}</Typography>
            <Typography>In Production: {inProduction ? '🟢' : '🔴'}</Typography>
        </>
    )
}

export default TvInfo