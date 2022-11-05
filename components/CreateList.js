import {
    Button,
    TextField,
    Dialog,
    DialogContent,
    DialogTitle,
    Box,
    FormControlLabel,
    Checkbox
} from '@mui/material'
import { useState } from 'react'
import { styled } from '@mui/material/styles'
import { Add } from '../icons'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { CustomSnackbar } from '.'

const AddImage = styled('img')(({ theme }) => ({
    float: 'right',
    backgroundColor: theme.palette.primary.main,
    borderRadius: 4,
}))

const CreateList = () => {

    const dispatch = useDispatch()
    const [Open, setOpen] = useState(false)
    const [SnackbarState, setSnackbarState] = useState({open: false, message: '', error: false})
    const [FormData, setFormData] = useState({ name: '', private: true })

    const User = useSelector(state => state.User)

    const handleSubmit = () => {
        console.log(User)
        if(User)
        axios.post('/api/list', {...FormData, userId: User.id}).then(res => {
            console.log(res)
            setSnackbarState({open: true, message: res.data.text});
            dispatch({ type: 'SET_LISTS', lists: res.data.lists})
            setOpen(false)
            handleSnackbarClose()
        }).catch(err => {
            setSnackbarState({open: true, message: err.response.data.text, error: true});
            handleSnackbarClose()
        })
    }

    const handleSnackbarClose = () => {
        setTimeout(() => {
            setSnackbarState({...SnackbarState, open: false, error: false})
        }, 2500)
    }

    return (
        <>
            <Button sx={{ padding: 1, minWidth: 0 }} onClick={() => setOpen(true)}>
                <AddImage src={Add.src} />
            </Button>
            <Dialog open={Open} onClose={() => setOpen(false)}>
                <DialogTitle>Create List</DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', minWidth: '300px', gap: 2, flexDirection: 'column' }}>
                        <TextField
                            label="title"
                            value={FormData.name}
                            onChange={e => setFormData({ ...FormData, name: e.target.value })}
                        />
                        <FormControlLabel control={
                            <Checkbox
                                checked={FormData.private}
                                onChange={e => setFormData({ ...FormData, private: e.target.checked })} />
                        } label="Private" />
                        <Button onClick={handleSubmit}>
                            Create
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog>
            <CustomSnackbar key="ListCreation" snackbarState={SnackbarState} setSnackbarState={setSnackbarState} />
        </>
    )
}

export default CreateList