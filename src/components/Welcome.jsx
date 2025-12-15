import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { ref, push, onValue, remove } from "firebase/database";
import { useNavigate } from "react-router-dom";

function Welcome() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState([]);

    // 🔐 AUTH LISTENER
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                navigate("/login");
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    // 🔹 READ TODOS (with ID)
    useEffect(() => {
        if (!user) return;

        const todoRef = ref(db, "todos/" + user.uid);
        onValue(todoRef, (snapshot) => {
            const data = snapshot.val();

            const list = data
                ? Object.entries(data).map(([id, value]) => ({
                    id,
                    ...value,
                }))
                : [];

            setTodos(list);
        });
    }, [user]);

    // 🔹 ADD TODO
    const addTodo = () => {
        if (!todo || !user) return;

        push(ref(db, "todos/" + user.uid), {
            text: todo,
        });

        setTodo("");
    };

    // ❌ DELETE TODO
    const deleteTodo = (id) => {
        remove(ref(db, "todos/" + user.uid + "/" + id));
    };

    // 🔹 LOGOUT
    const logout = () => {
        signOut(auth).then(() => navigate("/login"));
    };

    // 🔄 LOADING
    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-lg font-semibold">Loading...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-300 via-pink-200 to-purple-300">
            <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl">
                {/* Header */}
                <h2 className="text-3xl font-extrabold text-center text-purple-700 mb-2">
                    Welcome 🎉
                </h2>
                <p className="text-center text-gray-600 mb-6">
                    {user.email}
                </p>

                {/* Todo Input */}
                <div className="flex gap-2 mb-4">
                    <input
                        type="text"
                        placeholder="Enter your todo..."
                        value={todo}
                        onChange={(e) => setTodo(e.target.value)}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                    <button
                        onClick={addTodo}
                        className="bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-700 transition"
                    >
                        Add
                    </button>
                </div>

                {/* Todo List */}
                <ul className="space-y-2 mb-6 max-h-60 overflow-y-auto">
                    {todos.length === 0 && (
                        <li className="text-center text-gray-400">
                            No todos yet ✨
                        </li>
                    )}

                    {todos.map((t) => (
                        <li
                            key={t.id}
                            className="bg-purple-100 px-4 py-2 rounded-lg shadow-sm flex justify-between items-center"
                        >
                            <span className="text-gray-800">{t.text}</span>

                            <button
                                onClick={() => deleteTodo(t.id)}
                                className="text-sm bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>

                {/* Logout */}
                <button
                    onClick={logout}
                    className="w-full bg-red-600 text-white py-2 rounded-xl font-semibold hover:bg-red-700 transition"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Welcome;
