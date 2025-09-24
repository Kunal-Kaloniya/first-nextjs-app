"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LuLoader } from "react-icons/lu";

export default function LoginPage() {

    const router = useRouter();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(true);

    const handleChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleLogin = async (e: any) => {
        e.preventDefault();

        try {
            setLoading(true);
            setButtonDisabled(true);

            const response = await axios.post('/api/users/login', formData);
            console.log("Login success", response.data);
            setFormData({
                email: "",
                password: ""
            });
            router.push('/dashboard');
        } catch (error: any) {
            console.log("Login failed! ", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (formData.email.length > 0 && formData.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [formData]);

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-white dark:bg-black transition-colors font-mono">
            <div className="min-w-lg h-auto mx-auto text-black dark:text-white bg-gray-200 dark:bg-[#111111] rounded-xl p-5 shadow-2xl">
                <h1 className="text-center font-semibold text-5xl m-5">Login</h1>
                <form onSubmit={handleLogin} className="flex flex-col p-5">
                    {/* E-mail */}
                    <label htmlFor="email" className="text-sm mb-1">E-mail:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="min-w-full h-15 mb-3 px-3 outline-0 bg-gray-100 dark:bg-[#1a1a1a] shadow-2xl text-md rounded-sm"
                        required
                    />
                    {/* Password */}
                    <label htmlFor="password" className="text-sm mb-1">Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="min-w-full h-15 mb-3 px-3 outline-0 bg-gray-100 dark:bg-[#1a1a1a] shadow-2xl text-md rounded-sm"
                        required
                    />

                    <button
                        type="submit"
                        className={
                            `px-4 py-2 w-50 mx-auto mt-8 rounded-md bg-green-100 dark:bg-[#002a00] transition-all
                            ${buttonDisabled ? "opacity-50" : "hover:bg-green-500 hover:text-white"}`
                        }
                        disabled={buttonDisabled}
                    >
                        {loading ? "Login" : <LuLoader className="animate-spin mx-auto" />}
                    </button>
                </form>


                <p className="mx-5 mb-3 text-[0.8rem] text-center">
                    Not a clue what these are?
                    <Link href="/signup" className="text-blue-500 pl-2 font-bold">Signup here</Link>
                </p>
            </div>
        </div>
    );
}