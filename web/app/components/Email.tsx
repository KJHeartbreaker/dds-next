import {
	Body,
	Container,
	Head,
	Heading,
	Html,
	Link,
	Preview,
	Section,
	Text,
} from '@react-email/components';
import * as React from 'react';

interface EmailProps {
	name: string;
	email: string;
	message: string;
	productInfo?: {
		productName?: string;
		itemNumber?: string;
		productUrl?: string;
	};
}

export const Email = ({ name, email, message, productInfo }: EmailProps) => {
	return (
		<Html>
			<Head />
			<Preview>New contact form submission from {name}</Preview>
			<Body style={main}>
				<Container style={container}>
					<Heading style={h1}>New Contact Form Submission</Heading>
					<Section style={section}>
						<Text style={text}>
							<strong>Name:</strong> {name}
						</Text>
						<Text style={text}>
							<strong>Email:</strong> {email}
						</Text>
						{productInfo?.productName && (
							<>
								<Text style={text}>
									<strong>Product:</strong> {productInfo.productName}
								</Text>
								{productInfo.itemNumber && (
									<Text style={text}>
										<strong>Item Number:</strong> {productInfo.itemNumber}
									</Text>
								)}
								{productInfo.productUrl && (
									<Text style={text}>
										<strong>Product Link:</strong>{' '}
										<Link href={productInfo.productUrl} style={link}>
											{productInfo.productUrl}
										</Link>
									</Text>
								)}
							</>
						)}
						<Text style={text}>
							<strong>Message:</strong>
						</Text>
						<Text style={messageText}>{message}</Text>
					</Section>
				</Container>
			</Body>
		</Html>
	);
};

const main = {
	backgroundColor: '#f6f9fc',
	fontFamily:
		'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
	backgroundColor: '#ffffff',
	margin: '0 auto',
	padding: '20px 0 48px',
	marginBottom: '64px',
};

const section = {
	padding: '0 48px',
};

const h1 = {
	color: '#1a1a1a',
	fontSize: '24px',
	fontWeight: '600',
	lineHeight: '1.3',
	margin: '16px 0',
};

const text = {
	color: '#1a1a1a',
	fontSize: '16px',
	lineHeight: '1.5',
	margin: '16px 0',
};

const messageText = {
	color: '#1a1a1a',
	fontSize: '16px',
	lineHeight: '1.5',
	margin: '16px 0',
	whiteSpace: 'pre-wrap',
};

const link = {
	color: '#2563eb',
	textDecoration: 'underline',
};

export default Email;
