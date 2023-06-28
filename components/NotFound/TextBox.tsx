import { Box, Button, styled, Typography } from '@mui/material'
import { useRouter } from 'next/router'


const MainBox = styled(Box)(({ theme }) => ({
    position: 'absolute',
    textAlign: 'center',
    left: 'clamp(20px, 4%, 50px)',
    top: '45%',
    transform: 'translateY(-50%)',
    zIndex: 2,
    width: 'clamp(300px, 50%, 1000px)',
    color: '#ccc',
    '& *':{
        textShadow: 'rgba(255,255,255,0.9) 0px 0px 39px',
    },
    '& button': {
        textShadow: ` ${theme.palette.primary.main} 0px 0px 39px`,
    },
    '& h1': {
        textShadow: ` ${theme.palette.error.light} 0px 0px 39px`,
    }
}))

const TextBox = () => {
    const router = useRouter()

    return (
        <MainBox>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', marginBottom: 10 }}>
                <Typography variant='h2'>Wooops...</Typography>
                <Typography variant="h1">404</Typography>
            </Box>
            <Typography sx={{ fontSize: '2rem' }}>You are looking for something that we do not have :(</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Button sx={{ fontSize: '2rem' }} onClick={() => router.push('/')}>Go back</Button>
                <Typography sx={{ fontSize: '2rem' }}> and try again</Typography>
            </Box>

        </MainBox>
    )
}

export default TextBox