export const getGeminiResponse = async (
  userMessage: string,
  chatHistory: { role: "user" | "model"; parts: { text: string }[] }[]
) => {
  try {
    const response = await fetch(`${import.meta.env.BASE_URL.replace(/\/$/, '')}/api/chat.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: userMessage,
        history: chatHistory,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to contact chat endpoint");
    }

    const data = await response.json();
    return data.reply || "System Error: Neural Link interrupted.";
  } catch (error) {
    console.error("Chat API Error:", error);
    return "Network Error: Google AI is unreachable. Try a VPN (Singapore/USA) or check your internet.";
  }
};
