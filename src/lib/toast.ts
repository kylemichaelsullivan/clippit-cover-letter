import toast from 'react-hot-toast';

export const showToast = {
	success: (message: string) => {
		toast.success(message, {
			duration: 4000,
			position: 'bottom-right',
		});
	},
	error: (message: string) => {
		toast.error(message, {
			duration: 5000,
			position: 'bottom-right',
		});
	},
	loading: (message: string) => {
		return toast.loading(message, {
			position: 'bottom-right',
		});
	},
	dismiss: (toastId: string) => {
		toast.dismiss(toastId);
	},
};
