"use client";
import { useState } from "react";
import { createUser } from "@/utils/fetch";

export default function CreateUsers() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [status, setStatus] = useState("");

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const user = {
            name,
            email,
            gender,
            status,
        };
        const data = await createUser(user);
        console.log(data);
    };

    return (
        <div className="container p-4 py-20 mx-auto">
            <form
                onSubmit={handleSubmit}
                className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md"
            >
                <div className="mb-4">
                    <label
                        className="block mb-2 text-sm font-bold text-gray-700"
                        htmlFor="name"
                    >
                        Name<span className="text-red-500">*</span>
                    </label>

                    <input
                        className="w-full input input-bordered"
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label
                        className="block mb-2 text-sm font-bold text-gray-700"
                        htmlFor="email"
                    >
                        Email<span className="text-red-500">*</span>
                    </label>

                    <input
                        className="w-full input input-bordered"
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label
                        className="block mb-2 text-sm font-bold text-gray-700"
                        htmlFor="gender"
                    >
                        Gender<span className="text-red-500">*</span>
                    </label>
                    <select
                        className="w-full select select-bordered"
                        id="gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        required
                    >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label
                        className="block mb-2 text-sm font-bold text-gray-700"
                        htmlFor="status"
                    >
                        Status<span className="text-red-500">*</span>
                    </label>
                    <select
                        className="w-full select select-bordered"
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        required
                    >
                        <option value="">Select status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>

                <div className="flex items-center justify-between">
                    <button className="w-full btn btn-primary" type="submit">
                        Create User
                    </button>
                </div>
            </form>
        </div>
    );
}
