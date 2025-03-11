import { useState, useEffect } from "react";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [agent, setAgent] = useState(null);

  useEffect(() => {
    // Fetch available agent when the chat starts
    fetchAvailableAgent();
  }, []);

  const fetchAvailableAgent = async () => {
    try {
      const response = await fetch("/api/get-available-agent");
      const data = await response.json();
      if (data.agent) {
        setAgent(data.agent);
      } else {
        setAgent(null);
      }
    } catch (error) {
      console.error("Error fetching agent:", error);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { sender: "user", text: input };
    setMessages([...messages, newMessage]);
    setInput("");

    // Find an available agent if not already assigned
    if (!agent) {
      await fetchAvailableAgent();
    }

    // Simulate agent response
    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "agent", text: "How can I help?" }]);
    }, 1000);
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-xl font-semibold text-center mb-4">Chat Support</h2>
      <div className="h-60 overflow-y-auto border p-2 rounded">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 my-1 rounded-lg ${
              msg.sender === "user" ? "bg-blue-500 text-white self-end" : "bg-gray-200"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex mt-4">
        <input
          type="text"
          className="flex-1 p-2 border rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button className="ml-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;