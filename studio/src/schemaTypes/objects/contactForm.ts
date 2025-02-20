import {defineType, defineField} from 'sanity'

export default defineType({
  title: 'Contact Form',
  name: 'contactForm',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}) {
      return {
        title: `Form: ${title}`,
      }
    },
  },
})
