
import logo from '../assets/logosmall.png';
import { useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
const ForgotPassowrd = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)
    const [Emailsent, setEmailSent] = useState("");
    const [code, setCode] = useState(false);
  const baseUrl = "/api";
    const inputRefs = useRef([]);

    const handleInput = (e, index) => {
            if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
                inputRefs.current[index + 1].focus();
            }
    }

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && e.target.value === "" && index > 0) {
           inputRefs.current[index - 1].focus();
        }
     }

    
     const navigate = useNavigate()

        const onSubmitEmail = async(e) => {
            e.preventDefault();

            try {
                    setLoading(true)
                if (!email) {
                    toast.error("Please Enter Email");
                    return;
                }

                const response = await axios.post(`${baseUrl}/auth/forgotPassword`,{
                    email
                },{
                    withCredentials:true
                })

                if (response.status === 200) {
                    toast.success("Email Sent Successfully")
                    setEmailSent(true);

                } else {
                    toast.error("Failed to Send Email");
                }
                
            } catch (error) {
                    if (error.response) {
                       if (error.response.status === 400) {
                        toast.error(error.response.data.message)
                       }  else { 
                        toast.error(error.response.data.message || "Something went wrong");
                    }
                    } else if (error instanceof axios.AxiosError) {
                        toast.error(
                           error?.response?.data
                         );
                       } else {
                         toast.error("reg error => ", error);
                       }
            }finally{
                setLoading(false)
            }
            
        } 

        const onSubmitOtp = async (e) => {
            e.preventDefault();

            const otpArray = inputRefs.current.map((input) => input.value);
            
      const otpString = otpArray.join('');
      setOtp(otpString)

      if (otpString.length !== 6) {
        toast.error("Please enter a valid 6-digit OTP.");
        return;
      }

            if (!otpString) {
                return toast.error("Otp is required")
            }

            try {
                const response = await axios.post(`${baseUrl}/auth/resetCode`,{
                    email,
                    resetOtp: otpString
                })
               
                
          if (response.data.success === true) {
            toast.success(response?.data?.message)
            setCode(true);
          } else {
            toast.error(response?.data?.message || "OTP validation failed.");
          }
          
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 400) {
                        toast.error(error.response.data.message)
                    } else {
                        toast.error(error.response.data.message || "Something went wrong");
                }
            }
                if (error instanceof axios.AxiosError) {
                    toast.error(
                       error?.response?.data
                     );
                   } else {
                     toast.error("reg error => ", error);
                   }
            }
           
        }

        const onSubmitPassword = async (e) => {
            e.preventDefault();

            // if(!email || !otp || !password) {
            //     return toast.error("Password is required")
            // }

            try {
                const response = await axios.post(`${baseUrl}/auth/resetPassword`,{
                    email,
                    otp,
                    password
                })
    
                if (response.data.success === true) {
                    toast.success("Password Reset Successfully")
                     navigate("/login")
                }
            } catch (error) {
                 if (error instanceof axios.AxiosError) {
                    toast.error(
                       error?.response?.data?.message
                     );
                   } else {
                     toast.error("reg error => ", error);
                   }
            }

           
        }
  return (
    <div className='w-[90%] m-auto'>
    { !Emailsent && <div className='flex items-center flex-col mt-7 justify-center '>
            <img className='w-16' src={logo} alt="" />
            <h4 className='my-3 text-3xl font-bold'>Forgot Password</h4>
            <p className='text-[#4d4b4b] mb-4 text-center text-lg w-[22rem] sm:w-96'>You can request a password reset below. We will send a security code to the email address, please make sure it is correct.</p>
            <form onSubmit={onSubmitEmail} className='flex flex-col'>
                <input 
                className='px-4 py-3 bg-[#d8d6d6] outline-none w-[22rem] sm:w-96' 
                 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email" />
               {loading ? <button disabled className='bg-gray-600 animate-pulse my-10 py-3 rounded-md shadow-md shadow-black text-white text-xl font-bold'>Sending...</button> : <button className='bg-gray-600 my-10 py-3 rounded-md shadow-md shadow-black text-white text-xl font-bold'>Request Password Reset</button>}
                </form>

                <div className='flex flex-col items-center my-9'>
                <p>For further support, you may visit the Help Center or contact our customer service team.</p>
                
                    <img className='w-10' src={logo} alt="" />
                </div>
        </div>}

       {!code && Emailsent && <div className='flex items-center flex-col mt-4 justify-center '>
            <img className='w-16' src={logo} alt="" />
            <h4 className='my-3 text-3xl font-bold'>Security Code to reset Password</h4>
            <p className='text-[#4d4b4b] mb-4 text-center text-lg w-96'>Insert the security code sent to your email in order to proceed with the password reset.</p>
            <form onSubmit={onSubmitOtp} className='flex flex-col'>
              <div className='flex gap-2 '>
                {Array(6).fill(0).map((_, index) => (
                <input key={index} type="text"
                maxLength={1}
                className='w-12 text-xl h-12 border-2 rounded-md border-black text-center'
                ref={(e) => inputRefs.current[index] = e}
                onInput={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                 />
            ))}
            </div>
            
                <button type='submit' className='bg-gray-600 my-10 py-3 rounded-md shadow-md shadow-black text-white text-xl font-bold'>Submit</button>
                </form>

                <div className='flex flex-col items-center my-9'>
                <p>For further support, you may visit the Help Center or contact our customer service team.</p>
                
                    <img className='w-10' src={logo} alt="" />
                </div>
        </div>}

        {code && Emailsent && <div className='flex items-center flex-col mt-4 justify-center '>
            <img className='w-16' src={logo} alt="" />
            <h4 className='my-3 text-3xl font-bold'>Reset Password</h4>
            <p className='text-[#4d4b4b] mb-4 text-center text-lg w-96'>Insert your new passsword.</p>
            <form onSubmit={onSubmitPassword} className='flex flex-col'>
                <input 
                className='px-4 py-3 bg-[#d8d6d6] outline-none w-96' 
                required 
                type="password" 
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <button type='submit' className='bg-gray-600 my-10 py-3 rounded-md shadow-md shadow-black text-white text-xl font-bold'>Change Password</button>
                </form>

                <div className='flex flex-col items-center my-9'>
                <p>For further support, you may visit the Help Center or contact our customer service team.</p>
                
                    <img className='w-10' src={logo} alt="" />
                </div>
        </div>}
    
    </div>
  )
}

export default ForgotPassowrd