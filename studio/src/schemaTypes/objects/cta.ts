import {defineField, defineType} from 'sanity'

export default defineType({
  title: 'Call to action',
  name: 'cta',
  type: 'object',
  fieldsets: [
    {
      title: 'Link',
      name: 'link',
      description: 'Only the first value of these will be used',
    },
  ],
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Landing page',
      name: 'landingPageRoute',
      type: 'reference',
      fieldset: 'link',
      to: [{type: 'page'}],
    }),
    defineField({
      title: 'External link',
      name: 'link',
      type: 'string',
      description: 'Example: https://www.sanity.io',
      fieldset: 'link',
    }),
    defineField({
      title: 'Downloadable file',
      name: 'fileDownload',
      type: 'file',
      fieldset: 'link',
    }),
    defineField({
      title: 'Kind',
      name: 'kind',
      type: 'string',
      options: {
        layout: 'radio',
        list: ['button', 'link'],
        direction: 'horizontal',
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      landingPage: 'landingPageRoute.slug.current',
      route: 'route',
      link: 'link',
    },
    prepare({title, landingPage, route, link}) {
      let subtitle = 'Not set'
      if (landingPage) {
        subtitle = `Route: /${landingPage}`
      }
      if (route) {
        subtitle = `Route: ${route}`
      }
      if (link) {
        subtitle = `External: ${link}`
      }
      return {
        title,
        subtitle,
      }
    },
  },
})
