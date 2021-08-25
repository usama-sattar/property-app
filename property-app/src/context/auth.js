import React,{useState,createContext,useEffect} from 'react'
import axios from 'axios'

export const authContext = createContext()

function AuthContextProvider({children}){
    const [user, setUser] = useState("")
    const [message, setMessage] = useState("")
    const [islogged, setislogged] = useState(false)

    useEffect(async () => {
        const token = await localStorage.getItem("auth-token");
        if (token) {
          const tokenParse = await JSON.parse(token);
          await setUser(tokenParse);
          console.log(user);
          await setislogged(true);
        }
      }, [islogged]);
    

    const setRegister = async (e,email,password)=>{
        e.preventDefault()
        const newUser = {
            email:email.current.value,
            password:password.current.value
        }
        const data = await axios.post('http://localhost:5000/register', newUser)
        setMessage(data.data.message)
        console.log(data);   
    }

    const setLogin=async(e,email,password)=>{
        e.preventDefault()
        const newUser = {
            email:email.current.value,
            password:password.current.value
        }
        const result = await axios.post('http://localhost:5000/login', newUser)
        console.log(result.data);
        localStorage.setItem("auth-token", JSON.stringify(result.data))
        setUser(result.data)
        setislogged(true)
    }
    const setLogout = () =>{
        setislogged(false)
        localStorage.clear()
    }
   
    return(
        <authContext.Provider value={{setRegister, setLogin, setLogout, user , message, islogged}}>
            {children}
        </authContext.Provider>
    )
}
export default AuthContextProvider