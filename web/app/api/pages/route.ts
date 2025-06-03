import { NextResponse } from 'next/server';
import { createClient } from 'next-sanity';

const client = createClient({
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
	apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
	token: process.env.SANITY_API_READ_TOKEN,
	useCdn: false, // We want fresh data for the header
});

export async function GET() {
	try {
		const data = await client.fetch(`*[_type == "page"] {
			_id,
			title,
			"slug": slug.current
		}`);
		return NextResponse.json({ data });
	} catch (error) {
		console.error('Error fetching pages:', error);
		return NextResponse.json({ error: 'Failed to fetch pages' }, { status: 500 });
	}
}
