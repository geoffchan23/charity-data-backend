import { Pinecone } from "@pinecone-database/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import dotenv from "dotenv";
import express from 'express';
import cors from 'cors';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const pinecone = new Pinecone();
const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX);
const vectorStore = await PineconeStore.fromExistingIndex(
  new OpenAIEmbeddings(),
  { pineconeIndex }
);

const app = express();
const port = process.env.PORT || 3001;

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
};

app.options('*', cors(corsOptions)); 
app.use(cors(corsOptions));

app.get('/search', async (req, res) => {
  const { query, limit, metadata } = req.query;
  try {
    const searchQuery = query || '';
    const searchLimit = limit ? parseInt(limit, 10) : 10;
    const metaDataFilter   = metadata ? JSON.parse(metadata) : {};

    console.log(searchQuery, searchLimit, metaDataFilter);
    
    const results = await vectorStore.similaritySearch(searchQuery, searchLimit, metaDataFilter);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port} and querying ${process.env.PINECONE_INDEX}`);
});
