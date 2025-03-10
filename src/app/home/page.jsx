import React from 'react'
import Sidebar from '../../components/Sidebar'



function HomePage() {
    return (
        <>

            <div className="h-screen flex lato-regular">

                <div className="w-1/6 bg-[#2C3930] ">
                    <Sidebar />

                </div>
                <div className="w-5/6 bg-[#3F4F44] pt-6 ">

                    <p className="text-center text-[#DCD7C9] text-2xl lato-regular ">let's learn from a new error today!</p>

                    <div className="boxes  mx-14 h-4/6 mt-6 flex gap-6 p-3 "><div className="errorbox w-1/2 border px-4 py-2 border-red-400 text-[#DCD7C9]">
                        <textarea
                            className="w-full h-full bg-transparent outline-none resize-none"
                            placeholder="Paste your error message here..."
                            maxLength={1000}
                        />
                    </div>

                        <div className="codebox w-1/2 border px-4 py-2 border-blue-400 text-[#DCD7C9]">
                            <textarea
                                className="w-full h-full bg-transparent outline-none resize-none"
                                placeholder="Paste your code here..."
                                maxLength={2000}
                            />
                        </div>



                    </div>

                    <div className="btn justify-center flex mt-10">
                        <button className='bg-[#96918d] px-16 py-3 rounded-full lato-bold outline outline-[#2C3930] text-2xl text-[#1e2721]'>
                            Solve it
                        </button>

                    </div>




                </div>




            </div>

        </>
    )
}

export default HomePage