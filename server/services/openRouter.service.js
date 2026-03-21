import axios from "axios"

export const askAi = async (messages) => {
    try {
        console.log("API Key check:", process.env.OPENROUTER_API_KEY ? "Key exists" : "Key missing");
        console.log("API Key length:", process.env.OPENROUTER_API_KEY?.length || 0);
        
        if(!messages || !Array.isArray(messages) || messages.length === 0) {
            throw new Error("Messages array is empty.");
        }
        const response = await axios.post("https://openrouter.ai/api/v1/chat/completions",
            {
                model: "openai/gpt-4o-mini",
                messages: messages
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    'Content-Type': 'application/json',
                }
            });

        const content = response?.data?.choices?.[0]?.message?.content;

        if (!content || !content.trim()) {
      throw new Error("AI returned empty response.");
    }

    return content
    } catch (error) {
        console.error("OpenRouter Error Details:", {
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: error.response?.data,
            message: error.message
        });
        throw new Error("OpenRouter API Error");
    }
}