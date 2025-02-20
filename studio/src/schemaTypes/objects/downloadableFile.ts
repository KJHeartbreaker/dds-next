import {defineField, defineType} from 'sanity'

export default defineType({
  title: 'File',
  name: 'downloadableFile',
  type: 'file',
  fields: [
    defineField({
      name: 'description',
      type: 'string',
      title: 'Description',
    }),
  ],
})
