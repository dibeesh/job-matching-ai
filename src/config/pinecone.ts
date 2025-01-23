import { Pinecone } from '@pinecone-database/pinecone';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
config(); // Load environment variables

const indexName = 'job-matching';

export const initPinecone = () => {
  const apiKey = process.env.PINECONE_API_KEY;
  
  if (!apiKey) throw new Error('PINECONE_API_KEY is not defined in environment variables');
  
  return new Pinecone({
    apiKey
  });
};

const pinecone = initPinecone();

export const upsertEmbedding = async (id: string, embedding: number[], metadata?: any) => {
  const index = pinecone.index(indexName);
  await index.upsert([{ 
    id, 
    values: embedding,
    metadata 
  }]);
};

export const searchEmbedding = async (
  vector: number[],
  topK: number = 5
) => {
  const index = pinecone.index(indexName);
  const queryResponse = await index.query({
    vector,
    topK,
    includeMetadata: true
  });
  console.log('query response', queryResponse);
  return queryResponse.matches;
};