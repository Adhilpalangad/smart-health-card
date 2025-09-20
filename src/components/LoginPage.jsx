import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../config/firebase.js";
import { useNavigate } from "react-router-dom";
import { Lock, ChevronRight, ArrowLeft, Heart, User, Mail } from "lucide-react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const userCred = await signInWithEmailAndPassword(auth, email, password);
            if (!userCred.user.emailVerified) {
                setError("Please verify your email before logging in.");
                return;
            }
            navigate("/home");
        } catch (err) {
            setError("Invalid email or password");
        }
    };

    const handleSignupClick = () => {
        navigate("/signup");
    };

    const handleBackClick = () => {
        navigate("/");
    };

    const handleForgotPassword = () => {
        // You can implement password reset functionality here
        alert("Password reset functionality will be implemented soon!");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <button
                            onClick={handleBackClick}
                            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
                        >
                            <ArrowLeft className="h-5 w-5" />
                            <span className="font-medium">Back</span>
                        </button>

                        <div className="flex items-center space-x-2">
                            <Heart className="h-6 w-6 text-red-500" />
                            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                                MEDCARD
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    {/* Welcome Section */}
                    <div className="text-center">
                        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl flex items-center justify-center mb-6">
                            <Lock className="h-8 w-8 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                        <p className="text-gray-600">Sign in to access your medical profile</p>
                    </div>

                    {/* Login Form */}
                    <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleLogin} className="space-y-5">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    required
                                />
                            </div>

                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    required
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    />
                                    <span className="ml-2 text-sm text-gray-600">Remember me</span>
                                </label>

                                <button
                                    type="button"
                                    onClick={handleForgotPassword}
                                    className="text-sm text-blue-600 hover:underline"
                                >
                                    Forgot password?
                                </button>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
                            >
                                <Lock className="h-4 w-4" />
                                <span>Sign In</span>
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </form>

                        <div className="mt-6">
                            {/* Divider */}
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-200" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">Don't have an account?</span>
                                </div>
                            </div>

                            {/* Sign up link */}
                            <div className="mt-4">
                                <button
                                    onClick={handleSignupClick}
                                    className="w-full flex items-center justify-center space-x-2 py-3 px-4 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    <User className="h-4 w-4" />
                                    <span>Create new account</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="text-center">
                        <p className="text-xs text-gray-400">
                            Secure login protected by industry-standard encryption
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}