import BankForm from '@/components/BankForm';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

export default function Home() {
	return (
		<div className='h-full flex justify-center items-center '>
			<Card className='w-[600px]'>
				<CardHeader>
					<CardTitle className='text-2xl'>
						Create a customer&apos;s bank account
					</CardTitle>
					<CardDescription>
						Here you can create a new bank account. Ensure all fields are
						completed accurately before submission. Remember, the system does
						not permit debts larger than $500 USD. If you require a larger debt
						limit, consider alternative banking options.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<BankForm />
				</CardContent>
			</Card>
		</div>
	);
}
