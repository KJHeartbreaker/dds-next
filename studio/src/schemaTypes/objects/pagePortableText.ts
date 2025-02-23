import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  type: 'object',
  name: 'pagePortableText',
  title: 'Portable Text Block',
  fields: [
    defineField({
      name: 'portableTextBlock',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          title: 'Block',
          styles: [
            {title: 'Paragraph', value: 'normal'},
            {title: 'H1', value: 'h1'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Number', value: 'number'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'URL',
                fields: [
                  {
                    validation: (Rule) => Rule.uri({scheme: ['http', 'https', 'mailto', 'tel']}),
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                  },
                  {
                    title: 'Open in new window',
                    name: 'blank',
                    type: 'boolean',
                  },
                ],
              },
              {
                name: 'internalLink',
                type: 'object',
                title: 'Internal Link',
                fields: [
                  {
                    name: 'item',
                    type: 'reference',
                    to: [{type: 'page'}],
                  },
                ],
              },
            ],
          },
        }),
        {
          title: 'CTA',
          name: 'cta',
          type: 'cta',
        },
        {
          // title: 'Image',
          // name: 'image',
          type: 'mainImage',
          options: {hotspot: true},
        },
      ],
    }),
    defineField({
      name: 'center',
      title: 'Center Text',
      type: 'boolean',
      description: 'Setting this to true will center all of the text within this panel.',
    }),
    defineField({
      name: 'disabled',
      title: 'Disabled',
      type: 'boolean',
      description: 'Setting this to true will disable the component, but not delete it.',
    }),
  ],
})
