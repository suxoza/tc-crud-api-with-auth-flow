import { useState } from "react";
import { useDispatch, } from "react-redux";
import { useForm } from 'react-hook-form'
import { Post } from "../../features/interfaces/postInterface";
import { Link } from 'react-router-dom';
import { newPost } from "../../features/posts/postsActions";


const PostNew = () => {

    const dispatch = useDispatch()
    const [has_been_changed, set_has_been_changed] = useState<Boolean>(false)

    const { register, handleSubmit, reset } = useForm({})
    const submitForm = (data: Post) => {
        // @ts-ignore
        dispatch(newPost(data))
        set_has_been_changed(true)
        reset()
    }

    return (
        <div id="CreatePostFlow" className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            {has_been_changed && <div className=" text-center py-4 lg:px-4 flex items-center justify-center">
                <div className="w-1/3 p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex justify-center" role="alert">
                    <span className="font-semibold mr-2 flex-auto">Post has been Submitted!</span>
                    <Link to={'/'} className="flex items-center justify-end text-sm cursor-pointer underline">
                        go to list
                        <svg className="fill-current opacity-75 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"/></svg>
                    </Link>
                </div>
            </div>
            }
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                <form className="mt-6" onSubmit={handleSubmit(submitForm)}>
                    <div className="mb-2">
                        <label htmlFor="title" className="block text-sm font-semibold text-gray-800">
                            title
                        </label>
                        <input {...register('title')} required type="text" className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="description" className="block text-sm font-semibold text-gray-800">
                            description
                        </label>
                        <input {...register('description')} required type="description" className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
                    </div>
                   
                    <div className="mt-6">
                        <button type="submit" className={` w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600`}>
                            Create
                        </button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default PostNew;