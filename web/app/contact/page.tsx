'use client';

import { toast } from 'sonner';
import { ContactForm } from '@/app/components/ContactForm';

export default function ContactPage() {
	return (
		<div className="container mx-auto px-4 py-8">
			<div className="max-w-2xl mx-auto">
				<h1 className="text-3xl font-bold mb-8">Contact Us</h1>
				<ContactForm
					value={{
						title: 'Get in Touch',
						description:
							"Have a question or want to learn more? Send us a message and we'll get back to you as soon as possible.",
					}}
					onSuccess={() => {
						toast.success('Message sent successfully!');
					}}
					onError={(error) => {
						toast.error(error);
					}}
				/>
			</div>
		</div>
	);
}
