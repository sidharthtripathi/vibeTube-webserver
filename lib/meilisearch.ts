import { MeiliSearch }  from 'meilisearch'
export const meilisearch = new MeiliSearch({
    host: process.env.MEILISEARCH_CONNECTION_URL as string,
    apiKey: process.env.MEILISEARCH_MASTER_KEY
  })
