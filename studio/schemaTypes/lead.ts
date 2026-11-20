import {defineField, defineType} from 'sanity'
import {EnvelopeIcon} from '@sanity/icons/Envelope'

// Inspection requests from the website form. Created by the site (web/src/app/actions.ts);
// Kerney only changes the status. Contact details are read-only so a request can't be
// edited by accident.
export const lead = defineType({
  name: 'lead',
  title: 'Inspection request',
  type: 'document',
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'New', value: 'new'},
          {title: 'Called back', value: 'contacted'},
          {title: 'Inspection booked', value: 'booked'},
          {title: 'Closed', value: 'closed'},
        ],
        layout: 'radio',
      },
      initialValue: 'new',
    }),
    defineField({name: 'notes', title: 'Your notes', type: 'text', rows: 3}),
    defineField({name: 'name', title: 'Name', type: 'string', readOnly: true}),
    defineField({name: 'phone', title: 'Phone', type: 'string', readOnly: true}),
    defineField({name: 'email', title: 'Email', type: 'string', readOnly: true}),
    defineField({name: 'address', title: 'Address or ZIP', type: 'string', readOnly: true}),
    defineField({name: 'service', title: 'Needs help with', type: 'string', readOnly: true}),
    defineField({name: 'message', title: 'Message', type: 'text', readOnly: true}),
    defineField({name: 'submittedAt', title: 'Sent', type: 'datetime', readOnly: true}),
  ],
  orderings: [{title: 'Newest first', name: 'newest', by: [{field: 'submittedAt', direction: 'desc'}]}],
  preview: {
    select: {name: 'name', phone: 'phone', service: 'service', status: 'status', at: 'submittedAt'},
    prepare: ({name, phone, service, status, at}) => ({
      title: `${status === 'new' ? '● ' : ''}${name ?? 'No name'} · ${phone ?? ''}`,
      subtitle: [service, at ? new Date(at).toLocaleDateString('en-US') : ''].filter(Boolean).join(' · '),
    }),
  },
})
