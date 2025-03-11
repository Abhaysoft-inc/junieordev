"use client";

import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

function HomePage() {
    const [errorText, setErrorText] = useState("");
    const [codeText, setCodeText] = useState("");
    const [showCodeBox, setShowCodeBox] = useState(false);
    const router = useRouter();

    const handleSubmit = () => {
        if (!errorText.trim()) return;

        const id = uuidv4();
        const searchParams = new URLSearchParams({
            error: errorText,
            ...(codeText && { code: codeText })
        });

        router.push(`/search/${id}?${searchParams.toString()}`);
    };

    return (
        <div className="h-screen flex lato-regular">
            <div className="md:w-1/6 md:block hidden bg-[#2C3930]">
                <Sidebar />
            </div>
            <div className="md:w-5/6 bg-[#3F4F44] pt-6">
                <p className="text-center text-[#DCD7C9] text-2xl lato-regular">
                    let&apos;s learn from a new error today!
                </p>

                <div className="boxes mx-14 h-4/6 mt-6 flex gap-6 p-3">
                    <div className={`errorbox ${showCodeBox ? 'w-1/2' : 'w-full'} border px-4 py-2 border-red-400 text-[#DCD7C9] rounded`}>
                        <textarea
                            className="w-full h-full bg-transparent outline-none resize-none"
                            placeholder="Paste your error message here..."
                            maxLength={1000}
                            value={errorText}
                            onChange={(e) => setErrorText(e.target.value)}
                        />
                    </div>
                    {showCodeBox && (
                        <div className="codebox w-1/2 border px-4 py-2 border-blue-400 text-[#DCD7C9] rounded">
                            <textarea
                                className="w-full h-full bg-transparent outline-none resize-none"
                                placeholder="Paste your code here..."
                                maxLength={2000}
                                value={codeText}
                                onChange={(e) => setCodeText(e.target.value)}
                            />
                        </div>
                    )}
                </div>

                <div className="btn justify-center flex mt-10 gap-4">
                    {!showCodeBox && (
                        <button
                            className="bg-gray-600 px-8 py-3 rounded-full lato-bold text-lg text-white cursor-pointer"
                            onClick={() => setShowCodeBox(true)}
                        >
                            Add Code for Context
                        </button>
                    )}
                    <button
                        className="bg-gradient-to-r from-indigo-700 to-purple-600 px-16 py-3 rounded-full lato-bold text-2xl text-white cursor-pointer"
                        onClick={handleSubmit}
                    >
                        Solve it
                    </button>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
