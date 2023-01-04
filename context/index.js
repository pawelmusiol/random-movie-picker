import { useState, useContext, createContext } from "react";
import axios from "axios";

const AppState = {
    loginOpen: false,
    language: Intl.DateTimeFormat().resolvedOptions().locale
}

export const AppStateContext = createContext(AppState.default)


const CombinedProviders = ({ children }) => {

    const [context, setContext] = useState(AppState)
    return (
        <AppStateContext.Provider value={[context, setContext]}>
            {children}
        </AppStateContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppStateContext)
}

export default CombinedProviders