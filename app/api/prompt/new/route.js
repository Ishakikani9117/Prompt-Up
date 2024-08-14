import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

//creating new prompt
export const POST = async(req) => {
    try {
        const { userId, prompt, tag } = await req.json();

        await console.log(userId);
        
        await connectToDB();
        
        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag
        });

        await newPrompt.save();
        return new Response(JSON.stringify(newPrompt), { status: 201 });
    } catch (error) {
        console.error("Failed to create a prompt", error); // Optional: Log error for debugging
        return new Response('Failed to create a prompt', { status: 500 });
    }
}