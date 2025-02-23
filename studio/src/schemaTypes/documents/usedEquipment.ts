import {defineArrayMember, defineField, defineType} from 'sanity'
// import PriceInput from '../../helpers/PriceInput'

export default defineType({
  name: 'used',
  type: 'document',
  title: 'Used Equipment',
  fields: [
    defineField({name: 'title', type: 'string', title: 'Name'}),
    defineField({name: 'surplus', type: 'boolean', title: 'Is this equipment surplus?'}),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'tagline', type: 'pagePortableText', title: 'Description'}),
    defineField({name: 'price', type: 'number', title: 'Price', description: 'Price in cents'}),
    defineField({name: 'itemNumber', type: 'string', title: 'Item Number'}),
    defineField({
      name: 'images',
      type: 'array',
      title: 'Images',
      of: [defineArrayMember({type: 'mainImage'})],
    }),
  ],
  initialValue: {surplus: false},
  orderings: [
    {
      title: 'Sort by Item Number Ascending',
      name: 'itemAsc',
      by: [{field: 'itemNumber', direction: 'asc'}],
    },
    {
      title: 'Sort by Item Number Descending',
      name: 'itemDesc',
      by: [{field: 'itemNumber', direction: 'desc'}],
    },
  ],
  preview: {
    select: {title: 'title', subtitle: 'itemNumber', surplus: 'surplus', media: 'images.0.asset'},
    prepare({title, subtitle, surplus, media}) {
      return {title, subtitle: surplus ? `surplus | Item ${subtitle}` : `Item ${subtitle}`, media}
    },
  },
})
