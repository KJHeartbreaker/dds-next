'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ContactForm } from './ContactForm';
import { toast } from 'sonner';

interface ContactFormModalProps {
	isOpen: boolean;
	onClose: () => void;
	productInfo?: {
		productId?: string;
		productName?: string;
		productType?: string;
		productUrl?: string;
		itemNumber?: string;
	};
}

export default function ContactFormModal({ isOpen, onClose, productInfo }: ContactFormModalProps) {
	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose();
			}
		};

		const handleClickOutside = (e: MouseEvent) => {
			if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener('keydown', handleEscape);
			document.addEventListener('mousedown', handleClickOutside);
			document.body.style.overflow = 'hidden';
		}

		return () => {
			document.removeEventListener('keydown', handleEscape);
			document.removeEventListener('mousedown', handleClickOutside);
			document.body.style.overflow = 'unset';
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return createPortal(
		<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
			<div
				ref={modalRef}
				className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
			>
				<div className="p-6">
					<div className="flex justify-between items-center mb-6">
						<h2 className="text-2xl font-bold">Contact Us</h2>
						<button
							onClick={onClose}
							className="text-gray-500 hover:text-gray-700 focus:outline-none"
						>
							<svg
								className="w-6 h-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					</div>
					<ContactForm
						value={{
							title: 'Inquire About Equipment',
							description:
								"Have questions about this equipment? Send us a message and we'll get back to you as soon as possible.",
						}}
						productInfo={productInfo}
						onSuccess={() => {
							toast.success('Message sent successfully!');
							onClose();
						}}
						onError={(error) => {
							toast.error(error);
						}}
					/>
				</div>
			</div>
		</div>,
		document.body
	);
}
