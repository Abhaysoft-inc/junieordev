
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
    try {
        if (!process.env.API) {
            return NextResponse.json({ error: "API key is missing" }, { status: 500 });
        }

        const { error } = await req.json();
        if (!error) {
            return NextResponse.json({ error: "Error message is required" }, { status: 400 });
        }

        const genAI = new GoogleGenerativeAI(process.env.API);
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            generationConfig: {
                responseMimeType: "application/json",
            },
            systemInstruction: {
                role: "user",
                parts: [
                    { text: `You are a super intelligent AI tutor who solves programming and development errors.` },
                    { text: `Do NOT provide the fixed code directly. Instead, give step-by-step guidance on how to solve the error.` },
                    { text: `Explain the concepts related to the issue to help the user understand it better.` },
                    { text: `Provide sources from Google or web searches related to the error.` },
                    { text: `Your response MUST be in JSON format.` },
                    {
                        text: `Format your response like this:  
                        {
                            "title": "A brief 2-line summary of the error",
                            "content": "Detailed steps on how to solve the issue",
                            "sources": ["source1", "source2", ...]
                        }`
                    }
                ],
            },
        });

        const prompt = await model.generateContent(error);

        // Parse the Gemini API response correctly
        let responseData;
        try {
            responseData = JSON.parse(prompt.response.text());
        } catch (e) {
            return NextResponse.json({ error: "Invalid response format from Gemini" }, { status: 500 });
        }

        return NextResponse.json(responseData);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
