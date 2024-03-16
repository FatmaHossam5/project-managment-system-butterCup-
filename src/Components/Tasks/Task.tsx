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

}
export default function Task({ task ,setTasks}: TaskProps) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "task",
        item:{id:task?.id,
        status:task?.status
        },
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging()
        })
      }))
      
  return (
    <div ref={drag}role="presentation" aria-roledescription="draggable task">
        <div className=" my-5 p-3 rounded-3 boxTask">
        {task?.title}
        </div>
        </div>
  )
}
