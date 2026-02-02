import { addCustomer, getAllCustomers } from "./models/Customer.js";
import zlib from 'zlib';
import { promisify } from 'util';

const gzip = promisify(zlib.gzip);

// Populate 10k customers
console.log("Populating 10,000 customers...");
for(let i=0; i<10000; i++) {
    addCustomer({
        id: `CUST_${i}`,
        overdueAmount: Math.random() * 1000,
        daysPastDue: Math.floor(Math.random() * 100),
        paymentHistory: Math.floor(Math.random() * 100),
        riskScore: Math.random() * 100
    });
}

async function runBenchmark() {
    const customers = getAllCustomers();
    const jsonString = JSON.stringify(customers);
    const sizeMB = Buffer.byteLength(jsonString) / (1024 * 1024);

    console.log(`Original JSON size: ${sizeMB.toFixed(2)} MB`);

    const start = performance.now();
    const compressed = await gzip(jsonString);
    const end = performance.now();

    const compressedSizeMB = compressed.length / (1024 * 1024);

    console.log(`Compressed JSON size: ${compressedSizeMB.toFixed(2)} MB`);
    console.log(`Compression ratio: ${(sizeMB / compressedSizeMB).toFixed(1)}x`);
    console.log(`Compression time: ${(end - start).toFixed(2)} ms`);
}

runBenchmark().catch(console.error);
