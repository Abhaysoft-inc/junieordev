"use client";

import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { useSearchStore } from "@/libs/store";

function HomePage() {
    const [errorText, setErrorText] = useState("");
    const [codeText, setCodeText] = useState("");
    const [showCodeBox, setShowCodeBox] = useState(false);
    const setSearchData = useSearchStore(state => state.setSearchData);
    const router = useRouter();

    const handleSubmit = () => {
        if (!errorText.trim()) return;
        const id = uuidv4();
        setSearchData(errorText, codeText);
        router.push(`/search/${id}`);
    };

    return (
        <div className="h-screen flex lato-regular bg-gray-900 text-white">
            <div className="md:w-1/6 hidden md:block bg-gray-800 p-4">
                <Sidebar />
            </div>
            <div className="md:w-5/6 flex flex-col items-center py-10 px-6">
                <p className="text-center text-3xl font-semibold text-gray-200 mb-6">
                    Let&apos;s learn from a new error today!
                </p>

                <div className="flex flex-col md:flex-row gap-6 w-full max-w-4xl">
                    <div className={`border border-red-500 rounded-lg p-4 flex-1 shadow-lg bg-gray-800`}>
                        <textarea
                            className="w-full h-40 bg-transparent outline-none resize-none p-2 text-lg"
                            placeholder="Paste your error message here..."
                            maxLength={1000}
                            value={errorText}
                            onChange={(e) => setErrorText(e.target.value)}
                        />
                    </div>
                    {showCodeBox && (
                        <div className="border border-blue-500 rounded-lg p-4 flex-1 shadow-lg bg-gray-800">
                            <textarea
                                className="w-full h-40 bg-transparent outline-none resize-none p-2 text-lg"
                                placeholder="Paste your code here..."
                                maxLength={2000}
                                value={codeText}
                                onChange={(e) => setCodeText(e.target.value)}
                            />
                        </div>
                    )}
                </div>

                <div className="flex justify-center mt-8 gap-4">
                    {!showCodeBox && (
                        <button
                            className="bg-gray-700 px-6 py-2 rounded-full font-semibold text-lg hover:bg-gray-600 transition"
                            onClick={() => setShowCodeBox(true)}
                        >
                            Add Code for Context
                        </button>
                    )}
                    <button
                        className="bg-gradient-to-r from-purple-600 to-indigo-700 px-10 py-2 rounded-full font-semibold text-xl hover:opacity-90 transition"
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
