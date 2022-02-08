import { TransactionsProvider } from "./hooks/useTransactions";
import { Dashboard } from "./components/dashboard";
import { Header } from "./components/header";
import Modal from 'react-modal'
import { GlobalStyle } from "./styles/globals";
import { useState } from "react";
import { NewTransactionModal } from "./components/newtransactionmodal";


Modal.setAppElement('#root')

export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);

  function handleOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true)
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false)
  }
  return (
    <TransactionsProvider>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
      <Dashboard />
      <GlobalStyle />
      <NewTransactionModal isOpen={isNewTransactionModalOpen} onRequestClose={handleCloseNewTransactionModal} />
    </TransactionsProvider>
  );
}


