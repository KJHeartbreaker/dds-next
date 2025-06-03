import { useState } from 'react';

interface ProductInfo {
	productId?: string;
	productName?: string;
	productType?: string;
}

export function useContactForm() {
	const [isOpen, setIsOpen] = useState(false);
	const [productInfo, setProductInfo] = useState<ProductInfo | undefined>();

	const openContactForm = (info?: ProductInfo) => {
		setProductInfo(info);
		setIsOpen(true);
	};

	const closeContactForm = () => {
		setIsOpen(false);
		setProductInfo(undefined);
	};

	return {
		isOpen,
		productInfo,
		openContactForm,
		closeContactForm,
	};
}
