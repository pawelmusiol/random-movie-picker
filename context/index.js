import { useState, useContext, createContext } from "react";
import axios from "axios";
import { CustomSnackbar } from "../components";

const AppState = {
    loginOpen: false,
    language: Intl.DateTimeFormat().resolvedOptions().locale,
    snackbarState: { open: false, message: '', error: false },
}   

export const AppStateContext = createContext(AppState.default)


const CombinedProviders = ({ children }) => {

    const [context, setContext] = useState(AppState)
    
    const openSnackbar = (data) => {
        setContext({
            ...context, 
            snackbarState: {open: true, ...data} })   
    }

    const closeSnackbar = () => {
        setContext({
            ...context, 
            snackbarState: {...context.snackbarState, open: false} })
    }

    return (
        <AppStateContext.Provider value={[context, setContext, openSnackbar, closeSnackbar]}>
            {children}
            <CustomSnackbar snackbarState={context.snackbarState} onClose={closeSnackbar} />
        </AppStateContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppStateContext)
}

export default CombinedProviders