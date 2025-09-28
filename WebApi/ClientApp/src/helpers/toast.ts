import hotToast from 'react-hot-toast';


export const NotifyHelper = {
    //https://react-hot-toast.com/docs/toast
    Success: (message: string) => hotToast.success(message),
    Error: (message?: string) => hotToast.error(message ?? "Error"),
    Warning: (message: string) => hotToast.error(message)
}