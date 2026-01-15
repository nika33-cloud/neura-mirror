import axios from "axios";
import { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";

import PropTypes from 'prop-types';
import toast from "react-hot-toast";

const UpdateEmail = ({ onClose }) => {
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)

  const baseUrl = "/api";
    axios.defaults.withCredentials = true

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!email) {
            return toast.error("Email is required")
        }

        setLoading(true)
        try {
            const response = await axios.patch(`${baseUrl}/auth/updateEmail`,{
                email
            },{
                withCredentials:true
            })
                    
            if (response.status === 200) {
                toast.success("Email updated successfully")
                setIsopen(false)
            }else{
                toast.error("Failed to update email. Please try again.")
            }
        } catch (error) {
            setLoading(false)
            if(error.response){
                if(error.response.status === 409) {
                    toast.error("Email already exists. Please choose a different one.")
                }
            }
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
            <h3 className='text-center text-2xl font-bold mb-5'>Update Email</h3>
            <IoMdCloseCircle onClick={onClose} size={20} aria-label="Close modal" />
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                <label  htmlFor="email" className='text-xl mr-3'>Email:</label>
                <input 
                className='border-2 border-[#d5b775] outline-[#d5b775] text-xl rounded-md py-2 px-3 w-52' type="email" 
                placeholder='Enter New Email Address' 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                </div>

                <div className='flex items-center justify-center'>
                <button 
    type="submit" 
    className='bg-[#d5b775] p-2 font-semibold rounded-sm mt-5' 
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

UpdateEmail.propTypes = {
  setIsopen: PropTypes.func.isRequired,
  email: PropTypes.string
};

export default UpdateEmail;