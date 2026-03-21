"use client";
import Background from "../../../public/user-profile-background.png";
import Image from "next/image";
import { UserTypes } from "@/lib/schemas/user";
import { useState } from "react";
import { toast } from "sonner";
export default function UserProfilePage() {
    const [user, setUser] = useState<UserTypes | null>(null);
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch("/api/user-profile", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user)
            });
            const data = await response.json();
            if (response.ok && data.success && data.user) {
                toast.success(data.message);
                setUser(null);
                console.log("Created User:", data.user);
            } else {
                toast.error(data.message || "Failed to save profile. Please check your inputs.");
            }
        } catch (error) {
            toast.error("An error occurred while updating the user profile.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-8 md:px-16 gap-16 min-h-[70vh]">
            <div className="flex-1 flex items-center justify-center px-6">
                <div className="w-full max-w-3xl bg-card text-card-textColor border border-border rounded-xl shadow-2xl p-8">
                    <h3 className="text-3xl font-semibold text-center mb-8 text-textColor">
                        User Profile
                    </h3>
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6" method="submit" onSubmit={handleSubmit}>
                        <div className="flex flex-col">
                            <label className="text-sm mb-1 text-muted-textColor">
                                Email
                            </label>
                            <input
                                type="email"
                                value={user?.email || ""}
                                onChange={(e) =>
                                    setUser(prev => ({ ...prev, email: e.target.value } as UserTypes))
                                }
                                className="w-full bg-input text-textColor border border-border rounded-lg px-3 py-2 focus:ring-2 focus:ring-ring focus:outline-none transition"
                                placeholder="eg. saksham@example.com"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm mb-1 text-muted-textColor">
                                Name
                            </label>
                            <input
                                type="text"
                                value={user?.name || ""}
                                onChange={(e) =>
                                    setUser(prev => ({ ...prev, name: e.target.value } as UserTypes))
                                }
                                className="w-full bg-input text-textColor border border-border rounded-lg px-3 py-2 focus:ring-2 focus:ring-ring focus:outline-none transition"
                                placeholder="eg. Saksham Sharma"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm mb-1 text-muted-textColor">
                                Age
                            </label>
                            <input
                                type="number"
                                value={user?.age || ""}
                                onChange={(e) =>
                                    setUser(prev => ({ ...prev, age: Number(e.target.value) } as UserTypes))
                                }
                                className="w-full bg-input text-textColor border border-border rounded-lg px-3 py-2 focus:ring-2 focus:ring-ring focus:outline-none transition"
                                placeholder="eg. 25"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm mb-1 text-muted-textColor">
                                Monthly Income
                            </label>
                            <input
                                type="number"
                                value={user?.monthlyIncome || ""}
                                onChange={(e) =>
                                    setUser(prev => ({ ...prev, monthlyIncome: Number(e.target.value) } as UserTypes))
                                }
                                className="w-full bg-input text-textColor border border-border rounded-lg px-3 py-2 focus:ring-2 focus:ring-ring focus:outline-none transition"
                                placeholder="eg. 50000"
                            />
                        </div>
                        <div className="flex flex-col md:col-span-2">
                            <label className="text-sm mb-1 text-muted-textColor">
                                Savings Goal
                            </label>
                            <input
                                type="number"
                                value={user?.savingsGoal || ""}
                                onChange={(e) =>
                                    setUser(prev => ({ ...prev, savingsGoal: Number(e.target.value) } as UserTypes))
                                }
                                className="w-full bg-input text-textColor border border-border rounded-lg px-3 py-2 focus:ring-2 focus:ring-ring focus:outline-none transition"
                                placeholder="eg. 100000"
                            />
                        </div>
                        <div className="md:col-span-2 flex justify-center mt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-primary text-primary-textColor px-6 py-2 rounded-lg font-medium hover:bg-secondary transition duration-200 shadow-md disabled:opacity-50"
                            >
                                {loading ? "Creating User" : "Create User"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="flex-1 flex justify-center md:justify-end items-center relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 lg:w-96 lg:h-96 bg-blue-500/20 blur-[100px] rounded-full -z-10 animate-pulse hidden md:block" />
                <Image
                    src={Background}
                    alt="User Profile Background"
                    className="w-full max-w-112.5 lg:max-w-150 h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,109,170,0.5)] transition-transform duration-700"
                    priority
                />
            </div>
        </div>
    );
}