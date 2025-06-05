import { client } from '@/sanity/lib/client';
import { NextResponse } from 'next/server';

export async function GET() {
	try {
		const navigation = await client.fetch(
			`*[_type == "nav" && _id == "primaryNavigation"][0]{
        _id,
        _type,
        title,
        navMenuItems[]{
          _type,
          _key,
          title,
          kind,
          landingPageRoute->{
            "slug": slug.current
          },
          link,
          fileDownload{
            asset->{
              url
            }
          }
        }
      }`
		);

		// Log the response to debug
		console.log('Navigation response:', JSON.stringify(navigation, null, 2));

		return NextResponse.json({ data: navigation });
	} catch (error) {
		console.error('Error fetching navigation:', error);
		return NextResponse.json({ error: 'Failed to fetch navigation' }, { status: 500 });
	}
}
