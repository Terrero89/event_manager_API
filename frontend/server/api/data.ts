// server/api/data.ts
const URL= "http://localhost:8080/api/v1/stories"
export default defineEventHandler(async (event) => {
    // Fetch data from your Node.js backend 
    const data = await $fetch(URL); // Example
  
    return data;
  });