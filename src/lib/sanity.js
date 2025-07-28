import { createClient } from '@sanity/client'

export const sanity = createClient({
  projectId: 'fblukkd1',
  dataset: 'production',
  apiVersion: '2023-07-01',
  useCdn: true,
})

