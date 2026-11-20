import {defineConfig} from 'sanity'
import {structureTool, type StructureResolver} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {HomeIcon} from '@sanity/icons/Home'
import {DocumentIcon} from '@sanity/icons/Document'
import {schemaTypes} from './schemaTypes'

const SINGLETONS = new Set(['business', 'homePage'])

// Sidebar in the order Kerney uses it: new leads first, setup-type things last.
const structure: StructureResolver = (S) =>
  S.list()
    .title('Website')
    .items([
      S.listItem()
        .title('Inspection requests')
        .id('leads')
        .child(
          S.documentTypeList('lead')
            .title('Inspection requests')
            .defaultOrdering([{field: 'submittedAt', direction: 'desc'}]),
        ),
      S.divider(),
      S.listItem()
        .title('Home page')
        .id('homePage')
        .icon(DocumentIcon)
        .child(S.document().schemaType('homePage').documentId('homePage').title('Home page')),
      S.listItem()
        .title('Services')
        .id('services')
        .child(S.documentTypeList('service').title('Services').defaultOrdering([{field: 'order', direction: 'asc'}])),
      S.documentTypeListItem('review').title('Reviews'),
      S.divider(),
      S.listItem()
        .title('Business info')
        .id('business')
        .icon(HomeIcon)
        .child(S.document().schemaType('business').documentId('business').title('Business info')),
    ])

export default defineConfig({
  name: 'default',
  title: 'Red Clay Crawlspace Repair',

  projectId: 'taiaxmef',
  dataset: 'production',

  plugins: [structureTool({structure}), visionTool()],

  schema: {
    types: schemaTypes,
    // Singletons and leads aren't created from "Create new": singletons already exist,
    // and leads come from the website form.
    templates: (templates) =>
      templates.filter(({schemaType}) => !SINGLETONS.has(schemaType) && schemaType !== 'lead'),
  },

  document: {
    // No duplicating or deleting the singletons.
    actions: (actions, {schemaType}) =>
      SINGLETONS.has(schemaType)
        ? actions.filter(({action}) => action && ['publish', 'discardChanges', 'restore'].includes(action))
        : actions,
  },
})
