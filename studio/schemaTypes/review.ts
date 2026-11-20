import {defineField, defineType} from 'sanity'
import {CommentIcon} from '@sanity/icons/Comment'

export const review = defineType({
  name: 'review',
  title: 'Review',
  type: 'document',
  icon: CommentIcon,
  description: 'Copy reviews word for word from where they were posted.',
  fields: [
    defineField({name: 'quote', title: 'Review', type: 'text', rows: 4, validation: (r) => r.required()}),
    defineField({
      name: 'source',
      title: 'Posted on',
      description: 'E.g. "Facebook review" or "Google review".',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'detail',
      title: 'The job',
      description: 'E.g. "Basement sump pump system, installed in one day".',
      type: 'string',
    }),
    defineField({
      name: 'featured',
      title: 'Show on the home page',
      description: 'The home page shows one review: the featured one, or else the newest.',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {select: {title: 'quote', subtitle: 'source'}},
})
