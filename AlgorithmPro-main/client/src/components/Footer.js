import React from "react";

import{FaGithub,FaTwitter}from "react-icons/fa";

const Footer =() =>{
    return(
        <div className="bg--container--black max-w1240px] mx-auto py-12 px-4 grid lg:grid-cols-3 gap-8 text-gray-300">
            <div>
            <h1 className="w-full text-3xl font-bold primary--text--color"> CODE CLUB</h1>
<p className="py-4"> A coding practice website for algo enthusiasts. Sharpen skills, solve challenges, and grow together. Join our community and level up your algorithmic expertise.  </p>
<div className="flex justify-around md:w-[75%] my-6">
    <FaGithub size={30}/>
    <FaTwitter size={30}/>
</div>
            </div>
        </div>
    )
};


export default Footer