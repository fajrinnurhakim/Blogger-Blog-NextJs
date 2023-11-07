"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getPost } from "@/utils/api";

export default function Home() {
    const [page, setPage] = useState(1);
    const [blogPost, setBlogPost] = useState([]);

    useEffect(() => {
        getPost(page).then((data) => setBlogPost(data));
    }, [page]);

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleNextPage = () => {
        setPage(page + 1);
    };

    return (
        <main className="flex flex-col p-5">
            <div className="p-5 m-auto grid grid-cols-1 lg:grid-cols-2 gap-5">
                {blogPost.map((post: any, index: number) => (
                    <>
                        <div className="shadow-md card" key={index}>
                            <div className="card-body">
                                <div className="flex flex-row">
                                    <Image
                                        src="user.svg"
                                        alt="Deskripsi Gambar"
                                        width={24}
                                        height={24}
                                    />
                                    <h2>{post.user_id}</h2>
                                </div>
                                <hr />
                                <h2 className="card-title">{post.title}</h2>
                                <p>
                                    {post.body.length > 50
                                        ? post.body.substring(0, 50) + "..."
                                        : post.body}
                                </p>
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
                <button className="join-item btn" onClick={handlePrevPage}>
                    «
                </button>
                <button className="join-item btn">Page {page}</button>
                <button className="join-item btn" onClick={handleNextPage}>
                    »
                </button>
            </div>
        </main>
    );
}
