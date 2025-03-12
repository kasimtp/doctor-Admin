import { useContext } from "react"
import { assets } from "../assets/assets"
import { AdminContext } from "../context/AdminContext"
import { useNavigate } from "react-router-dom"


const Navbar = () => {

   const {atoken,setAToken} = useContext(AdminContext)
   const navigate = useNavigate()

   const logout = () => {
    navigate('/')
    atoken && setAToken('')
    atoken && localStorage.removeItem('atoken')
    
   }

  return (
    <>
       <div className="mx-8 my-2 flex flex-row items-center  justify-between   text-sm ">
        <div className="flex flex-row text-xs gap-2  items-center ">
        <img className="w-36 sm:w-40 cursor-pointer " src={assets.admin_logo} alt="" />
        <p className="border px-2.5 py-0.5 rounded-full border-gray-600 ">{atoken ? 'Admin' : 'Doctor'}</p>
        </div>
          <button onClick={logout} className="border  items-center   px-8 py-2 hidden md:block  rounded-full text-white hover:scale-105 transition-all hover:bg-white hover:text-black bg-primary"> Logout</button>
       
       </div>
       <div className="border-b border-black mt-1">

       </div>
       
    </>
  )
}

export default Navbar
