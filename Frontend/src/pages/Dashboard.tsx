import Navbar from '../components/navbar'
import TaskTable from '../components/taskTable'

const Dashboard = () => {

    return (
        <div className='flex flex-col'>
            <Navbar />
            <TaskTable />
        </div>
    )
}

export default Dashboard