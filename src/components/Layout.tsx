
import { Outlet } from 'react-router-dom'
const Layout = () => {
 
    return (
        <div className='p-8 w-full flex-1 lg:ml-80'>
            <Outlet />
        </div>
    )
}

export default Layout