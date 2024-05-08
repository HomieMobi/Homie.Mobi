// sanity.config.js

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'My Sanity Blog',

  projectId: 'bbk78kug',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  // Add CORS configuration here
  api: {
    cors: {
      allowOrigins: ['http://localhost:3000', 'https://your-firebase-domain.firebaseapp.com'],
      // Add other CORS options if needed
    },
  },

  schema: {
    types: schemaTypes,
  },
})
