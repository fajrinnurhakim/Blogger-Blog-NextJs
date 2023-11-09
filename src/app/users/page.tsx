"use client";
import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "@/utils/fetch";
import Image from "next/image";
import Link from "next/link";

export default function Users() {
    const [page, setPage] = useState(1);
    const [blogUser, setBlogUser] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [originalUsers, setOriginalUsers] = useState([]);

    useEffect(() => {
        getUsers(page).then((data: any) => {
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
                                <button className="btn btn-primary">
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
        </main>
    );
}
