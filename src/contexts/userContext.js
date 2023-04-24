import { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserContextProvider = ({children}) => {
    const [token, setToken] = useState("")
    const [transactionList, setTransactionList] = useState([])
    
    return(
        <UserContext.Provider value={{token, setToken, transactionList, setTransactionList}}>
            {children}
        </UserContext.Provider>
    )
}
