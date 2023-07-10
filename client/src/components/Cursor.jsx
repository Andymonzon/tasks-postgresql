import { useEffect, useState } from 'react'
import '../css/Cursor.css'

function Cursor () {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.pageX, y: e.pageY })
    }

    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <i className="fa-sharp fa-solid fa-pencil fixed -top-[25px] left-0 text-orange-700 text-2xl pointer-events-none my-cursor"
      style={{
        transform: `translate(${position.x}px,${position.y}px)`
      }}></i>
  )
}

export { Cursor }
