import React, { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa'; // Icon for the send button

const Assist = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [botTyping, setBotTyping] = useState(false); // To show bot typing indicator

    const toggleChat = () => {
        setIsOpen(!isOpen);

        // Automatically greet the user when the chat opens
        if (!isOpen && messages.length === 0) {
            const welcomeMessage = {
                sender: 'bot',
                text: 'Welcome! How can I assist you today?',
            };
            setMessages([welcomeMessage]);
        }
    };

    const handleSendMessage = () => {
        if (inputMessage.trim()) {
            const newMessage = {
                sender: 'user',
                text: inputMessage,
            };
            setMessages([...messages, newMessage]);
            setInputMessage('');

            // Simulate bot typing
            setBotTyping(true);
            setTimeout(() => {
                const botMessage = {
                    sender: 'bot',
                    text: 'Hello! How can I assist you today?',
                };
                setMessages((prevMessages) => [...prevMessages, botMessage]);
                setBotTyping(false);
            }, 1000);
        }
    };

    return (
        <div>
            {/* Assist button */}
            <div
                className="assist flex fixed z-10 bottom-7 right-7 bg-gradient-to-r from-indigo-500 to-blue-500 w-16 h-16 rounded-full justify-center items-center text-5xl font-bold cursor-pointer hover:shadow-xl transition-all duration-300"
                onClick={toggleChat}
            >
                <lord-icon
                    src="https://cdn.lordicon.com/rpuubijr.json"
                    trigger="hover"
                />
            </div>

            {/* Chat window with transition */}
            {isOpen && (
                <div className="chat-window fixed bottom-20 right-7 w-80 h-[28rem] bg-white rounded-lg shadow-xl p-4 z-20 transition-all duration-500 ease-in-out">
                    <div className="chat-messages h-72 overflow-y-auto mb-2 flex flex-col space-y-2">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`p-3 rounded-lg max-w-xs ${
                                    message.sender === 'user' ? 'bg-blue-200 self-end' : 'bg-gray-200 self-start'
                                }`}
                            >
                                {message.text}
                            </div>
                        ))}
                        {botTyping && (
                            <div className="bg-gray-200 p-2 rounded-lg self-start">
                                <span className="animate-pulse">Typing...</span>
                            </div>
                        )}
                    </div>

                    {/* Input area */}
                    <div className="chat-input flex">
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded-l-lg p-2 focus:outline-none focus:border-blue-400"
                            placeholder="Type a message..."
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        />
                        <button
                            className="bg-blue-500 text-white p-2 rounded-r-lg flex justify-center items-center"
                            onClick={handleSendMessage}
                        >
                            <FaPaperPlane size={16} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Assist;