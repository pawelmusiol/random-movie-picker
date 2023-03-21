import { MenuItem, Typography, Button, ButtonBase } from '@mui/material'
import Link from 'next/link'

const MenuButton = ({ href, children, onClick, sx }) => {
    const Inner = <MenuItem>
        <Typography variant="h6" sx={{ ...sx }}>
            {children}
        </Typography>
    </MenuItem>

    if (href) {
        return (
            <ButtonBase onClick={onClick}>
                <Link href={href}>
                    {Inner}
                </Link>
            </ButtonBase>
        )
    }
    else {
        return (
            <Button onClick={onClick} sx={{ color: 'white' }}>
                {Inner}
            </Button>
        )
    }
}

export default MenuButton;