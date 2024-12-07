"use client";
import { useState } from "react";
import { Send } from "lucide-react";

const ChatComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ user: string; bot: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = async () => {
    if (!input) return;

    // Add user's input to messages
    const newMessages = [...messages, { user: input, bot: "..." }];
    setMessages(newMessages);
    setLoading(true);

    try {
      // Call the backend API
      const response = await fetch("/api/crop-details-generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ crop: input }), // Sending the crop name as input
      });

      const data = await response.json();

      if (response.ok && data.result) {
        const botReply = `
          <p><strong>নাম:</strong> ${data.result.name}</p>
          <p><strong>বিবরণ:</strong> ${data.result.description}</p>
        `;
        setMessages([...newMessages.slice(0, -1), { user: input, bot: botReply }]);
      } else {
        setMessages([
          ...newMessages.slice(0, -1),
          { user: input, bot: "দুঃখিত, সিস্টেমের সমস্যা হয়েছে। পরে আবার চেষ্টা করুন।" },
        ]);
      }
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages([
        ...newMessages.slice(0, -1),
        { user: input, bot: "দুঃখিত, সার্ভারের সাথে সংযোগ স্থাপন করতে পারছি না।" },
      ]);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  const formatBotReply = (botText: string) => {
   
    let formattedText = botText
      .replace(/<p>/g, "<p class='text-sm text-gray-700 whitespace-pre-wrap'>")
      .replace(/<br>/g, "<br />");

   
    formattedText = formattedText.replace(/<strong>(.*?)<\/strong>/g, "<strong class='text-blue-600'>$1</strong>");
    formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, "<strong class='text-blue-600'>$1</strong>");

    return formattedText;
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <div
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-green-500 flex items-center justify-center cursor-pointer shadow-lg z-50"
        onClick={toggleChat}
      >
        <img
          src="/image.png"
          alt="Chat Icon"
          className="w-full h-full rounded-full object-cover"
        />
      </div>

      {/* Chat Box */}
      {isOpen && (
        <div className="fixed bottom-20 resize-y max-h-[80vh] right-6 bg-white shadow-lg rounded-lg w-80 z-50">
          {/* Header */}
          <div className="p-4 bg-green-600 text-white rounded-t-lg">
            <h3 className="text-lg font-bold">KrishiDishari</h3>
            <p className="text-xs">আমি আপনার সহকারী</p>
          </div>

          {/* Messages Section */}
          <div className="h-60 overflow-y-auto p-4">
            {messages.map((msg, idx) => (
              <div key={idx} className="mb-2">
                <div className="text-sm font-semibold text-gray-800">
                  {/* Display user message */}
                  <span className="text-green-500">আপনি:</span> {msg.user}
                </div>
                <span className="text-blue-500">KrishiDishari:</span>
                <div
                  className="text-sm text-gray-700 whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ __html: formatBotReply(msg.bot) }}
                />
              
              </div>
            ))}
            {loading && (
              <div className="text-sm text-gray-700">
                KrishiDishari: লেখার জন্য অপেক্ষা করুন...
              </div>
            )}
          </div>

          {/* Input Section */}
          <div className="flex items-center p-2 border-t">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="আপনার বার্তা লিখুন..."
              className="flex-grow resize-y outline-none px-2 py-1 rounded-md border"
              disabled={loading}
            />
            <button
              onClick={handleSend}
              className={`bg-green-500 text-white px-4 py-1 rounded ml-2 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
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
