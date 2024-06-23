import { useLocation } from "react-router-dom";
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"  
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";

export const Dashboard = () => {
    const [balance, setBalance] = useState(0)
    const location = useLocation();

    const notification = location.state.notification;
    const notifySuccess = () => toast.success(notification);

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/account/balance", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(response => {
                setBalance(response.data.balance.toFixed(2)) 
                notifySuccess()               
            })
    }, [balance])

    return <div>
        <ToastContainer>
        </ToastContainer>
        <Appbar />
        <div className="m-8">
            <Balance value={balance} />
            <Users />
        </div>
    </div>
}