import {
    Button,
    TextField,
    Dialog,
    DialogContent,
    DialogTitle,
    Box,
    FormControlLabel,
    Checkbox,
    styled
} from '@mui/material'
import { useState } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { CustomSnackbar } from '.'

const DialogBox = styled(Box)(({theme}) => ({
    display: 'flex', 
    minWidth: '300px', 
    gap: 2, 
    flexDirection: 'column',
    paddingTop: 10,
    [theme.breakpoints.down('md')]:{
        minWidth: '100%',
        
    }
}))


const NameInput = ({FormData, setFormData}) => (
    <TextField
        label="title"
        value={FormData.name}
        autoFocus
        onChange={e => {setFormData({ ...FormData, name: e.target.value });  console.log(document.activeElement)}}
        onBlur={(e) => console.log(e.target.value)}
    />
)

const CreateList = ({open, onClose, addToList}) => {

    const dispatch = useDispatch()
    const [SnackbarState, setSnackbarState] = useState({ open: false, message: '', error: false })
    const [FormData, setFormData] = useState({ name: '', private: true })
    const [Name, setName] = useState('')

    const User = useSelector(state => state.User)

    const handleSubmit = () => {
        if (User)
            axios.post('/api/list', { ...FormData, userId: User.id }).then(res => {
                setSnackbarState({ open: true, message: res.data.text });
                dispatch({ type: 'SET_LISTS', lists: res.data.lists })
                if(addToList) {
                    addToList(res.data.currentListId)
                }
                onClose()
                handleSnackbarClose()
            }).catch(err => {
                setSnackbarState({ open: true, message: err.response.data.text, error: true });
                handleSnackbarClose()
            })
    }

    const handleSnackbarClose = () => {
        setTimeout(() => {
            setSnackbarState({ ...SnackbarState, open: false, error: false })
        }, 2500)
    }

    return (
        <>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>Create List</DialogTitle>
                <DialogContent>
                    <DialogBox >
                        <NameInput FormData={FormData} setFormData={setFormData} />
                        <FormControlLabel control={
                            <Checkbox
                                checked={FormData.private}
                                onChange={e => setFormData({ ...FormData, private: e.target.checked })} />
                        } label="Private" />
                        <Button onClick={handleSubmit}>
                            Create
                        </Button>
                    </DialogBox>
                </DialogContent>
            </Dialog>
            <CustomSnackbar key="ListCreation" snackbarState={SnackbarState} setSnackbarState={setSnackbarState} />
        </>
    )
}

export default CreateList