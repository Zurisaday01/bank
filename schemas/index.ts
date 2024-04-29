import * as z from 'zod';

const bankAccountSchema = z.object({
	name: z
		.string()
		.min(1, { message: 'Name is required' })
		.max(30, { message: 'Name is too long' }),
	last_name: z
		.string()
		.min(1, { message: 'Last name is required' })
		.max(30, { message: 'Last name is too long' }),
	age: z.coerce
		.number()
		.int()
		.min(18, { message: 'You must be at least 18 years old' }),
	country: z.string().min(1, { message: 'Country is required' }),
	state: z.string().min(1, { message: 'State is required' }),
	address: z
		.string()
		.min(1, { message: 'Address is required' })
		.max(100, { message: 'Address is too long' }),
	balance: z.coerce
		.number()
		.int()
		.min(-500, { message: 'You cannot have a debt larger than $500 USD' }),
});

export default bankAccountSchema;
