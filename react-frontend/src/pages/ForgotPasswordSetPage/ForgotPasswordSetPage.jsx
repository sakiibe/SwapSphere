import React from 'react';
import { useEffect } from 'react';
import ForgotPassword from '../../images/rakshit images/forgotpasword.gif'
import './ForgotPasswordPage.css';
import axios from 'axios'; // Import Axios
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const nodemailer = require("nodemailer");

const ForgotPasswordPage = () => {
    const[error,setError] = useState('');
    useEffect(() => {
        // Hide the emailAlert element on initial load
        document.getElementById("emailAlert").style.display = 'none';
      }, []);


      const passwordMatchValidation=()=>{
        setPassword(document.getElementById("password").value)
        if(document.getElementById("password").value !== document.getElementById("confirmPassword").value){
            document.getElementById("confirmPasswordAlert").style.display = 'block';
        }
       else{
        document.getElementById("confirmPasswordAlert").style.display = 'none';
       } 
    }

    

    return (
        <div class='container-fluid box p-0 m-0 max-height'>
            <div class="row m-0 theme-color">
                <div class="col-lg-5   max-height p-0 d-flex align-items-center "><img src={ForgotPassword}  alt="" /></div>
                <div class="col-lg-7  max-height p-0 d-flex align-items-center ">
                    <div class="container-fluid m-0 p-4 ">
                        <div className="m-3 text-white">        
                            <p class="fs-1 font">Forgot Password Page</p>
                        </div>
                        <form className='m-3'>

                        <div class="form-group my-2 w-75">
                        <label for="password" class=" mb-1  font">Password:</label>
                        <input type="password" class="form-control rounded" id="password" placeholder="Enter Password" onChange={passwordMatchValidation}/>
                        </div>

                        <div class="form-group my-2 w-75">
                        <label for="password" class=" mb-1  font">ConfirmPassword:</label>
                        <input type="password" class="form-control rounded" id="confirmPassword" placeholder="Enter Confirm Password" onChange={passwordMatchValidation}/>
                        <div id="confirmPasswordAlert" class='text-white bg-danger rounded-2 ps-2'>Password do not match. </div>
                        </div>
                        <button type="submit " class="btn btn-primary mt-3 mx-1">Submit</button>
                        </form>
                        </div>
                    </div>  
                </div>
            </div>
        
    
);

export default ForgotPasswordPage;
