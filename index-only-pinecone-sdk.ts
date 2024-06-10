import { Pinecone } from "@pinecone-database/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import dotenv from "dotenv";
import express from 'express';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY
});
const index = pinecone.index(process.env.PINECONE_INDEX).namespace('');

const app = express();
const port = process.env.PORT || 3001;

app.get('/search', async (req, res) => {
  const { query, limit, metadata } = req.query;
  try {
    const searchQuery = query || '';
    const searchLimit = limit ? parseInt(limit, 10) : 10;
    const metaDataFilter   = metadata ? JSON.parse(metadata) : {};
    let vector = [];

    console.log('---', query, limit, metadata);

    if (searchQuery.length > 0) {
      const model = new OpenAIEmbeddings();
      vector = await model.embedQuery(searchQuery);
    }

    console.log('---vector', vector);
    
    const results = await index.query({
      vector,
      top_k: searchLimit,
      filter: metaDataFilter,
    });
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
