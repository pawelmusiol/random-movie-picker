import { Typography } from "@mui/material";

const TvInfo = ({ firstEpisode, lastEpisode, inProduction }) => {
    return (
        <>
            <Typography>First Episode {firstEpisode}</Typography>
            <Typography>Last Episode {lastEpisode}</Typography>
            <Typography>In Production: {inProduction ? '🟢' : '🔴'}</Typography>
        </>
    )
}

export default TvInfo