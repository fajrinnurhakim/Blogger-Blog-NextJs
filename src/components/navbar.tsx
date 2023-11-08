import Link from "next/link";

export default async function Navbar() {
    return (
        <div className="fixed top-0 z-10 w-full shadow-sm navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </label>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                    >
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                        <li>
                            <Link href="/users">Users</Link>
                        </li>
                    </ul>
                </div>
                <Link href="/" className="text-xl btn btn-ghost">
                    Blogger
                </Link>
            </div>
            <div className="hidden navbar-end lg:flex">
                <ul className="px-1 menu menu-horizontal">
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>
                        <Link href="/users">Users</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}
