import {defineArrayMember, defineField, defineType} from 'sanity'
import {DocumentIcon} from '@sanity/icons/Document'

// Singleton (document id "homePage"). One group per section, in page order.

export const homePage = defineType({
  name: 'homePage',
  title: 'Home page',
  type: 'document',
  icon: DocumentIcon,
  groups: [
    {name: 'hero', title: 'Top of page', default: true},
    {name: 'problems', title: 'Problems & signs'},
    {name: 'results', title: 'Before & after'},
    {name: 'process', title: 'How it works'},
    {name: 'work', title: 'Project photos'},
    {name: 'about', title: 'About'},
  ],
  fields: [
    defineField({
      name: 'hero',
      title: 'Top of page',
      type: 'object',
      group: 'hero',
      fields: [
        defineField({name: 'eyebrow', title: 'Small label above the headline', type: 'string'}),
        defineField({name: 'headline', title: 'Headline', type: 'string', validation: (r) => r.max(60).warning('Keep this under 60 characters so it fits the design.')}),
        defineField({
          name: 'intro',
          title: 'Intro (computers)',
          type: 'text',
          rows: 4,
          validation: (r) => r.max(260).warning('Keep this under 260 characters so it fits the design.'),
        }),
        defineField({
          name: 'introShort',
          title: 'Intro (phones)',
          description: 'A shorter version for small screens.',
          type: 'text',
          rows: 3,
          validation: (r) => r.max(140).warning('Keep this under 140 characters so it fits the design.'),
        }),
        defineField({
          name: 'checks',
          title: 'Check marks',
          description: 'Three short promises under the buttons.',
          type: 'array',
          of: [defineArrayMember({type: 'string'})],
          validation: (r) => r.max(4),
        }),
        defineField({name: 'photo', title: 'Background photo', type: 'photo'}),
      ],
    }),
    defineField({
      name: 'problemTiles',
      title: '"What’s going on under your house?" tiles',
      description: 'Clicking a tile jumps to the form with "What do you need help with?" filled in.',
      type: 'array',
      group: 'problems',
      validation: (r) => r.max(4),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'problemTile',
          fields: [
            defineField({name: 'title', title: 'Title', type: 'string', validation: (r) => r.required()}),
            defineField({name: 'detail', title: 'Detail', type: 'string'}),
            defineField({
              name: 'service',
              title: 'Fills in the form with',
              description: 'Usually the same as the title.',
              type: 'string',
              validation: (r) => r.required(),
            }),
          ],
          preview: {select: {title: 'title', subtitle: 'detail'}},
        }),
      ],
    }),
    defineField({
      name: 'warningSigns',
      title: 'Warning signs ("MOIST.")',
      type: 'array',
      group: 'problems',
      validation: (r) => r.max(4),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'warningSign',
          fields: [
            defineField({name: 'title', title: 'Sign', type: 'string', validation: (r) => r.required()}),
            defineField({name: 'detail', title: 'What it means', type: 'text', rows: 2}),
          ],
          preview: {select: {title: 'title', subtitle: 'detail'}},
        }),
      ],
    }),
    defineField({
      name: 'beforeAfter',
      title: 'Before & after',
      type: 'object',
      group: 'results',
      fields: [
        defineField({name: 'heading', title: 'Heading', type: 'string'}),
        defineField({name: 'intro', title: 'Description', type: 'text', rows: 3}),
        defineField({name: 'before', title: '"In progress" photo', type: 'photo'}),
        defineField({name: 'after', title: '"Finished" photo', type: 'photo'}),
      ],
    }),
    defineField({
      name: 'steps',
      title: 'How it works (4 steps)',
      type: 'array',
      group: 'process',
      validation: (r) => r.max(4),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'step',
          fields: [
            defineField({name: 'title', title: 'Step', type: 'string', validation: (r) => r.required()}),
            defineField({name: 'detail', title: 'Description (computers)', type: 'text', rows: 2}),
            defineField({name: 'detailShort', title: 'Description (phones)', type: 'text', rows: 2}),
          ],
          preview: {select: {title: 'title', subtitle: 'detail'}},
        }),
      ],
    }),
    defineField({
      name: 'gallery',
      title: 'Recent project photos',
      description:
        'The first photo is shown tall in the middle on computers and on top on phones, so pick a tall one. Five photos fill the layout.',
      type: 'array',
      group: 'work',
      of: [defineArrayMember({type: 'photo'})],
      options: {layout: 'grid'},
    }),
    defineField({
      name: 'galleryTags',
      title: 'Line under the photos',
      description: 'E.g. "Encapsulation · Footings · Block walls"',
      type: 'string',
      group: 'work',
    }),
    defineField({
      name: 'about',
      title: 'About',
      type: 'object',
      group: 'about',
      fields: [
        defineField({name: 'heading', title: 'Heading', type: 'string'}),
        defineField({name: 'body', title: 'Story', type: 'text', rows: 5}),
        defineField({
          name: 'values',
          title: 'We believe in',
          type: 'array',
          of: [defineArrayMember({type: 'string'})],
        }),
        defineField({name: 'photo', title: 'Photo', type: 'photo'}),
      ],
    }),
  ],
  preview: {prepare: () => ({title: 'Home page'})},
})
