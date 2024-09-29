import React from "react";

const Login = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center  hover:scale-105">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Welcome</h2>
                <form>
                    <div className="text-right mb-4">
                        <a href="#" className="text-sm text-blue-500 hover:underline">Forgot Username?</a>
                    </div>

                    <input
                        type="text"
                        placeholder="Username"
                        required
                        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-400 transition"
                    />
                    <div className="text-right mb-4">
                        <a href="#" className="text-sm text-blue-500 hover:underline">Forgot Password?</a>
                    </div>

                    <input
                        type="password"
                        placeholder="Password"
                        required
                        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-400 transition"
                    />

                    <button
                        type="submit"
                        className="w-full py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
                    >
                        Login
                    </button>

                    <div className="mt-6">
                        <p className="text-gray-600 mb-3">Or login using</p>
                        <a
                            href="https://mail.google.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center text-red-600 font-medium hover:underline"
                        >
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Gmail_Icon.png"
                                alt="Gmail"
                                className="w-5 h-5 mr-2"
                            />
                            Gmail
                        </a>
                    </div>
                </form>

                <div className="mt-6 text-gray-500 text-sm">
                    <p>&copy; 2024 Carbon Tracker | Powered by Sustainable Solutions</p>
                </div>
            </div>
        </div>
    );
}

export default Login;
