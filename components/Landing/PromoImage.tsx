import { Box, styled, Grid, Typography, Card, CardMedia, CardContent } from '@mui/material'

const MainBox = styled(Grid)(() => ({
    display: 'flex',
    flexDirection: 'column',
}))

interface IProps {
    imgSrc: string,
    children: string,
    title: string,
}

const PromoImage = ({ imgSrc, children, title }: IProps) => {
    return (
        <MainBox item xs={12} sm={4}>
            <Card sx={{padding: 1, background: 'none', boxShadow:'none'}}>
                <CardMedia
                    component='img'
                    image={imgSrc}
                    sx={{
                        maxHeight: 'clamp(200px, 30vw, 300px)',
                        minHeight: 'clamp(200px, 30vw, 300px)',
                        objectFit: 'contain',
                    }}
                />
                <CardContent>
                    <Typography variant='h4'>{title}</Typography>
                    <Typography>{children}</Typography>
                </CardContent>
            </Card>
        </MainBox>
    )
}

export default PromoImage