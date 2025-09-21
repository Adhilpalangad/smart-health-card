import { Heart, Shield, Clock, Star, CreditCard, User, Lock, ChevronRight, X, MessageCircle, Send, Bot } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate()
  const [showLogin, setShowLogin] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  // Chat states
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: 'Hello! I\'m HealthyBot 🌟 - your friendly Smart Health Card assistant! How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  // Predefined questions and answers organized in sets
  const questionSets = [
    [
      {
        question: "How secure is my medical data?",
        answer: "Your medical data is protected with military-grade encryption and biometric authentication. We use advanced security protocols to ensure your information remains completely private and protected from unauthorized access."
      },
      {
        question: "How do I get a Smart Health Card?",
        answer: "Getting your Smart Health Card is easy! Simply visit our registration desk at the hospital, bring a valid ID and insurance information. Our staff will help you set up your digital card in just a few minutes."
      },
      {
        question: "What information is stored on the card?",
        answer: "Your Smart Health Card stores essential medical information including your medical history, current medications, allergies, emergency contacts, insurance details, and treatment records - all securely encrypted and accessible only by authorized healthcare providers."
      }
    ],
    [
      {
        question: "Can I use it at other hospitals?",
        answer: "Yes! Your Smart Health Card works with our partner healthcare network. We're continuously expanding our network to provide you seamless healthcare access across multiple facilities."
      },
      {
        question: "What if I lose my card?",
        answer: "Don't worry! Your Smart Health Card can be quickly replaced. Contact our support team immediately, and we'll deactivate the lost card and issue you a new one. All your medical data remains safe in our secure system."
      },
      {
        question: "How much does it cost?",
        answer: "The Smart Health Card is completely free for all patients! There are no setup fees, monthly charges, or hidden costs. We believe healthcare access should be affordable and convenient for everyone."
      }
    ],
    [
      {
        question: "What are the system requirements?",
        answer: "Our Smart Health Card works with any modern smartphone or tablet. You can also access your information through our web portal on any computer with internet access. No special apps or software required!"
      },
      {
        question: "How do I update my information?",
        answer: "You can update your personal information anytime through our secure patient portal, mobile app, or by visiting any registration desk. Changes are updated instantly across all connected healthcare facilities."
      },
      {
        question: "Is there customer support available?",
        answer: "Absolutely! Our dedicated support team is available 24/7 to help you. You can reach us by phone, email, or through our live chat. We're here to make your healthcare experience as smooth as possible."
      }
    ]
  ];

  const [currentQuestionSet, setCurrentQuestionSet] = useState(0);
  const [showQuestionButtons, setShowQuestionButtons] = useState(true);

  const handleInputChange = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = () => {
    console.log('Login attempt:', loginForm);
  };

  const toggleLogin = () => {
    setShowLogin(!showLogin);
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handlePredefinedQuestion = (qa) => {
    setShowQuestionButtons(false);
    
    // Add user question
    const userMessage = {
      type: 'user',
      content: qa.question,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Add bot answer after a short delay
    setTimeout(() => {
      const botMessage = {
        type: 'bot',
        content: qa.answer,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      
      // Show question buttons again after answer
      setTimeout(() => {
        setShowQuestionButtons(true);
      }, 1000);
    }, 500);
  };

  const handleShowMoreQuestions = () => {
    const nextSet = (currentQuestionSet + 1) % questionSets.length;
    setCurrentQuestionSet(nextSet);
    
    // Add a system message showing new questions are available
    const systemMessage = {
      type: 'bot',
      content: `Here are more questions you might find helpful! 😊`,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, systemMessage]);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setShowQuestionButtons(false);
      
      const userMessage = {
        type: 'user',
        content: inputMessage,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, userMessage]);
      setInputMessage('');

      // Simple bot response for custom messages
      setTimeout(() => {
        const botMessage = {
          type: 'bot',
          content: 'Thank you for your message! HealthyBot here 🌟 - For specific inquiries, please contact our support team or try one of the predefined questions above.',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
        
        // Show question buttons again after response
        setTimeout(() => {
          setShowQuestionButtons(true);
        }, 1000);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-center px-4 sm:px-8 lg:px-12 py-4 sm:py-6 bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <div className="flex items-center space-x-3 mb-4 sm:mb-0">
          <div className="bg-blue-600 p-2 rounded-xl">
            <CreditCard className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Smart Health Card
          </h1>
        </div>

        {/* Login Button */}
        <button
          onClick={()=> navigate("/login")}
          className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center space-x-2"
        >
          <User className="h-4 w-4" />
          <span>Login</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 sm:px-8 lg:px-12 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-800 mb-4 leading-tight">
              Smart Hospital Card
              <span className="block text-blue-600">Management System</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Secure, efficient, and intelligent healthcare access with advanced digital card technology
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="bg-red-100 p-3 sm:p-4 rounded-full w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mb-4 sm:mb-6">
                <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-red-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">Health Records</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Instant access to complete medical history, prescriptions, and treatment records with military-grade security.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="bg-blue-100 p-3 sm:p-4 rounded-full w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mb-4 sm:mb-6">
                <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">Secure Access</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Advanced encryption and biometric authentication ensure your medical data remains private and protected.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 md:col-span-2 lg:col-span-1">
              <div className="bg-green-100 p-3 sm:p-4 rounded-full w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mb-4 sm:mb-6">
                <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">Fast Processing</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Streamlined check-ins, appointment scheduling, and payment processing reduce waiting times significantly.
              </p>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-gray-100">
            <h3 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6 sm:mb-8">What Our Patients Say</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              <div className="p-4 sm:p-6 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-1 mb-3 sm:mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-3 sm:mb-4 italic text-sm sm:text-base">
                  "The smart card system has revolutionized my hospital visits. No more long queues or lost paperwork. Everything is digital and secure!"
                </p>
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-600 rounded-full p-2">
                    <User className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm sm:text-base">Usman</p>
                    <p className="text-xs sm:text-sm text-gray-500">Cardiology Patient</p>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-6 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-1 mb-3 sm:mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-3 sm:mb-4 italic text-sm sm:text-base">
                  "As a frequent visitor, this smart card has made my experience so much smoother. The staff can access my information instantly."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="bg-green-600 rounded-full p-2">
                    <User className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm sm:text-base">Rayappan</p>
                    <p className="text-xs sm:text-sm text-gray-500">Orthopedic Patient</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Chat Widget */}
      <div className="fixed bottom-6 left-6 z-50">
        {/* Chat Toggle Button */}
        {!isChatOpen && (
          <button
            onClick={toggleChat}
            className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 group"
          >
            <MessageCircle className="h-6 w-6" />
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
              !
            </div>
          </button>
        )}

        {/* Chat Window */}
        {isChatOpen && (
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-80 sm:w-96 h-96 flex flex-col">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold">HealthyBot 🌟</h4>
                  <p className="text-xs opacity-90">Your health assistant</p>
                </div>
              </div>
              <button
                onClick={toggleChat}
                className="hover:bg-white/20 p-1 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-2xl ${
                      message.type === 'user'
                        ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}

              {/* Predefined Questions */}
              {showQuestionButtons && (
                <div className="space-y-2">
                  <p className="text-xs text-gray-500 text-center mb-3">
                    {messages.length <= 1 ? 'Quick questions:' : 'More questions:'}
                  </p>
                  {questionSets[currentQuestionSet].map((qa, index) => (
                    <button
                      key={index}
                      onClick={() => handlePredefinedQuestion(qa)}
                      className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-xl text-sm text-blue-700 transition-colors border border-blue-200"
                    >
                      {qa.question}
                    </button>
                  ))}
                  
                  {/* Show More Questions Button */}
                  {messages.length > 1 && (
                    <button
                      onClick={handleShowMoreQuestions}
                      className="w-full p-3 bg-gradient-to-r from-green-50 to-blue-50 hover:from-green-100 hover:to-blue-100 rounded-xl text-sm text-green-700 transition-colors border border-green-200 flex items-center justify-center space-x-2"
                    >
                      <span>Show more questions</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-2 rounded-xl hover:shadow-lg transition-all"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}