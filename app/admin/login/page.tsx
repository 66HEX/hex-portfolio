"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const AdminLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const result = await signIn("credentials", {
            redirect: false,
            username,
            password,
        });

        if (result?.error) {

            setError("Invalid username or password");
        } else if (result?.ok) {

            router.push("/admin/dashboard");
        }
    };

    return (
        <section className="w-screen h-svh flex items-center justify-center bg-hexwhite p-4 md:p-8 lg:p-12 xl:p-16">
            <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-2xl">
                <div className="absolute top-5 left-5">
                    <Link href="/">
            <span className="text-hexblack text-base font-SupplyMono hover:underline cursor-pointer">
              ← Back to Home
            </span>
                    </Link>
                </div>
                <h1 className="font-GeistSans text-4xl md:text-5xl lg:text-6xl font-black text-hexblack tracking-tight leading-tight mb-8 text-center">
                    Admin Login
                </h1>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label
                            htmlFor="username"
                            className="block text-base font-GeistMono text-hexblack mb-2"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-hexblack focus:border-hexblack font-GeistMono"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-base font-GeistMono text-hexblack mb-2"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-hexblack focus:border-hexblack font-GeistMono mb-4"
                        />
                    </div>
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-hexgreen1 text-white font-bold rounded-lg shadow-md hover:bg-hexgreen2 focus:outline-none focus:ring-2 focus:ring-hexblack font-GeistSans"
                    >
                        Log In
                    </button>
                </form>
            </div>
        </section>
    );
};

export default AdminLogin;