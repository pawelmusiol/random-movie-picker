import { MenuItem, Typography, Button } from '@mui/material'
import Link from 'next/link'

const MenuButton = ({ href, children, onClick }) => {

    const Inner = <MenuItem>
        <Typography variant="h6">
            {children}
        </Typography>
    </MenuItem>

    if (href) {
        return (
            <Link href={href} onClick={onClick}>
                {Inner}
            </Link>
        )
    } 
    else {
        return (
            <Button onClick={onClick} sx={{color: 'white'}}>
                {Inner}
            </Button>
        )
    }
}

export default MenuButton;