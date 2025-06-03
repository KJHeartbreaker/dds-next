'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useContactForm } from '@/app/hooks/useContactForm';
import ContactFormModal from '@/app/components/ContactFormModal';

interface ContactFormContextType {
	openContactForm: (info?: {
		productId?: string;
		productName?: string;
		productType?: string;
		productUrl?: string;
		itemNumber?: string;
	}) => void;
	closeContactForm: () => void;
	isOpen: boolean;
	productInfo?: {
		productId?: string;
		productName?: string;
		productType?: string;
		productUrl?: string;
		itemNumber?: string;
	};
}

const ContactFormContext = createContext<ContactFormContextType | undefined>(undefined);

export function ContactFormProvider({ children }: { children: ReactNode }) {
	const { isOpen, productInfo, openContactForm, closeContactForm } = useContactForm();

	return (
		<ContactFormContext.Provider
			value={{ openContactForm, closeContactForm, isOpen, productInfo }}
		>
			{children}
			<ContactFormModal
				isOpen={isOpen}
				onClose={closeContactForm}
				productInfo={productInfo}
			/>
		</ContactFormContext.Provider>
	);
}

export function useContactFormContext() {
	const context = useContext(ContactFormContext);
	if (context === undefined) {
		throw new Error('useContactFormContext must be used within a ContactFormProvider');
	}
	return context;
}
