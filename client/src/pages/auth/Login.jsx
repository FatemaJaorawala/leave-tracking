import { useState } from "react";

import axios from "axios";

import { useNavigate, Link } from "react-router-dom";

import "./Login.css";


function Login(){

    const navigate = useNavigate();

    const [email,setEmail] = useState("");



    const handleLogin = async()=>{

        try{

            const response = await axios.post(

                "http://localhost:5000/api/auth/login",

                { email }

            );


            const user = response.data;



            if(user.role==="employee"){

                navigate("/employee");

            }


            else if(user.role==="manager"){

                navigate("/manager");

            }


            else if(user.role==="admin"){

                navigate("/admin");

            }

        }

        catch(error){

            alert("Login failed");

        }

    };



    return(

        <div className="loginPage">

            <div className="loginBox">

                <h2>Login</h2>



                <input

                    placeholder="Enter email"

                    onChange={(e)=>
                        setEmail(
                            e.target.value
                        )
                    }

                />



                <button
                    onClick={handleLogin}
                >

                    Login

                </button>



                <p>

                    New user?

                    <Link to="/">

                        Signup

                    </Link>

                </p>

            </div>

        </div>

    );

}


export default Login;