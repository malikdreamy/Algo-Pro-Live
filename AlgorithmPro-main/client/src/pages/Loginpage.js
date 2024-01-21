import React, { useState } from "react";
import { AiOutlineEye } from "react-icons/ai"
import GIFpeople from "../images/original (1).webp"
import GIFanimals from '../images/animals.gif'
import { LOGIN_USER, ADD_USER } from "../utils/mutations";
import Auth from '../utils/auth'
import { useMutation } from "@apollo/client";
import { AnimatePresence, motion } from "framer-motion";
import {ToastContainer,toast}from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const [userFormData, setUserFormData] = useState({ email: '', password: '' ,username: ''});
    const [login, { error }] = useMutation(LOGIN_USER);
    const [addUser, {loading}] = useMutation(ADD_USER);
    const [showModel, setShowModel] = useState(true);
    const [ showAlert,setShowAlert] = useState(false)
    
    
    const handleInputChange = (e) =>{
        const { name, value} = e.target;
        setUserFormData({...userFormData, [name]:value});
    }
    const handleLoginSubmit = async (event) =>{
        event.preventDefault();
        const notify = (message)=>{
            toast.error(message)
        }
        if (userFormData.email ==="" || userFormData.password === ""){
            notify("cannot leave form boxes blank");
            return
        }
        
        const form = event.currentTarget;
        if(form.checkValidity() === true){
            event.preventDefault();
            event.stopPropagation();
           
        }
        try {
            const{ data } = await login({
                variables:{ ...userFormData}
            })
            
            Auth.login(data.login.token);
        } catch (error) {
            console.error(error);
            notify("email or password is incorrect")
        //show an error for user
    }

    setUserFormData({email:'',password:''});
}
const handleFormSubmit = async (event) => {
    event.preventDefault();
//firebase create account
const notify = (message)=>{
    toast.error(message)
}
if (userFormData.email ==="" || userFormData.password === "" || userFormData.username === ""){
    notify("cannot leave form boxes blank");
    return
}

// check if form has everything (as per react-bootstrap docs)
const form = event.currentTarget;
if (form.checkValidity() === false) {
    
    event.stopPropagation();
}
// setValidated(true);

try {
    const { data } = await addUser(
        {
            variables: userFormData,
        }
        );
        Auth.login(data.addUser.token); 
        Auth.login(data.addUser.token);
    } catch (err) {
        console.error(err);
        //   setShowAlert(true);
        notify('email or username is taken')
    }
    setUserFormData({
        username: '',
        email: '',
        password: '',
    });
};
return (
    <AnimatePresence key={showModel}>
                <ToastContainer position="top-center" autoClose={2000} hideProgressBar={true} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss pauseOnHover theme="dark"/>
        <section className="mt-24 min-h-full   flex items-center justify-center text-white mx-5 mb-12">
            <div className="bg--container--black flex rounded-2xl btn--homepage--chat max-w-3xl p-5 items-center" >
           

{showModel ? (
<>
                <motion.div initial={{opacity:0}} transition={{}}animate={{opacity:10}} exit={{opacity:10}} className="sm:w-1/2 px-8 ">
                    <h2 className="text-[#17BEBB] font-bold text-2xl">Login</h2>
                    <p className="  text-sm mt-4"> Log in seamlessly if you already have an account.</p>
                    <form className="flex flex-col gap-4"onSubmit={handleLoginSubmit} >
                        <input onChange={handleInputChange} className="text-[black] p-2 mt-8 rounded-xl border" type="email" name="email" placeholder="email"></input>
                        <div className="">
                        <input onChange={handleInputChange} className=" text-[black] w-full p-2 rounded-xl border"  type="password" name="password" placeholder="password"></input>
                        </div>
                        <motion.button whileHover={{sclae: 1.3, textShadow:'0px 0px 8px rgb(235,255,255)', boxShadow:'0px 0px 8px rgb(255,255,255)'}} className="mt-2 font-semibold bg-[#17BEBB] btn--hover--cyan rounded-xl py-2"> Login</motion.button>

                    </form>
                    <div className="mt-7 grid grid-cols-3 items-center  ">
                        <hr />
                        <p className="text-center">OR</p>
                        <hr/>
                    </div>
                        <button onClick={() => setShowModel(false)} className="border border-[#d81465] rounded-xl py-2 w-full font-semibold mt-3 btn--hover--pink"> Sign up</button>
                </motion.div>
                <motion.div initial={{opacity:0}} transition={{}}animate={{opacity:10}} exit={{opacity:10}} className="w-1/2 sm:block hidden">
                    <img className="rounded-2xl " src={GIFanimals} />
                </motion.div>
                </>):(
                    <>
                     <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="sm:w-1/2 px-8 ">
                    <h2 className="text-[#17BEBB] font-bold text-2xl">Sign Up</h2>
                    <p className="  text-sm mt-4"> Join effortlessly and unlock exciting opportunities by signing up today!</p>
                    <form className="flex flex-col gap-4 " onSubmit={handleFormSubmit}>
                    <input onChange={handleInputChange} className="text-[black] p-2 mt-8 rounded-xl border" type="username" name="username" placeholder="username"></input>
                        <input onChange={handleInputChange} className="text-[black] p-2  rounded-xl border" type="email" name="email" placeholder="email"></input>
                      <div>
                        <input onChange={handleInputChange} className=" text-[black] w-full p-2 rounded-xl border"  type="password" name="password" placeholder="password"></input>
                        </div>
                        <motion.button whileHover={{sclae: 1.3, textShadow:'0px 0px 8px rgb(235,255,255)', boxShadow:'0px 0px 8px rgb(255,255,255)'}} className="mt-2 font-semibold bg-[#17BEBB] btn--hover--cyan rounded-xl py-2"> Sign Up</motion.button>

                    </form>
                    <div className="mt-7 grid grid-cols-3 items-center  ">
                        <hr />
                        <p className="text-center">OR</p>
                        <hr/>
                    </div>
                        <button onClick={() =>{ setShowModel(true) }} className="border border-[#d81465] rounded-xl py-2 w-full font-semibold mt-3 btn--hover--pink"> Login</button>
                </motion.div >
                <div className="w-1/2 sm:block hidden h-full Login--gif">
                    <img className="rounded-2xl  Login--gif "  src={GIFpeople} />
                </div>
                    </>
                )
                }
            </div>


        </section>
        </AnimatePresence>
    )
}


export default Login;