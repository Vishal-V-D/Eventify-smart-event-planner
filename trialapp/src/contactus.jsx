import React, { useState, useEffect, useRef } from 'react';
import './index.css'; // Import Tailwind CSS
import emailjs from 'emailjs-com'; // EmailJS for sending emails
import { FaPaperPlane, FaFileUpload, FaStar, FaSmile, FaFacebookMessenger } from 'react-icons/fa'; // Icons

const Contact = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    return savedMessages ? JSON.parse(savedMessages) : [];
  });
  const [input, setInput] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedbackRating, setFeedbackRating] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const popupRef = useRef(null);

  // Save messages to localStorage
  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  const handleOptionClick = (option) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: option, user: true },
    ]);
    setTimeout(() => {
      const botResponse = generateBotResponse(option);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: botResponse, user: false },
      ]);
    }, 1000);
  };

  const generateBotResponse = (input) => {
    const lowerInput = input.toLowerCase();
    if (lowerInput.includes('book')) return 'We are booking your event!';
    if (lowerInput.includes('feedback')) return 'Please rate us from 1 to 5 stars and provide your feedback.';
    if (lowerInput.includes('schedule')) return 'Your event is scheduled successfully!';
    if (lowerInput.includes('cancel')) return 'Your event has been canceled.';
    if (lowerInput.includes('issue')) return 'Please describe the issue.';
    return "I'm sorry, I don't understand.";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: input, user: true },
      ]);
      setInput('');
      setTimeout(() => {
        const botResponse = generateBotResponse(input);
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: botResponse, user: false },
        ]);
      }, 1000);
    }
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    const messageContent = messages
      .map((msg) => (msg.user ? 'User: ' : 'Bot: ') + msg.text)
      .join('\n');

    const templateParams = {
      user_name: name,
      user_email: email,
      message:
        messageContent +
        `\nFeedback Rating: ${feedbackRating}\nFeedback Message: ${feedbackMessage}`,
    };

    emailjs
      .send('service_id', 'template_id', templateParams, 'public_id')
      .then(
        (result) => {
          alert('Email sent successfully!');
        },
        (error) => {
          alert('Failed to send email.');
        }
      );

    e.target.reset();
  };

  // Handle outside clicks to close popup
  const handleOutsideClick = (e) => {
    if (popupRef.current && !popupRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen]);

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white">
      <ContactUs sendEmail={handleEmailSubmit} setName={setName} setEmail={setEmail} />
      <Chatbot
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        messages={messages}
        input={input}
        setInput={setInput}
        popupRef={popupRef}
        handleOptionClick={handleOptionClick}
        handleSubmit={handleSubmit}
        feedbackRating={feedbackRating}
        setFeedbackRating={setFeedbackRating}
        feedbackMessage={feedbackMessage}
        setFeedbackMessage={setFeedbackMessage}
      />
    </div>
  );
};

// Contact form component
const ContactUs = ({ sendEmail, setName, setEmail }) => (
  <div className="bg-gray-800 p-6 rounded-lg shadow-md max-w-lg w-full mb-8">
    <h2 className="text-2xl font-semibold mb-4 text-yellow-300">Contact Us</h2>
    <form onSubmit={sendEmail}>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300">Name</label>
        <input
          type="text"
          className="mt-1 p-2 w-full border border-gray-600 rounded-lg bg-gray-700 text-white"
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300">Email</label>
        <input
          type="email"
          className="mt-1 p-2 w-full border border-gray-600 rounded-lg bg-gray-700 text-white"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300">Message</label>
        <textarea className="mt-1 p-2 w-full border border-gray-600 rounded-lg bg-gray-700 text-white" required></textarea>
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-purple-400 transition-all duration-300"
      >
        Submit
      </button>
    </form>
  </div>
);

// Chatbot component
const Chatbot = ({
  isOpen,
  setIsOpen,
  messages,
  input,
  setInput,
  popupRef,
  handleOptionClick,
  handleSubmit,
  feedbackRating,
  setFeedbackRating,
  feedbackMessage,
  setFeedbackMessage,
}) => (
  <div className="relative">
    <div
      onClick={() => setIsOpen(!isOpen)}
      className="fixed bottom-4 right-4 p-4 bg-cyan-500 text-white rounded-full cursor-pointer shadow-lg z-50 hover:bg-purple-400 transition-all duration-300"
    >
    <FaFacebookMessenger/>
    </div>

    {isOpen && <div className="fixed inset-0 bg-black opacity-50 z-40" />}

    {isOpen && (
      <div
        ref={popupRef}
        className="fixed bottom-4 right-4 w-full max-w-lg bg-gray-800 border border-gray-700 rounded-lg shadow-md flex flex-col z-50"
      >
        <div className="flex-1 p-4 overflow-y-auto max-h-[60vh]">
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg max-w-[80%] ${
                  msg.user ? 'ml-auto bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white' : 'bg-gray-100 text-black'
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            <button
              onClick={() => handleOptionClick('Book Event')}
              className="bg-purple-600 text-white py-1 px-3 rounded-md hover:bg-purple-500"
            >
              Book Event
            </button>
            <button
              onClick={() => handleOptionClick('Cancel Event')}
              className="bg-red-600 text-white py-1 px-3 rounded-md hover:bg-red-500"
            >
              Cancel Event
            </button>
            <button
              onClick={() => handleOptionClick('Feedback')}
              className="bg-blue-600 text-white py-1 px-3 rounded-md hover:bg-blue-500"
            >
              Feedback
            </button>
            <button
              onClick={() => handleOptionClick('Event Schedule')}
              className="bg-green-600 text-white py-1 px-3 rounded-md hover:bg-green-500"
            >
              Event Schedule
            </button>
            <button
              onClick={() => handleOptionClick('Common Issues')}
              className="bg-orange-600 text-white py-1 px-3 rounded-md hover:bg-orange-500"
            >
              Common Issues
            </button>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="p-3 border-t border-gray-700 flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-gray-700 text-white p-2 rounded-lg mr-2 focus:outline-none"
            placeholder="Type your message..."
          />
          <button type="submit" className="bg-cyan-500 text-white p-2 rounded-lg hover:bg-purple-400 transition-all duration-300">
            <FaPaperPlane />
          </button>
        </form>
        <div className="p-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Please rate us:
          </label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className={`text-xl cursor-pointer ${feedbackRating >= star ? 'text-yellow-400' : 'text-gray-400'}`}
                onClick={() => setFeedbackRating(star)}
              />
            ))}
          </div>
          <textarea
            className="mt-4 p-2 w-full border border-gray-600 rounded-lg bg-gray-700 text-white"
            placeholder="Additional feedback"
            value={feedbackMessage}
            onChange={(e) => setFeedbackMessage(e.target.value)}
          />
        </div>
      </div>
    )}
  </div>
);

export default Contact;
