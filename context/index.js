import { useState, createContext } from "react";

const AppState = {
    loginOpen: false,
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

export default CombinedProviders