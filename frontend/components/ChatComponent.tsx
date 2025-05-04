"use client";
import { useEffect, useState } from "react";
import { Send } from "lucide-react";
import MarkdownPreview from "@uiw/react-markdown-preview";

const ChatComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ user: string; bot: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Listen for custom event
    document.addEventListener("chatbot", (e: CustomEventInit) => {
      console.log("Opening chatbot...");
      setIsOpen(e.detail?.open || false);
    });
  }, []);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = async () => {
    if (!input) return;

    const newMessages = [...messages, { user: input, bot: "..." }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input }),
      });

      const data = await response.json();

      if (response.ok && data.response) {
        const botReply = data.response;
        setMessages([
          ...newMessages.slice(0, -1),
          { user: input, bot: botReply },
        ]);
      } else {
        setMessages([
          ...newMessages.slice(0, -1),
          {
            user: input,
            bot: "Sorry, there was a system error. Please try again later.",
          },
        ]);
      }
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages([
        ...newMessages.slice(0, -1),
        {
          user: input,
          bot: "Sorry, unable to connect to the server.",
        },
      ]);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <div
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-green-500 border-green-400 border flex items-center justify-center cursor-pointer shadow-lg z-50"
        onClick={toggleChat}
      >
        <img
          src="/assets/krishimitro.jpg"
          alt="Chat Icon"
          className="w-full h-full rounded-full object-cover"
        />
      </div>

      {/* Chat Box */}
      {isOpen && (
        <div className="fixed bottom-20 resize-y max-h-[80vh] right-6 bg-white shadow-lg rounded-lg w-80 z-50">
          {/* Header */}
          <div className="p-4 bg-green-600 dark:bg-green-700 text-white rounded-t-lg">
            <h3 className="text-lg font-bold">KrishiMitro</h3>
            <p className="text-xs">
              Welcome! I am KrishiMitro, your agricultural assistant chatbot.
            </p>
          </div>

          {/* Messages Section */}
          <div className="h-72 overflow-y-auto p-4">
            <div className="text-xs text-gray-500">
              <p>🌾How can I help you today?</p>
              <br />
              <ul className="list-inside list-disc">
                <li>Which crop is best for your land?</li>
                <li>Diagnosis and treatment of crop diseases.</li>
                <li>Proper usage methods of fertilizers, seeds, and agri-inputs.</li>
                <li>Weather and climate information.</li>
                <li>Latest agricultural technologies and tips.</li>
                <li>
                  Ask me your questions, and I will try to give you accurate and relevant answers. Our goal is agricultural development! 🌱
                </li>
              </ul>
              <br />
              <p>Chat with KrishiMitro for any help you need. 😊</p>
            </div>
            {messages.map((msg, idx) => (
              <div key={idx} className="mb-2">
                <p className="text-orange-600 text-end font-semibold text-sm pt-4">You:</p>
                <div className="p-1 bg-orange-50 text-gray-800 rounded shadow ml-4 text-sm">{msg.user}</div>
                <p className="text-green-500 text-sm font-semibold pt-4">KrishiMitro:</p>
                <div data-color-mode="light" className="p-1 bg-green-50 rounded shadow mr-4">
                  <MarkdownPreview style={{ backgroundColor: "transparent", fontSize: "12px" }} source={msg.bot} />
                </div>
              </div>
            ))}
            {loading && (
              <div className="text-sm text-gray-700">
                KrishiMitro: Please wait while I'm typing...
              </div>
            )}
          </div>

          {/* Input Section */}
          <div className="flex items-center p-2 border-t">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow resize-y dark:text-black outline-none px-2 py-1 rounded-md border"
              disabled={loading}
            />
            <button
              onClick={handleSend}
              className={`bg-green-500 text-white px-4 py-1 rounded ml-2 ${loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              disabled={loading}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatComponent;
