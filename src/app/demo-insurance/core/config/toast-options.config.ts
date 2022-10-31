import { ToastOptions } from 'react-toastify';


export function getToastOptions(): ToastOptions
{
  return {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  };
}

