import React, { useEffect, useState } from 'react'
import { assets, dashboard_data } from '../../assets/assets'
import BlogTableItem from '../../components/admin/BlogTableItem'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const Dashboard = () => {
  
  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: [],
  })

  const fetchDasboard = async () => {
    try {
        const { data } = await axios.get('/api/admin/dashboard');
        
        data.success 
        ? setDashboardData(data.dashboardData) 
        : toast.error(data.message);

    } catch (error) {
        toast.error(error.message);
    }
  }

  const { axios } = useAppContext();

  useEffect(() => {

    fetchDasboard();

  },[])

  return (
    <div className='flex-1 p-4 md:p-10 dark:bg-gray-800'>

        <div className='flex flex-wrap gap-4'>

            <div className='flex items-center gap-4 dark:bg-gray-900 p-4 min-w-58 rounded shadow hover:scale-105 transition-all'>
                <img src={assets.dashboard_icon_1} className='size-14' alt="" />
                <div>
                    <p className='text-xl font-semibold dark:text-gray-100'>{dashboardData.blogs}</p>
                    <p className='dark:text-gray-300 font-light'>Blogs</p>
                </div>
            </div>

            <div className='flex items-center gap-4 dark:bg-gray-900 p-4 min-w-58 rounded shadow hover:scale-105 transition-all'>
                <img src={assets.dashboard_icon_2} className='size-14' alt="" />
                <div>
                    <p className='text-xl font-semibold dark:text-gray-100'>{dashboardData.comments}</p>
                    <p className='dark:text-gray-300 font-light'>Comments</p>
                </div>
            </div>

            <div className='flex items-center gap-4 dark:bg-gray-900 p-4 min-w-58 rounded shadow hover:scale-105 transition-all'>
                <img src={assets.dashboard_icon_3} className='size-14' alt="" />
                <div>
                    <p className='text-xl font-semibold dark:text-gray-100'>{dashboardData.drafts}</p>
                    <p className='dark:text-gray-300 font-light'>Drafts</p>
                </div>
            </div>
        </div>

        <div className='flex items-center gap-3 m-4 mt-6 dark:text-gray-100'>
            <div>
                <img src={assets.dashboard_icon_4} className='size-5' alt="" />
                <p>Latest Blogs</p>
            </div>
        </div>

        <div className='relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide dark:bg-gray-900'>
            <table className='w-full text-sm dark:text-gray-300'>
                <thead className='text-xs dark:text-gray-100 text-left uppercase'>
                    <tr>
                        <th scope='col' className='px-2 py-4 xl:px-6'>#</th>
                        <th scope='col' className='px-2 py-4'>Blog Title</th>
                        <th scope='col' className='px-2 py-4 max-sm:hidden'>Date</th>
                        <th scope='col' className='px-2 py-4 max-sm:hidden'>Status</th>
                        <th scope='col' className='px-2 py-4'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {dashboardData.recentBlogs.map((blog, index) => {
                        return <BlogTableItem key={blog._id} blog={blog} fetchBlogs={fetchDasboard} index={index + 1} />
                    })}
                </tbody>
            </table>
        </div>
        
    </div>
  )
}

export default Dashboard
