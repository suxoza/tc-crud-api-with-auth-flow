import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listAll, deletePost } from "../../features/posts/postsActions";
import { Post } from "../../features/interfaces/postInterface";
import { Link } from "react-router-dom";

const Posts = () => {

    const dispatch = useDispatch()
    const { list } = useSelector((state: any) => state.posts)

    useEffect(() => {
        if(!Object.keys(list).length)
            // @ts-ignore
            dispatch(listAll())
        }, [])
        
    const delPost = (postId?: number) => {
        // @ts-ignore
        dispatch(deletePost(postId))
    }

    return (
        <>
            <div className="flex items-center justify-center">
                <div className="flex flex-col w-[90%]">
                    <div className="flex justify-end items-center w-[90%]">
                        <Link to={'/create'} className="mt-10 uppercase max-w-fit float-right inline-flex items-center px-4 py-2 bg-gray-600 hover:bg-red-700 text-white text-sm font-medium rounded-md">
                            new post
                        </Link>
                    </div>
                    <div className="bg-yellow-900 relative overflow-x-auto mt-10 flex items-center justify-center">
                        <table className="text-sm text-left text-gray-500 dark:text-gray-400 w-full bg-red-700">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        title
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        description
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        createdAt
                                    </th>
                                    <th>
                                        
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {list.map((post: Post) => {
                                    return (
                                        <tr key={post._id?.toString()} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                { post.title }
                                            </th>
                                            <td className="px-6 py-4">
                                                { post.description.substring(0, 100) }
                                            </td>
                                            <td className="px-6 py-4">
                                                { post.createdAt }
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-center w-full h-full gap-2">
                                                    <Link to={post._id?.toString()} className="inline-flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                                        </svg>
                                                        Edit
                                                    </Link>

                                                    <button onClick={() => delPost(post?._id)} className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>

                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>


    )
}

export default Posts; 