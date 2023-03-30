import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import Loading from "../components/loading"

const PublicRoute = () => {
  const { loading, userInfo } = useSelector((state: any) => state.auth)

  if (userInfo)
    return <Navigate to="/" replace />;

  return (
    <>
        <Loading status={loading}></Loading>
        <Outlet />
    </>
  )
}


export default PublicRoute