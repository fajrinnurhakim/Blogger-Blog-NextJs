"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getPosts, getComment } from "@/utils/fetch";

export default function Home() {
    const [page, setPage] = useState(1);
    const [blogPost, setBlogPost] = useState([]);
    const [comments, setComments] = useState([]);
    const [currentPostId, setCurrentPostId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPostBody, setSelectedPostBody] = useState("");
    const [selectedPostTitle, setSelectedPostTitle] = useState("");

    useEffect(() => {
        getPosts(page).then((data) => setBlogPost(data));
    }, [page]);

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleNextPage = () => {
        setPage(page + 1);
    };

    const handlePostClick = async (postId: any) => {
        const data = await getComment(postId);
        const postData: any = blogPost.find((post: any) => post.id === postId);
        setSelectedPostBody(postData.body);
        setSelectedPostTitle(postData.title);
        setComments(data);
        setCurrentPostId(postId);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <main className="flex flex-col p-5 mt-10">
            <div className="grid grid-cols-1 gap-5 py-5 m-auto lg:grid-cols-2">
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
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => handlePostClick(post.id)}
                                    >
                                        Details
                                    </button>
                                </div>
                                {isModalOpen && (
                                    <dialog className="modal" open>
                                        <div className="shadow-sm modal-box">
                                            <button
                                                className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2"
                                                onClick={handleCloseModal}
                                            >
                                                ✕
                                            </button>
                                            <p className="font-bold">
                                                {selectedPostTitle}
                                            </p>
                                            <p>{selectedPostBody}</p>
                                            <hr />
                                            <p className="font-bold">
                                                Comments
                                            </p>
                                            {comments.map(
                                                (comment: any) =>
                                                    comment.post_id ===
                                                        currentPostId && (
                                                        <div
                                                            className="p-2 mb-1 bg-gray-100 rounded-lg"
                                                            key={comment.id}
                                                        >
                                                            <h3 className="font-bold">
                                                                {comment.name}
                                                            </h3>
                                                            <p>
                                                                {comment.body}
                                                            </p>
                                                        </div>
                                                    )
                                            )}
                                        </div>
                                    </dialog>
                                )}
                            </div>
                        </div>
                    </>
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
