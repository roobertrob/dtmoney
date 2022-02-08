import { Container } from "./styles";
import IncomeImg from '../../assets/income.svg'
import OutcomeImg from '../../assets/outcome.svg'
import TotalImg from '../../assets/total.svg'
import { useTransactions } from "../../hooks/useTransactions";
export function Summary() {
    const { transactions } = useTransactions();

    // const totalDeposits = transactions.reduce((acc, transaction) =>{
    //     if(transaction.type == 'deposit'){
    //         return acc + transaction.amount
    //     }
    //     return acc;
    // },0)

    const summary = transactions.reduce((acc, transaction) => {
        if (transaction.type == 'deposit') {
            acc.deposits += transaction.amount;
            acc.total += transaction.amount;
        } else {
            acc.withdraw += transaction.amount;
            acc.total -= transaction.amount;
        }
        return acc;
    }, {
        deposits: 0,
        withdraw: 0,
        total: 0,
    })
    return (

        <Container>
            <div>
                <header>
                    <p>Entradas</p>
                    <img src={IncomeImg} alt="entradas" />
                </header>
                <strong>{new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: "BRL"
                }).format(summary.deposits)}</strong>
            </div>
            <div>
                <header>
                    <p>Saidas</p>
                    <img src={OutcomeImg} alt="saidas" />
                </header>
                <strong>{new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: "BRL"
                }).format(summary.withdraw)}</strong>
            </div>
            <div className="verde">
                <header>
                    <p>Total</p>
                    <img src={TotalImg} alt="total" />
                </header>
                <strong>{new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: "BRL"
                }).format(summary.total)}</strong>
            </div>
        </Container>
    )
}