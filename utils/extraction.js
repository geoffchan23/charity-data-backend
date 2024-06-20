import fs from 'fs';
import charityData from './all-2023-charity-data.json' with { type: "json" };

// Count occurrences of each city and province
const cityCounts = charityData.reduce((acc, item) => {
  acc[item.city] = (acc[item.city] || 0) + 1;
  return acc;
}, {});

const provinceCounts = charityData.reduce((acc, item) => {
  acc[item.province] = (acc[item.province] || 0) + 1;
  return acc;
}, {});

// Convert counts to array of objects with name and count, and sort descending by count
const uniqueCities = Object.keys(cityCounts).map(city => ({
  name: city,
  count: cityCounts[city]
})).sort((a, b) => b.count - a.count);

const uniqueProvinces = Object.keys(provinceCounts).map(province => ({
  name: province,
  count: provinceCounts[province]
})).sort((a, b) => b.count - a.count);

// Write unique cities to a JSON file
const uniqueCitiesFilePath = './unique-cities.json';
fs.writeFileSync(uniqueCitiesFilePath, JSON.stringify(uniqueCities, null, 2), 'utf-8');

// Write unique provinces to a JSON file
const uniqueProvincesFilePath = './unique-provinces.json';
fs.writeFileSync(uniqueProvincesFilePath, JSON.stringify(uniqueProvinces, null, 2), 'utf-8');

console.log(`Unique cities written to ${uniqueCitiesFilePath}`);
console.log(`Unique provinces written to ${uniqueProvincesFilePath}`);
