import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import api from "../api/axios";
import { useAuth } from "../hooks/useAuth";

export function Signin() {
    const [username, setUsername] = useState<string | number>("");
    const [password, setPassword] = useState<string | number>("");
    const [message, setMessage] = useState<string | null>("");
    const navigate = useNavigate();
    const { token, setToken } = useAuth()
    useEffect(() => {
        if (token) {
            navigate("/dashboard");
        }
    }, [token, navigate]);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await api.post("/auth/signin", { username, password });
            const data = response.data;

            if (data.success) {
                setToken(data.token)
                setMessage("Signin successful! Redirecting...");
                setTimeout(() => navigate("/dashboard"), 1500);
            } else {
                setMessage("Signin failed: " + data.message);
            }
        } catch (error: any) {
            setMessage("Error signing in: " + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div className="bg-slate-100 h-screen w-screen flex justify-center items-center bg-gradient-to-r from-blue-400 to-blue-950">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 p-8 w-full max-w-md bg-white rounded-lg shadow-md text-lg"
            >
                <h2 className="text-2xl font-semibold text-center text-blue-900">Sign In</h2>
                <input
                    placeholder="Username"
                    value={username}
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-950"
                />
                <input
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-950"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-950 hover:bg-blue-800 text-white py-2 rounded transition duration-150"
                >
                    Sign In
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
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-blue-700 hover:underline font-medium">
                        Create One
                    </Link>
                </p>
            </form>
        </div>
    );
}
