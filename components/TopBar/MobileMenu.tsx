import { Box, Button, ButtonBase, Collapse, styled } from '@mui/material'
import { useEffect, useState } from 'react'

const MainBox = styled(Box, {
    shouldForwardProp: prop => prop !== 'open'
})<{ open: boolean }>(({ open, theme }) => ({
    height: '100vh',
    width: '100vw',
    paddingTop: '10vh',
    backgroundColor: theme.palette.primary.main,
    position: 'absolute',
    left: 0,
    top: open ? 0 : '-100vh',
    transition: '.3s',
    //zIndex: 1100,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
}))

interface IProps {
    open: boolean,
    children: string | JSX.Element | JSX.Element[]
}

const MobileMenu = ({ open, children }) => {


    const [MountBox, setMountBox] = useState(false)
    const [Open, setOpen] = useState(false)
    useEffect(() => {
        if (open) {
            setOpen(open)
            let timer = setTimeout(() => {
                setMountBox(open)
            }, 100)
            return () => clearTimeout(timer);
        }
        else {
            setMountBox(open)
            let timer = setTimeout(() => {
                setOpen(open)
            }, 400)
            return () => clearTimeout(timer);
        }
    }, [open])

    return (
        <>
            {Open &&
                < MainBox open={MountBox}>
                    {children}
                </MainBox>
            }
        </>
    )
}

export default MobileMenu