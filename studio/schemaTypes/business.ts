import {defineArrayMember, defineField, defineType} from 'sanity'
import {HomeIcon} from '@sanity/icons/Home'

// Singleton (document id "business"). Name, phone and service area should match the
// Google Business Profile and Facebook page exactly.
export const business = defineType({
  name: 'business',
  title: 'Business info',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({name: 'name', title: 'Business name', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'phone',
      title: 'Phone',
      description: 'Format: (336) 555-0123. Appears in the header, buttons and footer.',
      type: 'string',
      validation: (r) =>
        r.required().regex(/^\(\d{3}\) \d{3}-\d{4}$/, {name: 'phone'}).warning('Use the format (336) 555-0123.'),
    }),
    defineField({name: 'city', title: 'City', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'region',
      title: 'State',
      type: 'string',
      initialValue: 'NC',
      validation: (r) => r.required().length(2),
    }),
    defineField({
      name: 'ownedIn',
      title: 'Owned and operated in',
      description:
        'Where the business is owned and run from, e.g. "Stokes County". Google and AI assistants (ChatGPT, Google AI answers) use this when describing Red Clay.',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'counties',
      title: 'Counties served',
      description: 'Just the name, e.g. "Stokes". The site adds "County".',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      validation: (r) => r.min(1),
    }),
    defineField({
      name: 'utilityText',
      title: 'Top bar text',
      description: 'The thin dark bar above the header on computers.',
      type: 'string',
    }),
    defineField({name: 'footerTagline', title: 'Footer tagline', type: 'string'}),
    defineField({name: 'footerBlurb', title: 'Footer description', type: 'text', rows: 3}),
    defineField({
      name: 'seoTitle',
      title: 'Search title',
      description:
        'The blue headline Google shows for the site, and the title on browser tabs. Lead with what people search for and where, e.g. "Crawlspace Repair in Stokes, Surry, Forsyth & Yadkin, NC". " | Red Clay" is added at the end.',
      type: 'string',
      validation: (r) => r.required().max(60).warning('Google cuts titles off after about 60 characters.'),
    }),
    defineField({
      name: 'seoDescription',
      title: 'Search description',
      description:
        'The short summary under the title in Google results and in link previews on Facebook and texts. Say what you do, where, and why to call.',
      type: 'text',
      rows: 3,
      validation: (r) =>
        r.required().min(70).max(160).warning('Aim for 70–160 characters; Google cuts off longer descriptions.'),
    }),
    defineField({
      name: 'facebookUrl',
      title: 'Facebook page',
      description: 'Full address, starting with https://',
      type: 'url',
    }),
  ],
  preview: {prepare: () => ({title: 'Business info'})},
})
