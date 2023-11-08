"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getUsers } from "@/utils/fetch";

export default function Users() {
    const [page, setPage] = useState(1);
    const [blogUser, setBlogUser] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [originalUsers, setOriginalUsers] = useState([]);

    useEffect(() => {
        getUsers(page).then((data) => {
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

    return (
        <main className="flex flex-col p-5 mt-10">
            <div className="m-auto flex space-x-2 w-1/2 mt-5">
                <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input input-bordered w-full"
                />
                <button className="btn btn-primary" onClick={handleSearch}>
                    Search
                </button>
                <button className="btn btn-secondary" onClick={handleReset}>
                    Reset
                </button>
            </div>
            <div className="p-5 grid grid-cols-1 lg:grid-cols-2 gap-5">
                {blogUser.map((post: any, index: number) => (
                    <>
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
                                        <div className="w-4 h-4 rounded-full bg-green-500"></div>
                                    ) : (
                                        <div className="w-4 h-4 rounded-full bg-red-500"></div>
                                    )}
                                </div>
                                <hr />
                                <p>Email : {post.email}</p>
                                <p>Gender : {post.gender}</p>

                                <div className="justify-end card-actions">
                                    <button className="btn btn-primary">
                                        Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                ))}
            </div>
            <div className="join justify-center">
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
