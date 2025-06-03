import { NextResponse } from 'next/server';
import { transporter, FROM_EMAIL, TO_EMAIL } from '@/lib/nodemailer';
import { render } from '@react-email/render';
import { Email } from '@/app/components/Email';

// Minimum score to consider the submission valid
const MIN_RECAPTCHA_SCORE = 0.5;

async function verifyRecaptcha(token: string) {
	const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
	});

	const data = await response.json();
	return data.success && data.score >= 0.5;
}

export async function POST(request: Request) {
	try {
		const { name, email, message, recaptchaToken, honeypot, sendCopy, productInfo } =
			await request.json();

		// Check honeypot
		if (honeypot) {
			return NextResponse.json({ message: 'Invalid submission' }, { status: 400 });
		}

		// Verify reCAPTCHA
		if (!recaptchaToken || !(await verifyRecaptcha(recaptchaToken))) {
			return NextResponse.json({ message: 'reCAPTCHA verification failed' }, { status: 400 });
		}

		// Prepare email content
		const emailHtml = await render(
			Email({
				name,
				email,
				message,
				productInfo,
			})
		);

		// Send email to Dwight
		await transporter.sendMail({
			from: FROM_EMAIL,
			to: TO_EMAIL,
			replyTo: email, // This ensures replies go to the user
			subject: productInfo
				? `Equipment Inquiry: ${productInfo.productName}`
				: 'New Contact Form Submission',
			html: emailHtml,
		});

		// Send copy to user if requested
		if (sendCopy) {
			await transporter.sendMail({
				from: TO_EMAIL, // This makes it appear from Dwight
				to: email,
				replyTo: TO_EMAIL, // This ensures replies go to Dwight
				subject: 'Copy of your message to Desert Drilling Supply',
				html: emailHtml,
			});
		}

		return NextResponse.json({ message: 'Email sent successfully' });
	} catch (error) {
		console.error('Error sending email:', error);
		return NextResponse.json({ message: 'Failed to send email' }, { status: 500 });
	}
}
