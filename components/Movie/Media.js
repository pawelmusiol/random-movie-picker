import { Typography, Grid, Box,styled } from "@mui/material"

const MovieImage = styled('img')(({aspect}) => ({
    //width: '100%',
    height: '100%'
}))

const ImageBox = ({src}) => (
    <Grid item /* xs={6} */ sx={{height:'calc(50% - .5px)'}} >
        <MovieImage src={src}/>
    </Grid>
)

const MediaBox = styled(Box)(({theme}) => ({
    
}))

const Media = ({videos, images}) => {
    return (
        <Box sx={{display: 'flex', justifyContent:'center'}}>
            {videos.length &&
            <iframe 
            style={{minWidth:'50%', aspectRatio:'16 / 9'}}
            src={`https://www.youtube.com/embed/${videos[0].key}`}
            title="YouTube video player" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowfullscreen/>
            }
            {images.length &&
            <Grid container sx={{minWidth: '50%', aspectRatio: '16/9' }}>
            <ImageBox src={"https://image.tmdb.org/t/p/w500"+images[images.length-1].file_path} />
            <ImageBox src={"https://image.tmdb.org/t/p/w500"+images[images.length-2].file_path} />
            <ImageBox src={"https://image.tmdb.org/t/p/w500"+images[images.length-3].file_path} />
            <ImageBox src={"https://image.tmdb.org/t/p/w500"+images[images.length-4].file_path} />
            </Grid>
            }
        </Box>
    )
}

export default Media