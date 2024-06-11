## API Documentation for Charity Data Search Service

### Overview
This service provides an API endpoint to search for charity data using a vector similarity search powered by Pinecone and OpenAI embeddings. It allows users to query based on text and filter results based on metadata.

### API Endpoint

#### `/search`
- **Method:** GET
- **Description:** Performs a search on the charity data using the provided query and optional filters.
- **Query Parameters:**
  - `query` (string): The text query for the search.
  - `limit` (integer): The maximum number of results to return. Default is 10.
  - `metadata` (JSON string): A JSON string representing the filter criteria on metadata fields.

### Responses
- **200 OK:** Returns a list of search results matching the criteria.
- **500 Internal Server Error:** Returns an error message in case of server errors.

### Example Request

