import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

export const TransactionsContext = createContext<TransactionContextData>(
    {} as TransactionContextData

);

interface Transaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
}
type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>; //poderia ser pick para selecionar campos específicos

interface TransactionProviderProps {
    children: ReactNode;
}

interface TransactionContextData {
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}
export function TransactionsProvider({ children }: TransactionProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([])
    useEffect(() => {
        api.get('/transactions')
            .then(response => setTransactions(response.data.transactions))
    }, [])
    async function createTransaction(transactionInput: TransactionInput) {
       const response = await api.post('/transactions', {
           ...transactionInput,
           createdAt: new Date(),
       })
       const {transaction} = response.data;
       setTransactions([
           ...transactions, //copio as informações originais
           transaction, //adiciono as novas informações
       ])
    }
    return (
        <TransactionsContext.Provider value={{ transactions, createTransaction }}>

            {children}

        </TransactionsContext.Provider>
    )
}
export function useTransactions(){
    const context=useContext(TransactionsContext);

    return context;

}