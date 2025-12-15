import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const loginUser = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                alert("Logged in!");
                navigate("/welcome");
            })
            .catch((err) => alert(err.message));
    };

    return (
        <div className="h-screen flex justify-center items-center bg-green-200">
            <div className="bg-white p-8 rounded-lg shadow-lg w-80">
                <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

                <input
                    type="email"
                    placeholder="Enter Email"
                    className="w-full border p-2 rounded mb-3"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Enter Password"
                    className="w-full border p-2 rounded mb-4"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={loginUser}
                    className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
                >
                    Login
                </button>
            </div>
        </div>
    );
}

export default Login;
