import axios from "axios"
import { useState } from 'react'
import { CreateList, ListsList } from "../../components"
import { styled } from '@mui/material'
import { Add } from "../../icons"

const AddButton = styled('img')(({ theme }) => ({
    cursor: 'pointer',
    float: 'right',
    backgroundColor: theme.palette.primary.main,
    borderRadius: 4,

}))

const Index = () => {

    const [OpenDialog, setOpenDialog] = useState(false)

    return (
        <>
            <AddButton src={Add.src} onClick={() => setOpenDialog(true)} />
            <CreateList open={OpenDialog} onClose={() => setOpenDialog(false)} />
            <ListsList />
        </>
    )
}

export default Index