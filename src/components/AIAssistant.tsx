import React, { useState, useRef, useEffect } from 'react';

const AIAssistant: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Array<{ text: string, isUser: boolean }>>([]);
    const [inputText, setInputText] = useState('');
    const chatRef = useRef<HTMLDivElement>(null);

    const aiResponses = [
        "I'd recommend checking our Quantum Smartphone - it has excellent battery life and AI-enhanced photography!",
        "The Aura Wireless Headphones are perfect for immersive sound with adaptive noise cancellation.",
        "Our Nexus Smart Watch offers advanced health monitoring in a minimalist design.",
        "Based on your interests, I suggest our premium laptop series with next-gen processors.",
        "Looking for something specific? Our catalog has detailed specifications for each product."
    ];

    const handleSendMessage = () => {
        if (!inputText.trim()) return;

        // Add user message
        const userMessage = { text: inputText, isUser: true };
        setMessages(prev => [...prev, userMessage]);
        setInputText('');

        // Simulate AI thinking
        setTimeout(() => {
            const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
            const aiMessage = { text: randomResponse, isUser: false };
            setMessages(prev => [...prev, aiMessage]);
        }, 1000);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    // Auto-scroll to bottom of chat
    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <>
            {/* AI Assistant Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-2xl hover:shadow-glow transition-all duration-300 group z-50"
            >
                <div className="text-white text-2xl group-hover:scale-110 transition-transform duration-300">
                    🤖
                </div>
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
            </button>

            {/* AI Chat Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-end justify-end pb-6 pr-6">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black bg-opacity-50"
                        onClick={() => setIsOpen(false)}
                    ></div>

                    {/* Chat Container */}
                    <div className="relative w-96 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col z-10 animate-zoom-in">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-t-2xl">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                                        <span className="text-lg">🤖</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">Shopping Assistant</h3>
                                        <p className="text-blue-100 text-sm">Online • Ready to help</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="w-8 h-8 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center"
                                >
                                    ×
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div
                            ref={chatRef}
                            className="flex-1 p-4 overflow-y-auto bg-gray-50"
                        >
                            {messages.length === 0 ? (
                                <div className="text-center text-gray-500 mt-8">
                                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <span className="text-2xl">🤖</span>
                                    </div>
                                    <p className="font-medium text-gray-700">Hi! I'm your AI shopping assistant</p>
                                    <p className="text-sm mt-1">Ask me about products, specs, or recommendations!</p>
                                </div>
                            ) : (
                                messages.map((message, index) => (
                                    <div
                                        key={index}
                                        className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} mb-4`}
                                    >
                                        <div
                                            className={`max-w-[80%] rounded-2xl px-4 py-3 ${message.isUser
                                                    ? 'bg-blue-600 text-white rounded-br-none'
                                                    : 'bg-white text-gray-800 shadow-sm rounded-bl-none border border-gray-200'
                                                }`}
                                        >
                                            {message.text}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-gray-200">
                            <div className="flex space-x-2">
                                <input
                                    type="text"
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Ask about products..."
                                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <button
                                    onClick={handleSendMessage}
                                    className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200 font-semibold"
                                >
                                    Send
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AIAssistant;