
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";

const Header = () => {
    

    const dispatch = useDispatch()
    const _logOut = () => {
        dispatch(logout())
    }

    return (
        <nav id="logOut" className="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <div></div>
                <div className="bold underline text3-xl italic">CRUD FLOW</div>
                <div className="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
                    <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
                        <li>
                            <button onClick={_logOut} className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent" aria-current="page">Log Out</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    )
}

export default Header;