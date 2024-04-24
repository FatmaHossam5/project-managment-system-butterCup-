import React from 'react'
import { useDrag } from 'react-dnd';
interface Task {
  id: string;
  title: string;
  status: string;
}
interface TaskProps {
  task: Task;
  setTasks: React.Dispatch<React.SetStateAction<any>>;
  className?: string;

}
export default function Task({ task ,className }: TaskProps) {
    const [{}, drag] = useDrag(() => ({
        type: "Task",
        item:{id:task?.id,
        status:task?.status
        },
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging(),
         

        })
        
      }))
   
  
     

  return (
    <div ref={drag}role="presentation" aria-roledescription="draggable task"className={`task ${className}`}>
        <div className={`task ${className} my-5 p-3 rounded-3 boxTask`}>
        {task?.title}
        </div>
        </div>
  )
}
