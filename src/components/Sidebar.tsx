import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { MdLogout } from 'react-icons/md'

function Sidebar() {
    return (
        <>

            <div className="px-2 mr-2 h-screen flex flex-col">
                <Link href={'/home'} className='cursor-pointer'>
                    <p className=" flex justify-end text-[2vw] mt-3 text-[#DCD7C9]">junieordev.</p></Link>


                <div className="account-box mt-auto mb-4 mx-2 ">
                    <div className="flex align-middle justify-between items-center gap-3">
                        <div className="image h-6 w-6 bg-white rounded-full">
                            <Image src={'https://avatar.iran.liara.run/public'} width={24} height={24} alt='' />
                        </div>
                        <p className="text-[#DCD7C9] text-[1.3vw]">Abhay Vish.</p>
                        <MdLogout color='#DCD7C9' size={20} />

                    </div>
                </div>
            </div>

        </>
    )
}

export default Sidebar