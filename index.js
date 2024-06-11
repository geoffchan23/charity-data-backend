import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const app = express();
const port = process.env.PORT || 3001;

// CORS configuration
const corsOptions = {
  origin: '*', // Allows all origins
  optionsSuccessStatus: 200 // response status for successful OPTIONS requests
};

// Apply CORS middleware to handle CORS and preflight requests
app.use(cors(corsOptions));

// Routes
app.get('/search', async (req, res) => {
  const { query, limit, metadata } = req.query;
  try {
    const searchQuery = query || '';
    const searchLimit = limit ? parseInt(limit, 10) : 10;
    const metaDataFilter = metadata ? JSON.parse(metadata) : {};

    console.log(searchQuery, searchLimit, metaDataFilter);
    
    const results = await vectorStore.similaritySearch(searchQuery, searchLimit, metaDataFilter);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port} and querying ${process.env.PINECONE_INDEX}`);
});