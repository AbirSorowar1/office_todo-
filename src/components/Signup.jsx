import React, { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { useNavigate } from "react-router-dom";

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const signupUser = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                set(ref(db, "users/" + userCredential.user.uid), { email });
                alert("Account created!");
                navigate("/welcome");
            })
            .catch((error) => alert(error.message));
    };

    return (
        <div className="h-screen flex justify-center items-center bg-blue-200">
            <div className="bg-white p-8 rounded-lg shadow-lg w-80">
                <h2 className="text-2xl font-bold mb-4 text-center">Create Account</h2>

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
                    onClick={signupUser}
                    className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                >
                    Signup
                </button>

                <p className="mt-3 text-center">
                    Already have an account?{" "}
                    <span
                        className="text-blue-600 cursor-pointer"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
}

export default Signup;
