import React, { useState, useEffect } from "react";
import { auth, db } from "../components/firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Container, Row, Col, Button, Form } from "react-bootstrap";

const Chat = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const botID = "chatbot"; // Identifier for the bot user
  const botName = "ChatBot";

  // Monitor Authentication State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    return unsubscribe;
  }, []);

  // Fetch Messages
  useEffect(() => {
    if (!currentUser) return;

    const messagesRef = collection(db, "chats");
    const q = query(messagesRef, orderBy("timestamp"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => doc.data());
      setMessages(msgs);

      // Check for new messages and respond if needed
      const lastMessage = msgs[msgs.length - 1];
      if (lastMessage && lastMessage.senderID !== botID) {
        handleBotResponse(lastMessage);
      }
    });

    return unsubscribe;
  }, [currentUser]);

  // Send a Message
  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      await addDoc(collection(db, "chats"), {
        text: newMessage,
        senderID: currentUser.uid,
        senderEmail: currentUser.email,
        timestamp: serverTimestamp(),
      });
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Handle Bot Response
  const handleBotResponse = async (lastMessage) => {
    if (!lastMessage || !lastMessage.text) return;

    let botResponse = null;

    // Define simple bot responses
    if (lastMessage.text.toLowerCase().includes("hello")) {
      botResponse = `Hi there! How can I assist you today?`;
    } else if (lastMessage.text.toLowerCase().includes("help")) {
      botResponse = `Sure! I can help you with FAQs, support, and more. Just ask!`;
    } else if (lastMessage.text.toLowerCase().includes("bye")) {
      botResponse = `Goodbye! Have a great day!`;
    }

    if (botResponse) {
      try {
        await addDoc(collection(db, "chats"), {
          text: botResponse,
          senderID: botID,
          senderEmail: botName,
          timestamp: serverTimestamp(),
        });
      } catch (error) {
        console.error("Error sending bot response:", error);
      }
    }
  };

  // Log Out
  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <Container className="chat-container mt-4">
      {currentUser ? (
        <>
          <Row>
            <Col>
              <h3>Chat</h3>
              <Button variant="danger" className="mb-3" onClick={handleLogout}>
                Log Out
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="messages" style={{ maxHeight: "400px", overflowY: "auto" }}>
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`message ${
                      msg.senderID === currentUser.uid ? "sent" : "received"
                    }`}
                    style={{
                      textAlign: msg.senderID === currentUser.uid ? "right" : "left",
                      margin: "5px 0",
                    }}
                  >
                    <span
                      className={`badge ${
                        msg.senderID === currentUser.uid
                          ? "bg-primary text-light"
                          : msg.senderID === botID
                          ? "bg-info text-dark"
                          : "bg-secondary text-light"
                      }`}
                    >
                      {msg.senderID === botID ? `${botName}: ${msg.text}` : msg.text}
                    </span>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Control
                type="text"
                placeholder="Type a message"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="mt-3"
              />
              <Button
                variant="primary"
                onClick={sendMessage}
                className="mt-2"
                style={{ float: "right" }}
              >
                Send
              </Button>
            </Col>
          </Row>
        </>
      ) : (
        <h4>Please log in to access the chat.</h4>
      )}
    </Container>
  );
};

export default Chat;
