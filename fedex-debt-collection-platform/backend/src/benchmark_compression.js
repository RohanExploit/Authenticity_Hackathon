import { gzipSync } from 'zlib';
import { Buffer } from 'buffer';

const COUNT = 50000;

console.log(`Generating ${COUNT} customers...`);

const customers = [];
for (let i = 0; i < COUNT; i++) {
    customers.push({
        id: `CUST_${i}`,
        overdueAmount: Math.floor(Math.random() * 10000),
        daysPastDue: Math.floor(Math.random() * 100),
        paymentHistory: Math.floor(Math.random() * 100),
        riskScore: Math.floor(Math.random() * 100)
    });
}

console.log('Measuring payload size...');
const startJson = performance.now();
const json = JSON.stringify(customers);
const endJson = performance.now();
const jsonSize = Buffer.byteLength(json);

console.log(`JSON.stringify took: ${(endJson - startJson).toFixed(2)}ms`);
console.log(`Original JSON size: ${(jsonSize / 1024 / 1024).toFixed(2)} MB`);

console.log('Compressing...');
const startGzip = performance.now();
const compressed = gzipSync(json);
const endGzip = performance.now();
const compressedSize = Buffer.byteLength(compressed);

console.log(`Gzip compression took: ${(endGzip - startGzip).toFixed(2)}ms`);
console.log(`Compressed size: ${(compressedSize / 1024 / 1024).toFixed(2)} MB`);

const savings = ((jsonSize - compressedSize) / jsonSize) * 100;
console.log(`Savings: ${savings.toFixed(2)}%`);
