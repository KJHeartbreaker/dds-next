'use client';

import { useState } from 'react';
import PortableText from '@/app/components/PortableText';
import ImageCarousel from '@/app/components/ImageCarousel';
import ContactFormModal from '@/app/components/ContactFormModal';
import { SanityImage } from '@/app/types/sanity';

type Equipment = {
	_id: string;
	_type: 'used';
	title: string;
	slug: { current: string };
	surplus: boolean;
	tagline: {
		_type: 'pagePortableText';
		portableTextBlock: Array<{
			_type: 'block';
			children: Array<{
				_type: 'span';
				text: string;
			}>;
		}>;
	};
	price: number;
	itemNumber: string;
	images: (SanityImage & { caption?: string })[];
};

export default function EquipmentClient({ equipment }: { equipment: Equipment }) {
	const [showContactModal, setShowContactModal] = useState(false);

	return (
		<div className="container">
			<div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-8">
				<div className="flex flex-col items-center justify-center p-5">
					<h1 className="text-4xl font-bold mb-6">{equipment.title}</h1>
					{equipment.itemNumber && (
						<h3 className="text-xl mb-4">Item Number: {equipment.itemNumber}</h3>
					)}
					{equipment.tagline && (
						<div className="prose max-w-none mb-6">
							<PortableText value={equipment.tagline.portableTextBlock} />
						</div>
					)}
					<div className="text-2xl font-semibold mb-6">
						<em className="not-italic">
							{equipment.price
								? `$${(equipment.price / 100).toLocaleString()}`
								: 'Call for pricing'}
						</em>
					</div>
					<div className="flex gap-4 w-full">
						<button
							onClick={() => window.history.back()}
							className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							Back
						</button>
						<button
							onClick={() => setShowContactModal(true)}
							className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							Contact Us
						</button>
					</div>
				</div>
				<div className="p-5">
					<ImageCarousel images={equipment.images} title={equipment.title} />
				</div>
			</div>
			<ContactFormModal
				isOpen={showContactModal}
				onClose={() => setShowContactModal(false)}
				productInfo={{
					productName: equipment.title,
					itemNumber: equipment.itemNumber,
					productUrl: `https://www.desertdrillingsupply.com/equipment/${equipment.slug.current}`,
				}}
			/>
		</div>
	);
}
