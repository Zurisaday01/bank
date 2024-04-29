'use server';

import bankAccountSchema from '@/schemas';
import * as z from 'zod';

export const createBankAccount = async (
	values: z.infer<typeof bankAccountSchema>
) => {
	const validatedFields = bankAccountSchema.safeParse(values);

	// // if the fields are not valid, send error message
	if (!validatedFields.success) {
		return { error: 'Invalid Fields' };
	}

	// // if the fields are valid, send success message
	return { success: 'Bank Account Creaded Successfully', data: values };
};
