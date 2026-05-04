import { useState } from "react";

import axios from "axios";

import { Link } from "react-router-dom";

import "./Signup.css";


function Signup(){

    const [formData,setFormData] = useState({

        name:"",
        email:"",
        role:"",
        manager_id:""

    });



    const handleChange = (e)=>{

        setFormData({

            ...formData,

            [e.target.name]:e.target.value

        });

    };



    const handleSignup = async()=>{

        try{

            const response = await axios.post(

                "http://localhost:5000/api/auth/signup",

                formData

            );


            alert(response.data.message);

        }

        catch(error){

            alert("Signup failed");

        }

    };



    return(

        <div className="signupPage">

            <div className="signupBox">

                <h2>Create Account</h2>



                <input

                    name="name"

                    placeholder="Enter name"

                    onChange={handleChange}

                />



                <input

                    name="email"

                    placeholder="Enter email"

                    onChange={handleChange}

                />



                <select

                    name="role"

                    onChange={handleChange}

                >

                    <option value="">
                        Select role
                    </option>

                    <option value="employee">
                        Employee
                    </option>

                    <option value="manager">
                        Manager
                    </option>

                    <option value="admin">
                        Admin
                    </option>

                </select>



                {

                    formData.role==="employee" &&

                    <input

                        name="manager_id"

                        placeholder="Manager ID"

                        onChange={handleChange}

                    />

                }



                <button
                    onClick={handleSignup}
                >

                    Signup

                </button>



                <p>

                    Already registered?

                    <Link to="/login">

                        Login

                    </Link>

                </p>


            </div>

        </div>

    );

}


export default Signup;