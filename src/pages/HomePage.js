import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState, useContext } from "react"
import axios from 'axios';
import { UserContext } from "../contexts/userContext"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"

export default function HomePage() {
  const navigate = useNavigate()
  const url = process.env.REACT_APP_BASE_URL
  const { token, setToken, transactionList, setTransactionList } = useContext(UserContext)
  const [balance, setBalance] = useState(0)
  useEffect(() => {
    setToken(localStorage.getItem("token"))
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
    const promise = axios.get(`${url}/transaction`, config)
    promise.then((a) => {
      setTransactionList(a.data)
    })
    promise.catch((a) => console.log("erro", a.message))
  }, [])

  useEffect(() => {
    const array = transactionList
    let finalValue=0
    array.forEach((a) => {
      if (a.type === "in") {
        finalValue = finalValue + a.value
        setBalance(finalValue.toFixed(2))
        console.log(finalValue)
      }
      else if (a.type === "out") {
        finalValue = finalValue - a.value
        setBalance(finalValue.toFixed(2))
        console.log(finalValue)
      }
    })
  }, [transactionList])

  return (
    <HomeContainer>
      <Header>
        <h1>Olá, Fulano</h1>
        <BiExit />
      </Header>
      <TransactionsContainer>
        <ul>
          {transactionList.map((a) => <DisplayTransactions
            balance={balance}
            setBalance={setBalance}
            key={a._id}
            value={a.value}
            description={a.description}
            type={a.type}
            date={a.date} />)}
        </ul>

        <article>
          <strong>Saldo</strong>
          <Value color={balance >= 0 ? "positivo" : "negativo"}>{balance}</Value>
        </article>
      </TransactionsContainer>


      <ButtonsContainer>
        <button>
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button>
        <button>
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </button>
      </ButtonsContainer>

    </HomeContainer>
  )
}

function DisplayTransactions(props) {
  const { value, description, type, date } = props

  return (
    <ListItemContainer>
      <div>
        <span>{date}</span>
        <strong>{description}</strong>
      </div>
      <Value color={type === "in" ? "positivo" : "negativo"}>{value}</Value>
    </ListItemContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`