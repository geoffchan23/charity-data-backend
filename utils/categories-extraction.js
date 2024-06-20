import fs from 'fs';
import categories from "../charity-categories.json" with { type: "json" };

const categoryMap = categories.reduce((acc, category) => {
    acc[category.english] = category.categories.map(subCategory => subCategory.english);
    return acc;
}, {});

const subcategoryMap = categories.reduce((acc, category) => {
    category.categories.forEach(subCategory => {
        acc[subCategory.english] = subCategory.subcategories.map(sub => sub.english);
    });
    return acc;
}, {});



const categoryMapFilePath = './category-map.json';
fs.writeFileSync(categoryMapFilePath, JSON.stringify(categoryMap, null, 2), 'utf-8');

const subcategoryMapFilePath = './subcategory-map.json';
fs.writeFileSync(subcategoryMapFilePath, JSON.stringify(subcategoryMap, null, 2), 'utf-8');

console.log(`Category map written to ${categoryMapFilePath}`);
console.log(`Subcategory map written to ${subcategoryMapFilePath}`);
