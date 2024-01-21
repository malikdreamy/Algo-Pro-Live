import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi"
import Auth from "../utils/auth";
import JPG from "../images/rilakumma.jpg"
import { QUERY_USER } from "../utils/queries";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_USERNAME } from "../utils/mutations";
function Profile() {
    const [showEditContainer, setShowEditContainer] = useState(false);
    const [newUsername, setUsername] = useState({ username: '', })
    const [currentUsername, setCurrentUsername] = useState('')
    const [allowEdit, setAllowEdit] = useState(false)
    const [changeUsername, { error }] = useMutation(UPDATE_USERNAME)
    const { loading, data,refetch } = useQuery(QUERY_USER, {
        variables: { email: "email." },
    })
    useEffect(() => {
    }, [newUsername])
    const handlwInputChange = async (e) => {
        const { name, value } = e.target;
        await setUsername({ ...newUsername, [name]: value })
    }
    const handleLogout = (mobile) => {
        Auth.logout();
    };
    const handleEditUsername = async (event) => {
        event.preventDefault()
  try {
    const username = newUsername.username
    console.log(typeof username);
      const { data } = await changeUsername({
          variables:{ username},
      })
      refetch();
      setAllowEdit(false)
  } catch (error) {
    console.log(error);
  }
    }
    return (
        <>
            {!loading ? (
                <section className="App h-screen flex justify-center items-center bg-gradient-to-r  bg-[#0D0D0D]">
                    <div className=" text-white rounded-lg p-12 mt-[-290px] flex flex-col items-center shadow-lg  bg-[#0D0D0D] ">
                        <div>
                        </div>
                        <div>
                            <img src={JPG} className=" h-[270px] rounded-3xl" />
                        </div>
                        <div id="title" className=" text-white font-bold text-3xl mt-2 flex text-center  items-start-center">
                            {allowEdit ? <form onSubmit={handleEditUsername}> <input onChange={handlwInputChange} name="username" className=" text-white border-b font-bold text-3xl mt-2 flex  w-[200px] bg-transparent text-center" /> </form> : data.oneUser.username}
                            <FiEdit onClick={() => setAllowEdit(true)} size={20} className="ml-4 mt-2 text-gray-300 cursor-pointer hover:text-white" />
                        </div>
                        <div id="Subtitle" className="text-sm text-gray-400 font-semibold mt-4 "> {data.oneUser.email}</div>
                        <div id="stats " className=" flex justify-between items-center my-6 ">
                        </div>
                        <div id="actions" className="justify-between flex ">
                            <button onClick={() => { handleLogout("mobile") }} className="text-white primary--background--color py-1 px-2 rounded-md mr-4 ">Logout</button>
                        </div>
                    </div>
                </section>
            ) :
                (
                    <div className="h-screen">hi</div>
                )
            }
        </>
    )
}
export default Profile