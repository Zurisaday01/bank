'use client';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import bankAccountSchema from '@/schemas';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
//https://www.npmjs.com/package/country-state-city

import { zodResolver } from '@hookform/resolvers/zod';
import { set, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState, useTransition } from 'react';
import { createBankAccount } from '@/actions/createBankAccount';
import CustomFormMessage from './CustomFormMessage';
import { Country, State } from 'country-state-city';
import { ICountry, IState } from 'country-state-city';
import { useToast } from '@/components/ui/use-toast';
import { time } from 'console';

const defaultValues = {
	name: '',
	last_name: '',
	age: 18,
	address: '',
	balance: 0,
	country: '',
	state: '',
};

const BankForm = () => {
	const [error, setError] = useState<string | undefined>('');
	const [success, setSuccess] = useState<string | undefined>('');
	const [isPending, startTransition] = useTransition();
	const [countries, setCountries] = useState<ICountry[]>(() => {
		return Country.getAllCountries();
	});
	const [selectedCountry, setSelectedCountry] = useState<string>('');
	const [states, setStates] = useState<IState[]>([]);
	const { toast } = useToast();

	// 1. Define your form.
	const form = useForm<z.infer<typeof bankAccountSchema>>({
		resolver: zodResolver(bankAccountSchema),
		defaultValues,
	});

	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof bankAccountSchema>) {
		// mutate country to country name
		values.country =
			Country.getCountryByCode(values.country)?.name || values.country;
		startTransition(() => {
			createBankAccount(values).then(res => {
				setError(res.error);
				setSuccess(res.success);

				console.log(res.data);

				if (res.success) {
					toast({
						title: 'Created!',
						description: `
							Name: ${res.data.name},
							Last Name: ${res.data.last_name},
							Age: ${res.data.age},
							Address: ${res.data.address},
							Country: ${res.data.country},
							State: ${res.data.state},
							Balance: $${res.data.balance}
						`,
					});

					// Clear the form
					setTimeout(() => {
						setSuccess('');
						setError('');
					}, 3000);
				}
			});
		});

		// Clear the form
		setSelectedCountry('');
		form.reset(defaultValues);
		setError('');
		setSuccess('');
	}

	const onClear = () => {
		setSelectedCountry('');
		form.reset(defaultValues);
		setError('');
		setSuccess('');
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
				<div className='flex gap-4 justify-between'>
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem className='w-full'>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input placeholder='Kazi' disabled={isPending} {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='last_name'
						render={({ field }) => (
							<FormItem className='w-full'>
								<FormLabel>Last Name</FormLabel>
								<FormControl>
									<Input
										placeholder='Espadas'
										disabled={isPending}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className='flex gap-4'>
					<FormField
						control={form.control}
						name='age'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Age</FormLabel>
								<FormControl>
									<Input
										placeholder='18'
										min='18'
										type='number'
										disabled={isPending}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='address'
						render={({ field }) => (
							<FormItem className='w-full'>
								<FormLabel>Address</FormLabel>
								<FormControl>
									<Input
										placeholder='501 Block Drive, East Brande, MS 28099'
										disabled={isPending}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<FormField
					control={form.control}
					name='country'
					render={({ field }) => (
						<FormItem>
							<FormLabel>County</FormLabel>
							<Select
								onValueChange={value => {
									// Get the selected country
									setSelectedCountry(value);
									// populate states
									setStates(State.getStatesOfCountry(value));
									// Get the states of the selected country
									field.onChange(value);
								}}
								value={field.value}
								disabled={isPending}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder='Select a country' />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{countries.map((country: ICountry) => (
										<SelectItem key={country.name} value={country.isoCode}>
											{country.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='state'
					render={({ field }) => (
						<FormItem>
							<FormLabel>State</FormLabel>
							<Select
								onValueChange={field.onChange}
								value={field.value}
								disabled={isPending}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder='Select a state' />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{selectedCountry && states?.length > 0 ? (
										<>
											{states.map((state: IState) => (
												<SelectItem key={state.name} value={state.name}>
													{state.name}
												</SelectItem>
											))}
										</>
									) : (
										<p>Select a country to choose a state</p>
									)}
								</SelectContent>
							</Select>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='balance'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Balance</FormLabel>
							<FormControl>
								<Input
									type='number'
									min='-500'
									disabled={isPending}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<CustomFormMessage message={error} type='error' />
				<CustomFormMessage message={success} type='success' />
				<div className='flex gap-4 justify-end'>
					<Button
						type='reset'
						variant='outline'
						disabled={isPending}
						onClick={onClear}>
						Cancel
					</Button>
					<Button type='submit' disabled={isPending}>
						Submit
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default BankForm;
