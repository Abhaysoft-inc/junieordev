"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // Enables GitHub-Flavored Markdown (tables, bold, italics)
import rehypeRaw from "rehype-raw"; // Allows raw HTML rendering
import { useSearchStore } from "@/libs/store";

export default function SearchPage() {
    interface ApiResponse {
        title: string;
        content: string;
        steps: string[];
        notes?: string;
        sources?: string[];
    }

    const { errorText, codeText, clearSearchData } = useSearchStore();
    const [data, setData] = useState<ApiResponse[]>([]);
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [followUp, setFollowUp] = useState("");
    const [isSending, setIsSending] = useState(false);

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
                    body: JSON.stringify({
                        error: errorText,
                        code: codeText
                    }),
                });

                const result = await response.json();
                if (response.ok) {
                    setData([result]);
                    clearSearchData();
                } else {
                    setError(result.error || "Unknown error");
                }
            } catch (err) {
                setError(String(err));
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [errorText, codeText, clearSearchData]);

    const sendFollowUp = async () => {
        if (!followUp.trim()) return;
        setIsSending(true);

        try {
            const response = await fetch("/api/ai", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ error: followUp }),
            });

            const result = await response.json();
            if (response.ok) {
                setData((prevData) => [...prevData, result]);
                setFollowUp("");
            } else {
                setError(result.error || "Unknown error");
            }
        } catch (err) {
            setError(String(err));
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="min-h-screen flex lato-regular bg-[#2A2F33]">
            <div className="md:w-1/6 md:block hidden bg-[#1F2428] fixed h-screen">
                <Sidebar />
            </div>

            <div className="md:w-5/6 md:ml-[16.67%] pt-6 px-10 min-h-screen">
                <h1 className="text-[#EAEAEA] text-4xl font-bold">
                    {loading ? (
                        <Skeleton count={2} height={36} baseColor="#1F2428" highlightColor="#EAEAEA" />
                    ) : (
                        data.length > 0 ? data[0].title : "No title available"
                    )}
                </h1>
                <p className="sources text-[#A0A0A0] mt-2">
                    Sources: {data.length > 0 && data[0].sources ? "See references below" : "No sources available"}
                </p>

                <div className="text-contents mt-6 mb-36">
                    {loading ? (
                        <Skeleton count={6} height={20} baseColor="#1F2428" highlightColor="#EAEAEA" />
                    ) : (
                        data.map((entry, index) => (
                            <div key={index} className="bg-[#1F2428] p-6 rounded-lg shadow-md text-white mt-4">
                                <h2 className="text-xl font-semibold text-[#EAEAEA] border-b border-gray-600 pb-2">{entry.title}</h2>
                                <div className="text-lg leading-7 text-[#EAEAEA] mt-4">
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        rehypePlugins={[rehypeRaw]}
                                        components={{
                                            strong: ({ node, ...props }) => <strong className="font-bold text-[#FFD700]" {...props} />, // Gold color for bold
                                            em: ({ node, ...props }) => <em className="italic text-[#8AB4F8]" {...props} />,
                                        }}
                                    >
                                        {entry.content || "No details available."}
                                    </ReactMarkdown>
                                </div>
                                {entry.steps && entry.steps.length > 0 && (
                                    <div className="mt-8">
                                        <h2 className="text-xl font-semibold text-[#EAEAEA] border-b border-gray-600 pb-2">🛠 Steps to Fix</h2>
                                        <ul className="list-disc list-inside mt-3 text-[#EAEAEA] leading-7">
                                            {entry.steps.map((step, stepIndex) => (
                                                <li key={stepIndex} className="mt-2">{step}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>

                <div className="prompt-box fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] md:w-[60%] mt-10">
                    <div className="bg-[#1F2428] rounded-lg p-4 shadow-lg">
                        <div className="flex items-center gap-3">
                            <input
                                type="text"
                                value={followUp}
                                onChange={(e) => setFollowUp(e.target.value)}
                                placeholder="Ask a follow-up question..."
                                className="w-full bg-transparent text-[#EAEAEA] placeholder-gray-500 outline-none border-none"
                            />
                            <button
                                className={`bg-[#FFD700] text-[#1F2428] px-4 py-2 rounded-md hover:bg-opacity-90 transition-all ${isSending ? "opacity-50 cursor-not-allowed" : ""}`}
                                onClick={sendFollowUp}
                                disabled={isSending}
                            >
                                {isSending ? "Sending..." : "Ask"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
