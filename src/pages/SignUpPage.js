import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from 'axios';
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"

export default function SignUpPage() {
  const navigate = useNavigate()
  const url = process.env.REACT_APP_BASE_URL
  const [form, setForm] = useState({ name: "", email: "", password: ""})
  const [isDisabled, setIsDisabled] = useState(false)
  let repeatPassword = ""
  function handleChange(event) {
    if(event.target.name === "repeatPassword"){
      repeatPassword = event.target.value
      console.log(repeatPassword)
      console.log(process.env.REACT_APP_BASE_URL)
    }
    else{
      setForm({ ...form, [event.target.name]: event.target.value })
      console.log(form)
    }
    
  }
  function signUp(e) {
    e.preventDefault()
    if(form.password !== repeatPassword){
     return alert("Senhas diferentes")
    }
    
    const promise = axios.post(`${url}/sign-up`, form)
    setIsDisabled(true)
    promise.then((a) => {
      navigate("/")
      setIsDisabled(false)
    })
    promise.catch((a) => {
      alert(a)
      setIsDisabled(false)
    })
  }
  return (
    <SingUpContainer>
      <form onSubmit={signUp}>
        <MyWalletLogo />
        <input placeholder="Nome" type="text" name={"name"} onChange={handleChange} disabled={isDisabled} />
        <input placeholder="E-mail" type="email" name={"email"} onChange={handleChange} disabled={isDisabled} />
        <input placeholder="Senha" type="password" autoComplete="new-password" name={"password"} onChange={handleChange} disabled={isDisabled} />
        <input placeholder="Confirme a senha" type="password" autoComplete="new-password" name={"repeatPassword"} onChange={handleChange} disabled={isDisabled} />
        <button disabled={isDisabled} type="submit" >Cadastrar</button>
      </form>

      <Link to="/">
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
