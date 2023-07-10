import { Outlet } from 'react-router-dom'
import '../css/LayoutRegister.css'

function LayoutRegister () {
  return (
    <div className='bg-[#cb8849] h-screen w-full flex items-end justify-center relative'>

      <div className='bg-orange-200 relative w-1/2 h-4/5 rounded-md flex flex-col justify-center items-center libreta xs:w-[90%] sm:w-4/5 md:w-1/2'>
        <div className='w-full h-full grid justify-items-center'>
          <Outlet />
        </div>
        <div className='absolute left-3 top-11 w-6 h-6 bg-white rounded-full text-white circulo'>
          <div className='absolute text-gray-300 rounded-xl w-9 h-2 bg-gray-300 top-2 -left-[23px] anillo'></div>
        </div>
        <div>
        </div>
      </div>
    </div>
  )
}

export default LayoutRegister
