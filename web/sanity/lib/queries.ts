import { defineQuery } from 'next-sanity';

export const settingsQuery = defineQuery(`*[_type == "settings"][0]`);

const linkReference = /* groq */ `
  _type == "link" => {
    "page": page->slug.current
  }
`;

const linkFields = /* groq */ `
  link {
      ...,
      ${linkReference}
      }
`;

export const getPageQuery = defineQuery(`
  *[_type == 'page' && slug.current == $slug][0]{
    _id,
    _type,
    title,
    slug,
    content[]{
      ...,
      _type == "hero" => {
        ...,
        illustration {
          ...,
          asset->
        }
      },
      _type == "callToAction" => {
        ${linkFields},
      },
      _type == "infoSection" => {
        content[]{
          ...,
          markDefs[]{
            ...,
            ${linkReference}
          }
        }
      },
      _type == "equipmentGrid" => {
        ...,
        content[]{
          ...,
          equipment->{
            _id,
            _type,
            title,
            slug,
            tagline,
            images[] {
              _type,
              asset->,
              alt,
              caption
            }
          }
        }
      }
    },
    useSiteTitle,
    includeInSitemap,
    disallowRobots,
    openGraph
  }
`);

export const sitemapData = defineQuery(`
  *[_type == "page" && defined(slug.current)] | order(_type asc) {
    "slug": slug.current,
    _type,
    _updatedAt,
  }
`);

export const pagesSlugs = defineQuery(`
  *[_type == "page" && defined(slug.current)]
  {"slug": slug.current}
`);

export const getHomePageQuery = defineQuery(`
  *[_type == 'page' && _id == "homepage"][0]{
    _id,
    _type,
    title,
    slug,
    content[]{
      ...,
      _type == "hero" => {
        ...,
        illustration {
          ...,
          asset->
        }
      },
      _type == "callToAction" => {
        ${linkFields},
      },
      _type == "infoSection" => {
        content[]{
          ...,
          markDefs[]{
            ...,
            ${linkReference}
          }
        }
      },
    },
    useSiteTitle,
    includeInSitemap,
    disallowRobots,
    openGraph
  }
`);

export const getAllPagesQuery = defineQuery(`
  *[_type == 'page' && defined(slug.current)] | order(title asc) {
    _id,
    title,
    "slug": slug.current
  }
`);

export const getUsedEquipmentQuery = defineQuery(`
  *[_type == 'used' && slug.current == $slug][0] {
    _id,
    _type,
    title,
    slug,
    surplus,
    tagline,
    price,
    itemNumber,
    images[] {
      _type,
      asset->,
      alt,
      caption
    }
  }
`);

export const usedEquipmentSlugs = defineQuery(`
  *[_type == "used" && defined(slug.current)]
  {"slug": slug.current}
`);
