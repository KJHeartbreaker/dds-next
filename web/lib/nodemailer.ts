import nodemailer from 'nodemailer';

// Validate required environment variables
const requiredEnvVars = [
	'SMTP_HOST',
	'SMTP_PORT',
	'SMTP_USER',
	'SMTP_PASSWORD',
	'CONTACT_EMAIL_FROM',
	'CONTACT_EMAIL_TO',
];

const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);

if (missingEnvVars.length > 0) {
	console.error('Missing required environment variables:', missingEnvVars.join(', '));
}

// Create a transporter using SMTP
export const transporter = nodemailer.createTransport({
	host: process.env.SMTP_HOST,
	port: Number(process.env.SMTP_PORT),
	secure: process.env.SMTP_SECURE === 'true',
	auth: {
		user: process.env.SMTP_USER,
		pass: process.env.SMTP_PASS,
	},
});

// Verify SMTP connection
transporter.verify((error, success) => {
	if (error) {
		console.error('SMTP connection error:', error);
	} else {
		console.log('SMTP server is ready to take our messages');
	}
});

// Email addresses
export const FROM_EMAIL = process.env.CONTACT_EMAIL_FROM || 'noreply@desertdrillingsupply.com';
export const TO_EMAIL = process.env.CONTACT_EMAIL_TO || 'info@desertdrillingsupply.com';
