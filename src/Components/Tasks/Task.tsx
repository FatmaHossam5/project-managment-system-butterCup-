import React from 'react'
import { useDrag } from 'react-dnd';

export default function Task({task}) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "task",
        item:{id:task?.id,
        status:task?.status
        },
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging()
        })
      }))
      console.log(isDragging);
  return (
    <div ref={drag}>
        
        
        <div className=" my-5 p-3 rounded-3 boxTask">
        {task?.title}
        </div>
    
        
        
        
        </div>
  )
}
