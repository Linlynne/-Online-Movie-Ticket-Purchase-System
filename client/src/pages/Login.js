import React,{ useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';

function Login(){

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const { setAuthState } = useContext(AuthContext);

    const navigate = useNavigate();

    const login = () => {
        const data = {email: email, password: password};
        axios.post('http://localhost:3001/auth/login',data).then((response) => {
            if(response.data.error){
                alert(response.data.error);
            }else{
                localStorage.setItem('accessToken',response.data.token);
                console.log('accesstoken='+response.data.token);
                setAuthState({
                    email: response.data.email,
                    id: response.data.id,
                    role: response.data.role,
                    status: true
                  });
                navigate('/');
            }
        });
    };

    return (
        <div className="form-signin mt-5">
            <label>Email:</label>
            <input type="text" className="form-control" placeholder="Email..." onChange={(event) => {setEmail(event.target.value);}}/>
            <label className="mt-3">Password:</label>
            <input type="password" className="form-control" placeholder="Password..." onChange={(event) => {setPassword(event.target.value);}}/>

            <button className="w-100 btn btn-lg btn-primary" onClick={login}>Login</button>
        </div>
    );
}


export default Login;