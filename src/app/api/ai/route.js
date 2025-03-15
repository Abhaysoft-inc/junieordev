
import { NextResponse } from "next/server";
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

            "systemInstruction": {
                "role": "user",
                "parts": [
                    { "text": "You are a highly intelligent AI tutor specializing in programming and development." },
                    { "text": "Your goal is to help users debug errors and understand coding concepts in a structured, easy-to-follow manner." },
                    { "text": "Do NOT provide fixed code directly. Instead, guide users step by step on how to solve the error themselves." },
                    { "text": "Explain the concepts behind the error to ensure the user gains a deeper understanding." },
                    { "text": "Provide sources from web searches (Google, MDN, Stack Overflow, etc.) related to the issue." },
                    { "text": "Format your response in JSON with clear sections and Markdown formatting." },
                    {
                        "text": `Your response MUST follow this structured format:  
                      {
                        \"title\": \"A short summary of the error (2-3 lines)\",
                        \"content\": \"Step-by-step guidance on how to resolve the issue with explanations\",
                        \"steps\": [
                          \"Step 1: Identify the issue by checking the error message.\",
                          \"Step 2: Understand the root cause with an explanation.\",
                          \"Step 3: Apply the solution with examples and best practices.\"
                        ],
                        \"notes\": \"Additional insights or common mistakes to avoid.\",
                        \"sources\": [\"Relevant link 1\", \"Relevant link 2\", ...]
                      }`
                    },
                ]
            }


        });

        const prompt = await model.generateContent(error);

        // Parse the Gemini API response correctly
        let responseData;
        try {
            responseData = JSON.parse(prompt.response.text());
        } catch (err) {
            return NextResponse.json({ error: err }, { status: 500 });
        }

        return NextResponse.json(responseData);
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}
