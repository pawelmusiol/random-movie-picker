import { Box, TextField, styled } from '@mui/material'
import { useState } from 'react'
import { SearchDialog } from '..'
import { Search } from '../../icons'

const MainBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '2px solid black',
    width: '30%',
    transition: '.4s',
    //backgroundColor: 'white',
    cursor: 'text',
    '&:hover': {
        width: '35%',
    },
    '& *':{
        cursor: 'text'
    }
}))

const StyledTextField = styled(TextField)(({ theme }) => ({
    borderTop: 'hidden'
}))

const SearchBox = ({ }) => {
    const [OpenDialog, setOpenDialog] = useState(false)
    console.log(OpenDialog)
    return (
        <MainBox /* onClick={() => setOpenDialog(true)} */>
            <img src={Search.src} style={{ maxHeight: '24px' }} onClick={() => setOpenDialog(true)}/>
            <StyledTextField
            onClick={() => setOpenDialog(true)}
                variant="standard"
                fullWidth
                disabled
                InputProps={{
                    disableUnderline: true,
                }}
            />
            <SearchDialog open={OpenDialog} setOpen={setOpenDialog} onClose={() => setOpenDialog(false)} />
        </MainBox>
    )
}

export default SearchBox