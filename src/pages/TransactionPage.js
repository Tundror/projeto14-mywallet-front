import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState, useContext } from "react"
import axios from 'axios';
import { UserContext } from "../contexts/userContext"

export default function TransactionsPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ value: "", description: "" })
  const [isDisabled, setIsDisabled] = useState(false)
  const url = process.env.REACT_APP_BASE_URL
  const { whatType, setToken} = useContext(UserContext)

  useEffect(()=>{
    if(!localStorage.getItem("token")){
      alert("Usuario sem login")
      navigate("/")
    }
  },[])

  function postTransaction(event){
    event.preventDefault()
    const valueNumber = parseFloat(form.value)
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
    const body={value:valueNumber, description: form.description, type: whatType}
    axios.post(`${url}/transaction`, body, config)
      .then(()=>{
        navigate("/home")})
      .catch((a) => alert(a))
  }
  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value })
  }
  return (
    <TransactionsContainer>
      <h1>Nova TRANSAÇÃO</h1>
      <form onSubmit={postTransaction}>
        <input placeholder="Valor" name="value" type="text" onChange={handleChange} disabled={isDisabled}/>
        <input placeholder="Descrição" name="description" type="text" onChange={handleChange} disabled={isDisabled}/>
        <button type="submit" disabled={isDisabled}>Salvar TRANSAÇÃO</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
