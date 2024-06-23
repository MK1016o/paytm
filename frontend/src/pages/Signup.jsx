import { useEffect, useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const notify = () => toast.error("Email already taken / Incorrect inputs");
    const notifySuccess = () => toast.error();
    useEffect(() => {
      const token = localStorage.getItem('token');
      if(token) {
        navigate('/dashboard', {
          state: {
            notification: "Logging in"
          }
        });
        return;
      }
    }, [])
    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your infromation to create an account"} />
        <InputBox onChange={e => {
          setFirstName(e.target.value);
        }} placeholder="John" label={"First Name"} />
        <InputBox onChange={(e) => {
          setLastName(e.target.value);
        }} placeholder="Doe" label={"Last Name"} />
        <InputBox onChange={e => {
          setUsername(e.target.value);
        }} placeholder="harkirat@gmail.com" label={"Email"} />
        <InputBox onChange={(e) => {
          setPassword(e.target.value)
        }} placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button onClick={async () => {
              const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                username: username,
                firstName: firstName,
                lastName: lastName,
                password: password
              }).then((response) => {
                localStorage.setItem("token", response.data.token)
                notifySuccess();
                navigate("/dashboard", {
                  state: {
                    notification: "User created successfully"
                  }
                })
              }).catch((err) => {
                notify();
              })
            }} label={"Sign up"} />
          <ToastContainer></ToastContainer>
        </div>
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
      </div>
    </div>
  </div>
}