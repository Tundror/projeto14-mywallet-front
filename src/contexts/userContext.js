import { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserContextProvider = ({children}) => {
    const [token, setToken] = useState("")
    const [transactionList, setTransactionList] = useState([])
    const [whatType, setWhatType] = useState("")
    const [name, setName] = useState("")
    
    return(
        <UserContext.Provider value={{token, setToken, transactionList, setTransactionList, whatType, setWhatType, name, setName}}>
            {children}
        </UserContext.Provider>
    )
}
