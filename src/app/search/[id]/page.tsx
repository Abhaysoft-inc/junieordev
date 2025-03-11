"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function SearchPage() {
    const searchParams = useSearchParams();
    const errorText = searchParams.get("error"); // Get error from URL
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!errorText) {
            setError("No error provided.");
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
                const response = await fetch("/api/ai", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ error: errorText }),
                });

                const result = await response.json();
                if (response.ok) {
                    setData(result);
                } else {
                    setError(result.error || "Unknown error");
                }
            } catch (err) {
                setError("Failed to fetch data from the API.");
            } finally {
                setLoading(false);
            }
        };


        fetchData();
    }, [errorText]);

    return (
        <div className="min-h-screen flex lato-regular">
            <div className="md:w-1/6 md:block hidden bg-[#2C3930] fixed h-screen">
                <Sidebar />
            </div>
            <div className="md:w-5/6 md:ml-[16.67%] bg-[#3F4F44] pt-6 px-10 min-h-screen">
                <p className="text-[#DCD7C9] text-4xl">
                    {loading ? (
                        <Skeleton count={2} height={36} baseColor="#2C3930" highlightColor="#DCD7C9" />
                    ) : (
                        data?.title || "Result"
                    )}
                </p>

                <p className="sources text-[#969492] mt-2">Sources: Medium</p>

                <div className="text-contents flex gap-3 mt-3 mb-36">
                    <div className="w-5/7 px-1 py-2">
                        <p className="mt-1 text-xl lato-regular text-white">
                            {loading ? (
                                <Skeleton count={26} height={20} baseColor="#2C3930" highlightColor="#DCD7C9" />
                            ) : (
                                data?.content || "No content available."
                            )}
                        </p>
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
    );
}
