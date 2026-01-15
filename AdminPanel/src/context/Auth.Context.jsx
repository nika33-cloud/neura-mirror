import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";


export const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext);
};

export const AuthContextProvider = ({children}) => {
  const baseUrl = "/api";
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false)

    axios.defaults.withCredentials = true

    useEffect(() => {
        const validResponse = async () => {
            setLoading(true)
            try {
                const response = await axios.get(`${baseUrl}/auth/validate`, {
                    withCredentials: true,
                })

                if (!response?.data || !response?.data?.success) {
                   
                    setUserData(null);
                    return;
                  }

                  if (response?.status === 200) {
                    setUserData(response?.data?.user);
                  }
                  
                  
            } catch (error) {
                if (error instanceof axios.AxiosError) {
                    console.error(
                       error?.response?.data?.message
                     );
                   } else {
                     console.error("reg error => ", error);
                   }
                }finally{
                    setLoading(false)
                }
        }
        validResponse();
    }, [baseUrl])



    return(
        <AuthContext.Provider value={{userData}}>
             <>
            {loading ? (
                <div>Loading...</div>
            ) : (
              children
            )}
              </>
        </AuthContext.Provider>
    )
}