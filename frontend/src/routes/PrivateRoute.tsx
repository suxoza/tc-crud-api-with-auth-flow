import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import Loading from "../components/loading"
import Header from '../pages/components/Header'


const PrivateRoute = () => {
  const { loading, userInfo } = useSelector((state: any) => state.auth)
  const { postLoading } = useSelector((state: any) => state.posts)

  // show unauthorized screen if no user is found in redux store
  if (!userInfo)
    return <Navigate to="/register" replace />;

  return (
    <>
        <Loading status={loading || postLoading}></Loading>
        <Header />
        <Outlet />
    </>
  )
}

export default PrivateRoute