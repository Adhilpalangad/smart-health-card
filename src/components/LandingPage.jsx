import { Heart, Shield, Clock, Star, CreditCard, User, Lock, ChevronRight, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
   const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

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
      onClick={() => navigate("/login")}
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
    </div>
  );
}