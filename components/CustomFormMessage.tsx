import {
	ExclamationTriangleIcon,
	CheckCircledIcon,
} from '@radix-ui/react-icons';
interface CustomFormMessageProps {
	type: 'error' | 'success';
	message?: string;
}
const CustomFormMessage = ({ type, message }: CustomFormMessageProps) => {
	if (!message) return null;

	if (type === 'error') {
		return (
			<div className='bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive'>
				<ExclamationTriangleIcon />
				<p>{message}</p>
			</div>
		);
	}

	if (type === 'success') {
		return (
			<div className='bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500'>
				<CheckCircledIcon className='h-4 w-4' />
				<p>{message}</p>
			</div>
		);
	}
};
export default CustomFormMessage;
