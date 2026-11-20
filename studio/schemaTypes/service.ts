import {defineField, defineType} from 'sanity'
import {WrenchIcon} from '@sanity/icons/Wrench'

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  icon: WrenchIcon,
  fields: [
    defineField({name: 'title', title: 'Service name', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'slug',
      title: 'Web address name',
      description: 'Click Generate. Used to keep this service’s place on the site.',
      type: 'slug',
      options: {source: 'title'},
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Description (computers)',
      type: 'text',
      rows: 3,
      validation: (r) => r.required().max(160).warning('Keep it under 160 characters so the cards line up.'),
    }),
    defineField({
      name: 'summaryShort',
      title: 'Description (phones)',
      description: 'One short line. Leave empty to use the description above.',
      type: 'string',
      validation: (r) => r.max(70).warning('Keep it under 70 characters.'),
    }),
    defineField({name: 'photo', title: 'Photo', type: 'photo', validation: (r) => r.required()}),
    defineField({
      name: 'order',
      title: 'Position',
      description: '1 shows first. The site shows services in this order.',
      type: 'number',
      validation: (r) => r.required().integer().min(1),
    }),
  ],
  orderings: [{title: 'Position', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'title', subtitle: 'summary', media: 'photo', order: 'order'},
    prepare: ({title, subtitle, media, order}) => ({title: `${order ?? '–'}. ${title ?? ''}`, subtitle, media}),
  },
})
