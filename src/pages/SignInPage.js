import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { UserContext } from "../contexts/userContext"
import { useState, useContext } from "react"
import axios from 'axios'

export default function SignInPage() {
  const navigate = useNavigate()
  const url = process.env.REACT_APP_BASE_URL
  const [form, setForm] = useState({ email: "", password: "" })
  const [isDisabled, setIsDisabled] = useState(false)
  const { token, setToken } = useContext(UserContext)
  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value })
    console.log(form)
  }
  function signUp(e) {
    e.preventDefault()
    const promise = axios.post(`${url}/sign-in`, form)
    setIsDisabled(true)
    promise.then((a) => {
      navigate("/home")
      setIsDisabled(false)
      setToken(a.data)
      console.log(a.data)
    })
    promise.catch((a) => {
      alert(a.response.data.message)
      setIsDisabled(false)
    })
    
  }
  return (
    <SingInContainer>
      <form onSubmit={signUp}>
        <MyWalletLogo />
        <input placeholder="E-mail" type="email" disabled={isDisabled} name={"email"} onChange={handleChange} />
        <input placeholder="Senha" type="password" autocomplete="new-password" disabled={isDisabled} name={"password"} onChange={handleChange} />
        <button disabled={isDisabled} type="submit">Entrar</button>
      </form>

      <Link to="/cadastro">
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
