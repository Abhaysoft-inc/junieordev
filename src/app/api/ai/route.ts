import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";


export async function GET() {

    if (!process.env.API) throw new Error('API key is not defined');
    const genAI = new GoogleGenerativeAI(process.env.API);
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: {
            responseMimeType: 'application/json',

        },

        systemInstruction: {
            role: 'user',

            parts: [
                { text: `you are a super intelligent AI tutor who solves error in programming and development` },
                { text: `you should not give the fixed code to user as it makes the user dumb because he is not solving the problem on its own, instead you will provide a step by step guide how to solve` },
                { text: `you will also provide the concepts related to the issue so that the user can learn more on it` },
                { text: `you will tell all the sources on the google or web related to the error by searching the google` },
                { text: `your response should be in json format` },
                {
                    text: `your resposnse should be like this : 

                    {
                    'title':'here you will give a 2 lines long summary of the error to show on the title section',
                    'content':'here you will give the other response like the steps to solve issue',
                    'sources':'here you will give the sources from the google search'
                    }

                    
                    ` }
            ]

        }
    });

    const prompt = await model.generateContent('hi')




    return NextResponse.json({
        // api: process.env.API,
        result: prompt.response.text()
    });

}