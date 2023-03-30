
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { userLogin } from "../features/auth/authActions"
import { User } from "../features/interfaces/userInterface"
import { useState } from "react";


const SignIn = () => {
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    
    const [error, setError] = useState(false)
    
    const submitForm = (data: User) => {
        setError(false)
        dispatch(userLogin(data) as any).then((responce: any) => {
            if(responce?.error)
                setError(true)
        })
    }


    return (
        <div id="SingInContainer" className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            {error && <div className="flex items-center justify-center">
                <div className="mt-10 w-1/3 p-2 bg-red-400 items-center text-indigo-100 leading-none lg:rounded-full flex justify-center" role="alert">
                    <span className="font-semibold mr-2 flex-auto p-3">User Not Found!</span>
                </div>
            </div>}
            <div className="w-full mt-3 p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
                   Sign in
                </h1>
                <form className="mt-6" onSubmit={handleSubmit(submitForm)}>
                    <div className="mb-2">
                        <label htmlFor="Email" className="block text-sm font-semibold text-gray-800">
                            Email
                        </label>
                        <input {...register('email')} required type="email" className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="Password" className="block text-sm font-semibold text-gray-800">
                            Password
                        </label>
                        <input {...register('password')} required type="password" className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
                    </div>
                    <div className="mt-6">
                        <button type="submit" className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                            Register
                        </button>
                    </div>
                </form>

                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    {" "}
                    Don't have an account?{" "}
                    <Link to={`/register`} className="font-medium text-purple-600 hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    )
}


export default SignIn;