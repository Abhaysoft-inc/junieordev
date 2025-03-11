"use client"
import React from 'react'
import Sidebar from '../../components/Sidebar'
import { useRouter } from 'next/navigation';



function HomePage() {

    const [errorText, setErrorText] = React.useState('');
    const router = useRouter();

    const handleSubmit = () => {
        // const searchParams = new URLSearchParams({ error: errorText });
        router.push(`/search/sads`);
    }

    return (
        <>

            <div className="h-screen flex lato-regular">

                <div className="md:w-1/6 md:block hidden bg-[#2C3930] ">
                    <Sidebar />

                </div>
                <div className="md:w-5/6 bg-[#3F4F44] pt-6 ">

                    <p className="text-center text-[#DCD7C9] text-2xl lato-regular ">let's learn from a new error today!</p>

                    <div className="boxes  mx-14 h-4/6 mt-6 flex gap-6 p-3 ">
                        <div className="errorbox w-1/2 border px-4 py-2 border-red-400 text-[#DCD7C9] rounded">
                            <textarea
                                className="w-full h-full bg-transparent outline-none resize-none"
                                placeholder="Paste your error message here..."
                                maxLength={1000}
                            />
                        </div>

                        <div className="codebox w-1/2 border px-4 py-2 border-blue-400 text-[#DCD7C9] rounded"  >
                            <textarea
                                className="w-full h-full bg-transparent outline-none resize-none"
                                placeholder="Paste your code here..."
                                maxLength={2000}
                            />
                        </div>



                    </div>

                    <div className="btn justify-center flex mt-10">
                        <button className='bg-gradient-to-r from-indigo-700 to-purple-600 px-16 py-3 rounded-full lato-bold text-2xl text-white cursor-pointer' onClick={handleSubmit}>
                            Solve it
                        </button>

                    </div>




                </div>




            </div>

        </>
    )
}

export default HomePage