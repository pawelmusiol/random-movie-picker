import { Snackbar, Alert } from '@mui/material'

const CustomSnackbar = ({ key, snackbarState, setSnackbarState}) => {
    return (
        <Snackbar
                    open={snackbarState.open}
                    message={snackbarState.message}
                    onClose={() => setSnackbarState({ ...snackbarState, open: false })}
                    key={key}
                >
                    <Alert severity={snackbarState.error ? 'error' : 'success'}>{snackbarState.message}</Alert>
                </Snackbar>
    )
}

export default CustomSnackbar