# Charity Data Backend

This project started as a way for me to learn how to implement AI technologies (RAG, vector DBs, Langchain, prompt engineering etc.). I had also hoped that some of my work might be helpful to charities, so I have open-sourced the project. This repo contains some of the util scripts that helped me to transform the charity data for better vector DB retrieval and app consumption. This repo also hosts a small backend in `index.js` that is used by https://github.com/geoffchan23/charity-data-client. The hosted app can be found at this URL: https://charity-data-client.vercel.app/.

### Data

The data used in this project was extracted from [charitydata.ca](https://charitydata.ca).

### API Endpoint

#### `/search`
- **Method:** GET
- **Description:** Performs a search on the charity data using the provided query and optional filters.
- **Query Parameters:**
  - `query` (string): The text query for the search.
  - `limit` (integer): The maximum number of results to return. Default is 10.
  - `metadata` (JSON string): A JSON string representing the filter criteria on metadata fields.

#### Example Request
- **Query:** `query=education&limit=5&metadata={"city": "Toronto", "province": "Ontario", "category": "Support of schools and education"}`
- **Description:** This example searches for charities with the word "education" in their name or description, limits the results to 5, and filters the results to only include charities based in Toronto, Ontario, and categorized under "Support of schools and education".

### Responses
- **200 OK:** Returns a list of search results matching the criteria.
- **500 Internal Server Error:** Returns an error message in case of server errors.
