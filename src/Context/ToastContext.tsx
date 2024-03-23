import { ReactNode, createContext } from "react";
import { ToastOptions, toast } from "react-toastify";
interface ToastContextType{
    getToastValue:(type:"success"|'error'|'info'|'warning',message:string,options?:ToastOptions)=>void;
}

export const ToastContext = createContext<ToastContextType>({
    getToastValue: () => {} 
  });
  

interface ToastContextProviderProps {
    children: ReactNode;
  }
  
export default  function ToastContextProvider (props:ToastContextProviderProps){

    const getToastValue =(type: "success" | "error" | "info" | "warning", message: string, options?: ToastOptions) =>
    {
        return toast[type](message,{
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            ...options,

        })
    }
return <ToastContext.Provider value={{ getToastValue}}>
{props.children}
</ToastContext.Provider>
 }