import { Pinecone } from "@pinecone-database/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import { Document } from "@langchain/core/documents";
import dotenv from "dotenv";
dotenv.config();

import data from "./all-2023-charity-data.json" with { type: "json" };

const charityData = data.filter(item => item.sortValue !== "0.00").map(item => {
    return {
        bn: item.bn,
        name: item.accountName,
        description: item.description,
        descriptionArray: item.description.replace(/[^\w\s]/g, '').split(" "),
        category: item.categoryEnglish,
        subcategory: item.subcategoryEnglish,
        revenue: Number(parseFloat(item.revenueRange.value).toFixed(2)),
        totalAmountOfGiftsPaidToQualfiiiedDonees: Number(parseFloat(item.sortValue).toFixed(2)),
        city: item.city,
        province: item.province,
        charityDataUrl: `charitydata.ca/charity/${item.legalName.replace(/ /g, '-').normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[.,\/#!$%\^&\*;:{}=`~()]/g,"")}/${item.bn}`
    };
});

const docs = charityData.map(item => {
    return new Document({
        metadata: item,
        pageContent: `${item.name} is a Canadian charity organization. ${item.description}`,
    });
});

if (
    !process.env.PINECONE_API_KEY ||
    !process.env.PINECONE_ENVIRONMENT ||
    !process.env.PINECONE_INDEX
  ) {
    throw new Error(
      "PINECONE_ENVIRONMENT and PINECONE_API_KEY and PINECONE_INDEX must be set"
    );
  } else {
    console.log("Environment variables are set", process.env.PINECONE_ENVIRONMENT, process.env.PINECONE_API_KEY, process.env.PINECONE_INDEX);
  }

try {
    const pinecone = new Pinecone();
    const index = pinecone.Index(process.env.PINECONE_INDEX);

    const embeddings = new OpenAIEmbeddings({ apiKey: process.env.OPENAI_API_KEY });
    await PineconeStore.fromDocuments(docs, embeddings, {
      pineconeIndex: index,
    });
    console.log("Seeding database complete");
} catch (error) {
    console.error(error);
}
