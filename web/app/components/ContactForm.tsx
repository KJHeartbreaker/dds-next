'use client';

import { useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

export interface ContactFormProps {
	value: {
		title?: string;
		description?: string;
	};
	productInfo?: {
		productId?: string;
		productName?: string;
		productType?: string;
	};
	onSuccess?: () => void;
	onError?: (error: string) => void;
}

export function ContactForm({ value, productInfo, onSuccess, onError }: ContactFormProps) {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		message: '',
		honeypot: '', // Hidden field to catch bots
		sendCopy: false, // New field for sending a copy
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { executeRecaptcha } = useGoogleReCaptcha();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			if (!executeRecaptcha) {
				throw new Error('reCAPTCHA not initialized');
			}

			// Get reCAPTCHA token
			const recaptchaToken = await executeRecaptcha('contact_form');
			if (!recaptchaToken) {
				throw new Error('reCAPTCHA verification failed');
			}

			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					...formData,
					productInfo,
					recaptchaToken,
				}),
			});

			if (!response.ok) {
				const data = await response.json();
				throw new Error(data.message || 'Failed to submit form');
			}

			setFormData({ name: '', email: '', message: '', honeypot: '', sendCopy: false });
			onSuccess?.();
		} catch (error) {
			onError?.(error instanceof Error ? error.message : 'An error occurred');
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value, type } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
		}));
	};

	return (
		<div className="w-full p-6 bg-white rounded-lg shadow-md">
			{value.title && <h3 className="text-xl font-semibold mb-4">{value.title}</h3>}
			{value.description && <p className="text-gray-600 mb-6">{value.description}</p>}
			{productInfo?.productName && (
				<div className="mb-6 p-4 bg-gray-50 rounded-md">
					<p className="text-sm text-gray-600">
						Inquiring about:{' '}
						<span className="font-medium">{productInfo.productName}</span>
					</p>
				</div>
			)}
			<form onSubmit={handleSubmit} className="space-y-4">
				{/* Honeypot field - hidden from real users */}
				<div className="hidden">
					<label htmlFor="honeypot">Leave this empty</label>
					<input
						type="text"
						id="honeypot"
						name="honeypot"
						value={formData.honeypot}
						onChange={handleChange}
						tabIndex={-1}
						autoComplete="off"
					/>
				</div>
				<div>
					<label htmlFor="name" className="block text-sm font-medium text-gray-700">
						Name
					</label>
					<input
						type="text"
						id="name"
						name="name"
						value={formData.name}
						onChange={handleChange}
						required
						className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
					/>
				</div>
				<div>
					<label htmlFor="email" className="block text-sm font-medium text-gray-700">
						Email
					</label>
					<input
						type="email"
						id="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						required
						className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
					/>
				</div>
				<div>
					<label htmlFor="message" className="block text-sm font-medium text-gray-700">
						Message
					</label>
					<textarea
						id="message"
						name="message"
						value={formData.message}
						onChange={handleChange}
						required
						rows={4}
						className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
					/>
				</div>
				<div className="flex items-center">
					<input
						type="checkbox"
						id="sendCopy"
						name="sendCopy"
						checked={formData.sendCopy}
						onChange={handleChange}
						className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
					/>
					<label htmlFor="sendCopy" className="ml-2 block text-sm text-gray-700">
						Send me a copy of this message
					</label>
				</div>
				<button
					type="submit"
					disabled={isSubmitting}
					className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
				>
					{isSubmitting ? 'Sending...' : 'Send Message'}
				</button>
			</form>
		</div>
	);
}
