import { addCustomer, getAllCustomers } from "./models/Customer.js";
import { gzipSync } from "zlib";

const COUNT = 10000;

console.log(`Generating ${COUNT} customers...`);
for (let i = 0; i < COUNT; i++) {
    addCustomer({
        id: `CUST_GEN_${i}`,
        overdueAmount: Math.floor(Math.random() * 10000),
        daysPastDue: Math.floor(Math.random() * 180),
        paymentHistory: Math.floor(Math.random() * 100)
    });
}

const customers = getAllCustomers();
const jsonString = JSON.stringify(customers);
const originalSize = Buffer.byteLength(jsonString);
const start = performance.now();
const compressed = gzipSync(jsonString);
const end = performance.now();
const compressedSize = compressed.length;

console.log(`Original Size: ${(originalSize / 1024 / 1024).toFixed(2)} MB`);
console.log(`Compressed Size: ${(compressedSize / 1024 / 1024).toFixed(2)} MB`);
console.log(`Reduction: ${(100 * (1 - compressedSize / originalSize)).toFixed(2)}%`);
console.log(`Compression Time: ${(end - start).toFixed(2)}ms`);
