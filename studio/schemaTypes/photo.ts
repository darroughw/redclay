import {defineField, defineType} from 'sanity'

// A photo with required alt text. Used everywhere a picture appears on the site.
// Set the hotspot (the circle) on the most important part of the photo: the site keeps it
// in view when the photo is cropped to different card shapes on phones and computers.
export const photo = defineType({
  name: 'photo',
  title: 'Photo',
  type: 'image',
  options: {hotspot: true},
  fields: [
    defineField({
      name: 'alt',
      title: 'Describe the photo',
      description:
        'What someone would see, for people using screen readers and for Google. E.g. "New block foundation wall under a brick house". Don\'t start with "Photo of".',
      type: 'string',
      validation: (rule) => rule.required().min(8).error('Add a short description of the photo.'),
    }),
  ],
})
