"use client";
import { useEffect, useState } from "react";
import { getUsers, deleteUser, updateUser, getUserById } from "@/utils/fetch";
import Image from "next/image";
import Link from "next/link";

export default function Users() {
    const [page, setPage] = useState(1);
    const [blogUser, setBlogUser] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [originalUsers, setOriginalUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        getUsers(page).then((data: any) => {
            data.sort(
                (a: any, b: any) =>
                    new Date(b.created_at).getTime() -
                    new Date(a.created_at).getTime()
            );
            setBlogUser(data);
            setOriginalUsers(data);
        });
    }, [page]);

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleNextPage = () => {
        setPage(page + 1);
    };

    const handleSearch = () => {
        const filteredUsers = originalUsers.filter((user: any) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setBlogUser(filteredUsers);
    };

    const handleReset = () => {
        setBlogUser(originalUsers);
        setSearchTerm("");
    };

    const handleDelete = async (userId: any) => {
        await deleteUser(userId);
        getUsers(page).then((data) => {
            setBlogUser(data);
            setOriginalUsers(data);
        });
    };

    const handleUpdate = async (userId: any) => {
        const user = await getUserById(userId);
        setSelectedUser(user);
        setIsModalOpen(true);
    };
    const handleCancel = async () => {
        setIsModalOpen(false);
    };

    const handleSave = async () => {
        const updatedUser = {
            name: selectedUser.name,
            email: selectedUser.email,
            gender: selectedUser.gender,
            status: selectedUser.status,
        };
        await updateUser(selectedUser.id, updatedUser);
        setIsModalOpen(false);
        getUsers(page).then((data) => {
            setBlogUser(data);
            setOriginalUsers(data);
        });
    };

    return (
        <main className="flex flex-col p-5 mt-10">
            <div className="flex flex-col w-full py-2 m-auto mt-5 space-y-2 lg:space-y-0 lg:flex-row lg:space-x-2 lg:w-1/2">
                <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full input input-bordered"
                />

                <button className="btn btn-primary" onClick={handleSearch}>
                    Search
                </button>

                <button className="btn btn-secondary" onClick={handleReset}>
                    Reset
                </button>

                <Link href="/users/create" className="btn btn-primary">
                    Create User
                </Link>
            </div>

            <div className="grid grid-cols-1 gap-5 pb-5 lg:grid-cols-2">
                {blogUser.map((post: any, index: number) => (
                    <div className="shadow-md card" key={index}>
                        <div className="card-body">
                            <div className="flex flex-row justify-between">
                                <div className="flex flex-row space-x-2">
                                    <Image
                                        src="user.svg"
                                        alt="Deskripsi Gambar"
                                        width={24}
                                        height={24}
                                    />
                                    <h2>{post.name}</h2>
                                </div>

                                {post.status === "active" ? (
                                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                                ) : (
                                    <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                                )}
                            </div>

                            <hr />
                            <p>Email : {post.email}</p>
                            <p>Gender : {post.gender}</p>

                            <div className="justify-end card-actions">
                                <button
                                    className="btn btn-primary"
                                    onClick={() => handleUpdate(post.id)}
                                >
                                    Update
                                </button>

                                <button
                                    className="btn btn-secondary"
                                    onClick={() => handleDelete(post.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="justify-center join">
                <button
                    className="join-item btn btn-primary"
                    onClick={handlePrevPage}
                >
                    «
                </button>

                <button className="join-item btn btn-primary">
                    Page {page}
                </button>

                <button
                    className="join-item btn btn-primary"
                    onClick={handleNextPage}
                >
                    »
                </button>
            </div>
            {isModalOpen && (
                <div className="modal modal-open">
                    <div className="shadow-sm modal-box space-y-2">
                        <h2 className="text-center font-bold">Update User</h2>
                        <label
                            className="block mb-2 text-sm font-bold text-gray-700"
                            htmlFor="name"
                        >
                            Name
                        </label>
                        <input
                            className="input input-bordered w-full"
                            id="name"
                            type="text"
                            value={selectedUser?.name}
                            onChange={(e) =>
                                setSelectedUser({
                                    ...selectedUser,
                                    name: e.target.value,
                                })
                            }
                        />
                        <label
                            className="block mb-2 text-sm font-bold text-gray-700"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            className="input input-bordered w-full"
                            id="email"
                            type="text"
                            value={selectedUser?.email}
                            onChange={(e) =>
                                setSelectedUser({
                                    ...selectedUser,
                                    email: e.target.value,
                                })
                            }
                        />
                        <label
                            className="block mb-2 text-sm font-bold text-gray-700"
                            htmlFor="gender"
                        >
                            Gender
                        </label>
                        <select
                            className="select select-bordered w-full"
                            id="gender"
                            value={selectedUser?.gender}
                            onChange={(e) =>
                                setSelectedUser({
                                    ...selectedUser,
                                    gender: e.target.value,
                                })
                            }
                        >
                            <option value="male">male</option>
                            <option value="female">female</option>
                        </select>
                        <label
                            className="block mb-2 text-sm font-bold text-gray-700"
                            htmlFor="status"
                        >
                            Status
                        </label>
                        <select
                            className="select select-bordered w-full"
                            id="status"
                            value={selectedUser?.status}
                            onChange={(e) =>
                                setSelectedUser({
                                    ...selectedUser,
                                    status: e.target.value,
                                })
                            }
                        >
                            <option value="active">active</option>
                            <option value="inactive">inactive</option>
                        </select>
                        <div className="flex flex-row w-full space-x-2">
                            <button
                                className="btn btn-primary w-1/2"
                                onClick={handleSave}
                            >
                                Save
                            </button>
                            <button
                                className="btn btn-secondary w-1/2"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
