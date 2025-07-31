import { loadEnvConfig } from '@next/env'

import type { CodegenConfig } from '@graphql-codegen/cli'

loadEnvConfig(process.cwd())

const {
  CONTENTFUL_SPACE_ID,
  CONTENTFUL_ENVIRONMENT,
  CONTENTFUL_DELIVERY_ACCESS_TOKEN
} = process.env

const config: CodegenConfig = {
  overwrite: true,
  schema: {
    [`https://graphql.contentful.com/content/v1/spaces/${CONTENTFUL_SPACE_ID}/environments/${CONTENTFUL_ENVIRONMENT}`]: {
      headers: {
        Authorization: `Bearer ${CONTENTFUL_DELIVERY_ACCESS_TOKEN}`,
      },
    },
  },
  generates: {
    'src/types/contentful-schema.ts': {
      plugins: ['typescript'],
      config: {
        skipTypename: false,
        enumsAsTypes: true,
        scalars: {
          DateTime: 'string',
          JSON: 'Record<string, any>',
        },
        maybeValue: 'T | null | undefined',
        inputMaybeValue: 'T | null | undefined',
      },
    },
  },
}

export default config 