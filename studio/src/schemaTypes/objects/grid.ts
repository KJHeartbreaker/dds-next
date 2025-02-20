import {FiGrid} from 'react-icons/fi'
import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  title: 'Content Row',
  name: 'grid',
  type: 'object',
  icon: FiGrid,
  fields: [
    defineField({
      title: 'Blocks',
      name: 'blocks',
      type: 'array',
      of: [
        defineArrayMember({type: 'pagePortableText'}),
        defineArrayMember({type: 'contactForm'}),
        defineArrayMember({type: 'mainImage'}),
      ],
    }),
  ],
  preview: {
    select: {
      blocks: 'blocks',
    },
    prepare({blocks}) {
      return {
        title: `Row with ${blocks.length} column${blocks.length > 1 ? 's' : ''}`,
      }
    },
  },
})
