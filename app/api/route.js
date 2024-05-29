import { NextResponse } from "next/server";
import { OpenAIClient, AzureKeyCredential } from "@azure/openai";


const endpoint = process.env.AZURE_OPENAI_ENPOINT;
const apikey = process.env.AZURE_OPENAI_API_KEY;
const model = process.env.AZURE_OPENAI_MODEL;

export async function POST(req){

    const client = new OpenAIClient(endpoint, new AzureKeyCredential(apikey));

    const {messages}= await req.json();
    // const messages = [
    //     {
    //         role: 'system',
    //         content: 'QudMeet Great Assistant'
    //     },
    //     {
    //         role: 'user',
    //         content: 'What is the benefit of OpenAI to Developers'
    //     }
    // ];

    const response = await client.getChatCompletions(model,messages,{
        maxTokens: 129,
    })


    return NextResponse.json({
        message: response.choices[0].message.content
    })
}