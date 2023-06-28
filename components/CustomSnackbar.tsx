import { Snackbar, Alert } from '@mui/material'

interface IProps {
    snackbarState: {
        open: boolean,
        message: string,
        error: boolean,
    },
    onClose: () => void,
}

const CustomSnackbar = ({ snackbarState, onClose }: IProps) => {
    return (
        <Snackbar
            open={snackbarState.open}
            message={snackbarState.message}
            onClose={onClose}
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