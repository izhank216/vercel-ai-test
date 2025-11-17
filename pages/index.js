import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");

  const sendMessage = async () => {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    const data = await res.json();
    setReply(data.reply);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Vercel AI Chat</h1>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={5}
        cols={50}
        placeholder="Type your message..."
      />
      <br />
      <button onClick={sendMessage}>Send</button>
      <pre>{reply}</pre>
    </div>
  );
}
