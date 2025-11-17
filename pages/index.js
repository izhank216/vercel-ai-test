import { useState, useEffect } from "react";
import Head from "next/head";

export default function Home() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");

  const sendMessage = async () => {
    if (!message) return;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      setReply(data.reply);
    } catch (err) {
      console.error("Error fetching AI response:", err);
      setReply("Error: could not get response.");
    }
  };

  // jQuery UI draggable after page load
  useEffect(() => {
    if (typeof window !== "undefined" && window.$ && window.$.ui) {
      $("#ai-response").draggable();
    }
  }, [reply]);

  return (
    <>
      <Head>
        {/* Bootstrap CSS */}
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        {/* Tailwind CSS */}
        <script src="https://cdn.tailwindcss.com"></script>
        {/* jQuery */}
        <script src="https://code.jquery.com/jquery-3.7.0.min.js"></script>
        {/* jQuery Migrate */}
        <script src="https://code.jquery.com/jquery-migrate-3.4.1.min.js"></script>
        {/* jQuery UI */}
        <link
          rel="stylesheet"
          href="https://code.jquery.com/ui/1.14.2/themes/base/jquery-ui.css"
        />
        <script src="https://code.jquery.com/ui/1.14.2/jquery-ui.min.js"></script>
      </Head>

      <div className="container mx-auto mt-10 p-5 chat-container">
        <h1 className="text-center mb-5">Vercel AI Chat</h1>

        <textarea
          className="form-control mb-3 input-area"
          rows={5}
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button className="btn btn-primary w-100 mb-3 send-btn" onClick={sendMessage}>
          Send
        </button>

        <div id="ai-response" className="ai-response">
          {reply}
        </div>
      </div>

      <style jsx>{`
        /* Chat container using Tailwind + Bootstrap inspiration */
        .chat-container {
          background-color: #f8f9fa; /* Bootstrap light */
          border-radius: 10px;
          border: 1px solid #dee2e6;
        }

        .input-area {
          font-size: 16px;
          border-radius: 5px;
          padding: 10px;
        }

        .send-btn {
          font-weight: bold;
        }

        .ai-response {
          background-color: #ffffff;
          padding: 15px;
          border-radius: 8px;
          border: 1px solid #ccc;
          min-height: 100px;
          white-space: pre-wrap;
          cursor: move; /* shows draggable */
        }
      `}</style>
    </>
  );
}

