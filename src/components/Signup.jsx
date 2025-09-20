import { useState } from "react";
import { auth, db } from "../config/firebase.js";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { X, UserPlus, ChevronRight } from "lucide-react";

export default function Signup() {
    const navigate = useNavigate();
    const [showSignup, setShowSignup] = useState(true);

    const [formData, setFormData] = useState({
        name: "",
        age: "",
        gender: "",
        bloodGroup: "",
        phone: "",
        email: "",
        password: ""
    });

    const [error, setError] = useState("");

    const toggleSignup = () => {
        setShowSignup(false);
        // Navigate back or close modal
        navigate("/"); // or wherever you want to go
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");

        try {
            // 1️⃣ Create user
            const userCred = await createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );

            // 2️⃣ Save extra details in Firestore
            await setDoc(doc(db, "users", userCred.user.uid), {
                name: formData.name,
                age: formData.age,
                gender: formData.gender,
                bloodGroup: formData.bloodGroup,
                phone: formData.phone,
                email: formData.email,
                createdAt: new Date()
            });

            // 3️⃣ Send verification email
            await sendEmailVerification(userCred.user);

            alert("Verification email sent! Please verify before logging in.");
            navigate("/login");

        } catch (err) {
            setError(err.message);
        }
    };

    const handleSigninClick = () => {
        navigate("/login");
    };

    return (
        <div className="fixed inset-0 bg-peach bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl border border-gray-100 w-full max-w-lg relative">
                <button
                    onClick={toggleSignup}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <X className="h-5 w-5" />
                </button>

                <div className="flex items-center space-x-2 mb-6">
                    <UserPlus className="h-5 w-5 text-blue-600" />
                    <h2 className="text-xl font-semibold text-gray-800">Join MEDCARD</h2>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSignup} className="space-y-4">
                    <div>
                        <input
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            required
                        />
                    </div>

                    {/* Age and Gender on same line */}
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            name="age"
                            placeholder="Age"
                            type="number"
                            value={formData.age}
                            onChange={handleChange}
                            className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            required
                        />
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
                            required
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    {/* Blood Group and Phone on same line */}
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            name="bloodGroup"
                            placeholder="Blood Group (e.g., A+)"
                            value={formData.bloodGroup}
                            onChange={handleChange}
                            className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            required
                        />
                        <input
                            name="phone"
                            placeholder="Phone Number"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            required
                        />
                    </div>

                    <div>
                        <input
                            name="email"
                            type="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            required
                        />
                    </div>

                    <div>
                        <input
                            name="password"
                            type="password"
                            placeholder="Password (min. 6 characters)"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            required
                            minLength={6}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
                    >
                        <UserPlus className="h-4 w-4" />
                        <span>Create Account</span>
                        <ChevronRight className="h-4 w-4" />
                    </button>
                </form>

                <p className="text-sm text-gray-500 text-center mt-4">
                    Already have an account?
                    <span
                        onClick={handleSigninClick}
                        className="text-blue-600 cursor-pointer hover:underline ml-1"
                    >
                        Sign in here
                    </span>
                </p>
            </div>
        </div>
    );
}