import { Box } from '@mui/material'
import Image from 'next/image'
import { Image404 } from "../../images";
import TextBox from './TextBox';

const NotFound = ({ }) => {
    return (
        <Box sx={{ position: 'absolute', minWidth: '100vw', minHeight: '100vh', top: 0, left: 0 }}>
            <TextBox/>
            <Box sx={{ position: 'absolute', minWidth: '100vw', minHeight: '100vh', filter: ' contrast(120%)' }}>
                <Image objectFit='cover' src={Image404.src} layout='fill' />
            </Box>
        </Box>
    )
}

export default NotFound