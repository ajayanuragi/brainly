import { useState } from "react";
import api from "../api/axios";
import { Link, useNavigate } from "react-router";

export function Signup() {
    const [username, setUsername] = useState<string | number>("");
    const [password, setPassword] = useState<string | number>("");
    const [message, setMessage] = useState<string | null>("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await api.post("/auth/signup", { username, password }); // Correct endpoint for signup
            const data = response.data;

            if (data.success) {
                setMessage("Signup successful! Redirecting to sign in...");
                setTimeout(() => navigate("/signin"), 2000)
            } else {
                setMessage("Signup failed: " + data.message);
            }
        } catch (error: any) {
            setMessage("Error signing up: " + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div className="h-screen w-screen flex justify-center items-center bg-gradient-to-r from-blue-400 to-blue-950">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-6 p-10 w-full max-w-md bg-white rounded-2xl shadow-xl text-lg"
            >
                <h2 className="text-2xl font-semibold text-center text-blue-900">Sign Up</h2>

                <input
                    placeholder="Username"
                    value={username}
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                />

                <input
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                />

                <button
                    type="submit"
                    className="w-full bg-blue-950 hover:bg-blue-800 text-white font-medium py-2 rounded-lg transition duration-200"
                >
                    Sign Up
                </button>
                {message && (
                    <p
                        className={`text-center text-md font-bold ${message.toLowerCase().includes("success") ? "text-green-600" : "text-red-600"
                            }`}
                    >
                        {message}
                    </p>
                )}

                <p className="text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link to="/signin" className="text-blue-700 hover:underline font-medium">
                        Sign In
                    </Link>
                </p>
            </form>
        </div>

    );
}