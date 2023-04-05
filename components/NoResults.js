import { styled, Box } from '@mui/material'
import { Desert } from '../images'

const StyledImage = styled('img')(({theme}) => ({
    //outline: '20px solid black',
}))

const NoResults = ({}) => (
    <StyledImage src={Desert.src} />
)

export default NoResults