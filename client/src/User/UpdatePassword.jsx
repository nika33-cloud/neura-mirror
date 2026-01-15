import axios from "axios";
import { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";

import PropTypes from 'prop-types';
import toast from "react-hot-toast";

const UpdatePassword = ({ onClose }) => {
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    

  const baseUrl = "/api";
    axios.defaults.withCredentials = true

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!password) {
            return toast.error("Password is required")
        }

        setLoading(true)
        try {
            const response = await axios.patch(`${baseUrl}/auth/updatePassword`,{
                password
            },{
                withCredentials:true
            })
                    
            if (response.status === 200) {
                toast.success("Password updated successfully")
                setIsopen(false)
            }else{
                toast.error("Failed to update password. Please try again.")
            }
        } catch (error) {
            setLoading(false)
            if (error instanceof axios.AxiosError) {
                toast.error(
                   error?.response?.data
                 );
               } else {
                 toast.error("reg error => ", error);
               }
        } finally{
            setLoading(false)
        }
       

    }
    
  return (
    <>
   
        <div className='bg-gray-500 z-30 fixed inset-0 flex items-center justify-center bg-opacity-50'>
        <div className='bg-white p-10 rounded-lg'>
            <div className="flex justify-between ">
            <h3 className='text-center md:text-2xl text-xl font-bold mb-5'>Update Password </h3>
            <IoMdCloseCircle onClick={onClose} size={20} aria-label="Close modal" />
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                <label  htmlFor="password" className='text-xl mr-3'>Password :</label>
                <input 
                className='border-2 text-xl border-[#d5b775] outline-[#d5b775] rounded-md py-2 px-3 w-52' type="email" 
                placeholder='Enter New Password' 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                </div>

                <div className='flex items-center justify-center'>
                <button 
    type="submit" 
    className='bg-[#d5b775] text-xl p-2 font-semibold rounded-sm mt-5' 
    disabled={loading}
>
    {loading ? "Loading..." : "Submit"}
</button>

                </div>
            </form>
        </div>
    </div>

    </>
  )
}

UpdatePassword.propTypes = {
  setIsopen: PropTypes.func.isRequired,
  password: PropTypes.string
};

export default UpdatePassword;