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
import { useAppSelector } from '../redux/hooks'

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

interface IProps {
    open: boolean,
    onClose: () => void,
    addToList?: (id:string | number) => void
}

const CreateList = ({open, onClose, addToList}: IProps) => {

    const dispatch = useDispatch()
    const [Disabled, setDisabled] = useState(false)
    const [SnackbarState, setSnackbarState] = useState({ open: false, message: '', error: false })
    const [FormData, setFormData] = useState({ name: '', private: true })

    const user = useAppSelector(state => state.User)

    const handleSubmit = () => {
        setDisabled(true)
        if (user)
            axios.post(`/api/list?token=${user.token}`, { ...FormData, userId: user.id }).then(res => {
                setSnackbarState({ open: true, message: res.data.text, error: false });
                dispatch({ type: 'SET_LISTS', lists: res.data.lists })
                if(addToList) {
                    addToList(res.data.currentListId)
                }
                setDisabled(false)
                onClose()
                handleSnackbarClose()
            }).catch(err => {
                setSnackbarState({ open: true, message: err.response.data.text, error: true });
                setDisabled(false)
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
                        <Button onClick={handleSubmit} disabled={Disabled}>
                            Create
                        </Button>
                    </DialogBox>
                </DialogContent>
            </Dialog>
            <CustomSnackbar key="ListCreation" snackbarState={SnackbarState} onClose={() => setSnackbarState({...SnackbarState, open: false})} />
        </>
    )
}

export default CreateList