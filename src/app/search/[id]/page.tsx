import React from 'react'
import Sidebar from '@/components/Sidebar'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


function uuidpage() {

    const title = '';

    return (
        <>
            <div className="min-h-screen flex lato-regular">
                <div className="md:w-1/6 md:block hidden bg-[#2C3930] fixed h-screen">
                    <Sidebar />
                </div>
                <div className="md:w-5/6 md:ml-[16.67%] bg-[#3F4F44] pt-6 px-10 min-h-screen">
                    <p className="text-[#DCD7C9] text-4xl">
                        <Skeleton count={2} height={36} enableAnimation={true} baseColor='#2C3930' highlightColor='#DCD7C9' />
                    </p>
                    <p className="sources text-[#969492] mt-2">Sources: Medium</p>
                    <div className="text-contents flex gap-3 mt-3 mb-36">
                        <div className="w-5/7 px-1 py-2">
                            <p className="mt-1 text-xl lato-regular text-white">

                                <Skeleton count={26} enableAnimation={true} height={20} baseColor='#2C3930' highlightColor='#DCD7C9' />


                            </p>
                        </div>
                        <div className=" w-2/7">

                        </div>
                    </div>

                    <div className="prompt-box fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] md:w-[60%] mt-10">
                        <div className="bg-[#2C3930] rounded-lg p-4 shadow-lg">
                            <div className="flex items-center gap-3">
                                <input
                                    type="text"
                                    placeholder="Ask a follow-up question..."
                                    className="w-full bg-transparent text-[#DCD7C9] placeholder-gray-500 outline-none border-none"
                                />
                                <button className="bg-[#DCD7C9] text-[#2C3930] px-4 py-2 rounded-md hover:bg-opacity-90 transition-all">
                                    Ask
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </>
    )
}

export default uuidpage
