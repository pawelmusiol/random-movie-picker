import { styled } from '@mui/material'

const OuterDiv = styled('div')(({open}) => ({
    width: '60px',
    height: '45px',
    position: 'relative',
    margin: '50px auto',
    transform: 'rotate(0deg) scale(.7)',
    transition: '.5s ease-in-out',
    cursor: 'pointer',
    zIndex: 1102,
    margin:0,

    '& > span:nth-child(even)': {
        left: '50%',
        borderRadius: '0 9px 9px 0',
    },
    '& > span:nth-child(odd)': {
        left: 0,
        borderRadius: '9px 0 0 9px',
    },
    '& > span:nth-child(1)':{
        top: open ? 7 : 0,
        left: open ? 5 : '',
        transform: open ? 'rotate(45deg)' : '',
    },
    
    '& > span:nth-child(2)':{
        top: open ? 7 : 0,
        left: open ? 'calc(50% - 5px)' : '',
        transform: open ? 'rotate(-45deg)' : '',
    },
    '& > span:nth-child(3)':{
        left: open ? '-50%' : '',
        opacity: open ? 0 : '',
        top: 18,
    },
    '& > span:nth-child(4)':{
        left: open ? '100%' : '',
        opacity: open ? 0 : '',
        top: 18,
    },
    '& > span:nth-child(5)':{
        top: open ? 29 : 36,
        left: open ? 5 : '',
        transform: open ? 'rotate(-45deg)' : '',
    },
    '& > span:nth-child(6)':{
        top: open ? 29 : 36,
        left: open ? 'calc(50% - 5px)' : '',
        transform: open ? 'rotate(45deg)' : '',
    },
}))

const Span = styled('span')({
    display: 'block',
    position: 'absolute',
    height: '9px',
    width: '50%',
    background: 'white',
    opacity: 1,
    transform: 'rotate(0deg)',
    transition: '.25s ease-in-out',
})


const HamburgerIcon = ({open, onClick}) => {

    
    return (
        <OuterDiv open={open} onClick={onClick}>
            <Span></Span>
            <Span></Span>
            <Span></Span>
            <Span></Span>
            <Span></Span>
            <Span></Span>
        </OuterDiv>
    )
}

export default HamburgerIcon