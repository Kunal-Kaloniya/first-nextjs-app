"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignupPage() {

    const router = useRouter();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        department: "",
        role: "",
        email: "",
        password: "",
    });
    // const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(true);

    const departments = ['A', 'B', 'C', 'D'];
    const roles = ['admin', 'committee', 'faculty'];

    const handleChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSignup = async (e: any) => {
        e.preventDefault();

        try {
            setLoading(true);

            const response = await axios.post('/api/users/signup', formData);
            console.log("Signup success", response.data);
            router.push('/login');
        } catch (error: any) {
            console.log("Signup failed!", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-white dark:bg-black transition-colors font-mono">
            <div className="min-w-lg h-auto mx-auto text-black dark:text-white bg-gray-200 dark:bg-[#111111] rounded-xl p-5 shadow-2xl">
                <h1 className="text-center font-semibold text-5xl m-5">Register</h1>
                <form onSubmit={handleSignup} className="flex flex-col p-5">

                    {/* First Name */}
                    <label htmlFor="firstName" className="text-sm mb-1">First Name:</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="h-15 mb-3 px-3 outline-0 bg-gray-100 dark:bg-[#1a1a1a] shadow-2xl text-md rounded-sm"
                        required
                    />
                    {/* Last Name */}
                    <label htmlFor="lastName" className="text-sm mb-1">Last Name:</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="h-15 mb-3 px-3 outline-0 bg-gray-100 dark:bg-[#1a1a1a] shadow-2xl text-md rounded-sm"
                        required
                    />
                    {/* Department */}
                    <label htmlFor="department" className="text-sm mb-1">Department:</label>
                    <select
                        onChange={handleChange}
                        name="department"
                        value={formData.department}
                        className="h-15 mb-3 px-3 outline-0 bg-gray-100 dark:bg-[#1a1a1a] shadow-2xl text-md rounded-sm"
                        required
                    >
                        <option value="" defaultChecked>--select--</option>
                        {departments.map((d, index) => (
                            <option key={index} value={d}>{d}</option>
                        ))}
                    </select>
                    {/* Role */}
                    <label htmlFor="role" className="text-sm mb-1">Role:</label>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="h-15 mb-3 px-3 outline-0 bg-gray-100 dark:bg-[#1a1a1a] shadow-2xl text-md rounded-sm"
                        required
                    >
                        <option value="" defaultChecked>--select--</option>
                        {roles.map((role, index) => (
                            <option key={index} value={role}>{role}</option>
                        ))}
                    </select>
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
                        className="px-4 py-2 w-50 mx-auto mt-8 rounded-md bg-blue-100 dark:bg-slate-800 hover:bg-blue-500 hover:text-white transition-all"
                    >
                        Sign Up
                    </button>
                </form>


                <p className="mx-5 mb-3 text-[0.8rem] text-center">
                    Already registered?
                    <Link href="/login" className="text-blue-500 pl-2 font-bold">Try Loging in</Link>
                </p>
            </div>
        </div>
    );
}