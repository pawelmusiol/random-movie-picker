import React, { useState, useContext, createContext } from "react";
import axios from "axios";
import { CustomSnackbar } from "../components";

const AppState = {
    context: {
        loginOpen: false,
        language: Intl.DateTimeFormat().resolvedOptions().locale,
        snackbarState: { open: false, message: '', error: false },
    },
    setContext: () => { },
    openSnackbar: () => { },
    closeSnackbar: () => { }
}

interface IProps {
    children: JSX.Element | JSX.Element[]
}

interface IAppState {
    loginOpen: boolean,
    language: string,
    snackbarState: { open?: boolean, message?: string, error?: boolean },
}

type AppStateContext = {
    context: IAppState,
    setContext: React.Dispatch<React.SetStateAction<IAppState>>,
    openSnackbar: (data: { message: string, error: boolean }) => void,
    closeSnackbar: () => void,
}

export const AppStateContext = createContext<AppStateContext>(AppState)


const CombinedProviders = ({ children }) => {

    const [context, setContext] = useState(AppState.context)

    const openSnackbar = (data) => {
        setContext({
            ...context,
            snackbarState: { open: true, ...data }
        })
    }

    const closeSnackbar = () => {
        setContext({
            ...context,
            snackbarState: { ...context.snackbarState, open: false }
        })
    }

    return (
        <AppStateContext.Provider value={{context, setContext, openSnackbar, closeSnackbar}}>
            {children}
            <CustomSnackbar snackbarState={context.snackbarState} onClose={closeSnackbar} />
        </AppStateContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppStateContext)
}

export default CombinedProviders