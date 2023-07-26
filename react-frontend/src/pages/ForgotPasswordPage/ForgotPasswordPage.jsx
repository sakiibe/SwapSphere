import React from 'react';
import { useEffect } from 'react';
import ForgotPassword from '../../images/rakshit images/forgotpasword.gif'
import './ForgotPasswordPage.css';
import axios from 'axios'; // Import Axios
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import nodemailer from 'nodemailer';


const ForgotPasswordPage = () => {
    const[error,setError] = useState('');
    useEffect(() => {
        // Hide the emailAlert element on initial load
        document.getElementById("emailAlert").style.display = 'none';
      }, []);


    const emailValidation=()=>{
        const email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; 
        if(document.getElementById("email").value===''){
            document.getElementById("emailAlert").style.display = 'none';
        }
        else
        if(document.getElementById("email").value.match(email_regex)){
            document.getElementById("emailAlert").style.display = 'none';
        }
        else{
            document.getElementById("emailAlert").style.display = 'block';
        }
    }

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        const forgotPassword = {
          email : document.getElementById("email").value,
        };
        try {
          // console.log(loginData)
          const response = await axios.post('http://localhost:3001/user/forgotpassword', forgotPassword);
          // console.log(response);
            const  token  = response.data.token;
            const sendResetPasswordEmail = (recipientEmail, token) => {
                const resetPasswordURL = `http://localhost:3000/forgotpasswordpage?token= ${token}`;
              
                const transporter = nodemailer.createTransport({
                  service: "Gmail",
                  auth: {
                    user: "rakshit1412@gmail.com",
                    pass: "Sbr1@gmail",
                  },
                });
              
                const mailOptions = {
                  from: "rakshit1412@gmail.com",
                  to: "nandkadivar007@gmail.com",
                  subject: "Password Reset",
                  text: `You can reset your password using the following link: ${resetPasswordURL}`,
                };
              
                transporter.sendMail(mailOptions, (error, info) => {
                  if (error) {
                    console.error("Error sending email:", error);
                  } else {
                    console.log("Email sent:", info.response);
                  }
                });
              };
           
          } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
              setError(error.response.data.error);
            } else {
              setError('An error occurred during login');
            }
          }
        };

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

                            <div class="form-group m-3 w-75 ">
                            <label for="email " class=" mb-1 text-white   ">Enter the registered Email:</label>
                            <input type="email" class="form-control" id="email" placeholder="Enter your email" onChange={emailValidation}/>
                            <div id="emailAlert" class='text-white bg-danger rounded-2'>The email is not correct</div>
                            </div>

                            <button type="submit " class="btn btn-light ms-3  mx-1"onClick = {handleForgotPassword} >Submit</button>
                        </form>
                    </div>
                </div>  
            </div>
        </div>
    
);
};
export default ForgotPasswordPage;
