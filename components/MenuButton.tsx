import { MenuItem, Typography, Button, ButtonBase } from '@mui/material'
import Link from 'next/link'

interface IProps {
    href?: string,
    children: JSX.Element | JSX.Element[] | string
    onClick?: (e?: React.MouseEvent<HTMLButtonElement,MouseEvent>) => void,
    sx?: object
}

const MenuButton = ({ href, children, onClick, sx }: IProps) => {
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