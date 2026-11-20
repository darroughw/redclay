import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'taiaxmef',
    dataset: 'production'
  },
  // Hosted Studio address: https://redclay.sanity.studio
  studioHost: 'redclay',
  deployment: {
    appId: 'hlhubowh1lsww4xevxe1qn2k',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },
})
