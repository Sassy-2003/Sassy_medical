import React from 'react'
import { assets } from '../assets/assets'
const Footer = () => {
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            {/* left */}
            <div>
                <img className='mb-5 w-40' src={assets.logo} alt=""/>
                <p className='w-full md:w-2/3 text-gray-600 lwading-6'>A Real time project developed by K.Sai ram Chowdary.<br></br>To access the webpage, please click 'Home'. For assistance, please use the chatbot in the bottom right corner.</p>
            </div>
            {/*center */}
            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Contact us</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            {/* right */}
            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>+91 7674xxxxx8</li>
                    <li>kaminenisairam33@gmail.com</li>
                </ul>
            </div>
        </div>
        {/* copyright */}
        <div>
                <hr/>
                <p className='py-5 text-sm text-center'>Copyright 2025 @Sassy</p>
            </div>
    </div>
  )
}

export default Footer