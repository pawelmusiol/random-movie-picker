import { Snackbar, Alert } from '@mui/material'

const CustomSnackbar = ({ key, snackbarState, onClose }) => {
    return (
        <Snackbar
            open={snackbarState.open}
            message={snackbarState.message}
            onClose={onClose}
            key={key}
        >
            <Alert
                sx={{ display: 'flex', alignItems: 'center', '& *': { fontSize: '2rem' } }}
                severity={snackbarState.error ? 'error' : 'success'}
            >
                {snackbarState.message}
            </Alert>
        </Snackbar>
    )
}

export default CustomSnackbar