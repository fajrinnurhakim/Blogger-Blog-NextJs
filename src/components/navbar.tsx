import Image from "next/image";

export default async function Navbar() {
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost btn-circle">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h7"
                            />
                        </svg>
                    </label>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                    >
                        <li>
                            <a>Home</a>
                        </li>
                        <li>
                            <a>MyBlog</a>
                        </li>
                        <li>
                            <a>Account</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="navbar-center">
                <a className="btn btn-ghost normal-case text-xl">Blogger</a>
            </div>
            <div className="navbar-end">
                <button className="btn btn-ghost btn-circle">
                    <Image
                        src="user.svg"
                        alt="Deskripsi Gambar"
                        width={32}
                        height={32}
                    />
                </button>
            </div>
        </div>
    );
}
