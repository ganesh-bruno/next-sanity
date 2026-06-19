import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '8vu5d6sv',
    dataset: 'production',
  },
  deployment: {
    autoUpdates: true,
  },
})
