import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  type: 'document',
  title: 'Site Settings',
  fields: [
    defineField({name: 'title', type: 'string', title: 'Title'}),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
      description: 'Describe your site for search engines and social media.',
    }),
    defineField({
      name: 'keywords',
      type: 'array',
      title: 'Keywords',
      description: 'Add keywords that describe your site.',
      of: [defineArrayMember({type: 'string'})],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'openGraph',
      type: 'openGraph',
      title: 'Open Graph',
      description: 'These will be the default meta tags for all pages.',
    }),
  ],
})
