import { config } from 'dotenv';
import { Pinecone } from '@pinecone-database/pinecone';
async function initializePineconeIndex() {
  config(); // Load environment variables
  
  const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!
  });

  const indexName = 'job-matching';
  
  try {

    await pinecone.createIndex({
      name: indexName,
      dimension: 1536,
      spec: {
        serverless: {
          cloud: 'aws', 
          region: 'us-east-1' 
        },
      },
      tags: { team: 'data-science' },
    });
  
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
}

initializePineconeIndex().catch(console.error);
