import React,{useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './LoginPage.css'
import  LoginImage from '../../images/rakshit images/Login.gif'
import axios from 'axios'; // Import Axios
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from "../../components/Footer";

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError,setLoginError]= useState('');
    const [invalidCredentials,setInvalidCredentials]= useState(false);
   
    useEffect(() => {
      // Hide the emailAlert element on initial load
      document.getElementById("emailAlert").style.display = 'none';
    }, []);
    const handleLogin = async (e) => {
      e.preventDefault();
      const loginData = {
        email : email,
        password : password,
      };
      try {
        // console.log(loginData)
        const response = await axios.post('http://localhost:8080/user/login', loginData);

          const  token  = response.data.token;
          localStorage.setItem('authToken', token);
          localStorage.setItem('email', response.data.email);
          localStorage.setItem('role', response.data.role);
          if(response.data.status === 'true'){
            localStorage.setItem("email",email);
            localStorage.setItem('role',response.data.role);
            if(response.data.role ==="user"){
              navigate("/home");
            }
            else{
              navigate("/admin");
            }
          }

        } catch (error) {
          if (error.response && error.response.data && error.response.data.error) {
            setInvalidCredentials(true);
            setLoginError(error.response.data.error);
          } else {
            setLoginError('An error occurred during login');
          }
        }
      };

 const emailValidation=(e)=>{
    setEmail(e.target.value);
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
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };
    
    return (
            <div class='container-fluid box p-0 m-0 max-height'>
                <div class="row m-0 login-theme-color">
                <div className="col-lg-5 d-none d-lg-flex justify-content-center align-items-center max-height p-0"><img src={LoginImage} alt="" /></div>
                    <div class="col-lg-7  max-height p-0 d-flex align-items-center ">
                        <div class="container-fluid m-0 p-4 ">
                            <div className="flex-responsive d-flex flex-column align-items-center justify-content-center">        
                                <p class="fs-1 font">Login Page</p>
                            </div>
                            <form className='d-flex flex-column align-items-center justify-content-center px-3' >

                                <div class="form-group m-3 w-75 ">
                                <label for="email " class=" mb-1    ">Email:</label>
                                <input type="email" class="form-control" id="email" placeholder="Enter your email" onChange={emailValidation}/>
                                <div id="emailAlert" class='text-white bg-danger rounded-2'>The email is not correct</div>
                                </div>


                                <div class="form-group m-3 w-75">
                                  <div className="row">
                                    <label for="password" class=" mb-1 col-6">Password:</label>
                                    <div class="col-6 d-flex justify-content-end">
                                      <button class="link-btn" onClick={() => navigate("/user/forgotpassword")}>forgot password?</button>
                                    </div>                                 
                                  </div>
                                  <input type="password" class="form-control rounded" value={password} id="password" placeholder="Enter your password" onChange={handlePasswordChange}/>
                                </div>
{/*                                 
                                <div className="d-flex flex-row justify-content-end w-100 p-5"> */}
                                <button type="submit " class="btn btn-primary mr-5  mx-1" onClick={handleLogin}>Login</button>
                                  {invalidCredentials && (
                                    <p className="text-red-500 text-base">
                                      Incorrect Login credentials. Please Try again.
                                    </p>
                                  )}
                                <button className="link-btn  mt-4 text-blue text-blue-underline" onClick={() => navigate("/user/register")}>Don't have an account? Register here.</button>
                                {/* </div> */}
                            </form>
                        </div>
                    </div>  
                </div>
                <Footer />

            </div>
    );
};
export default LoginPage;
