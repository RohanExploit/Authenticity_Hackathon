import { getCustomers } from './controllers/caseController.js';
import { unzipSync } from 'zlib';

// Mock Request/Response
const createReq = (encoding) => ({
    headers: {
        'accept-encoding': encoding
    }
});

const createRes = (done) => {
    const res = {
        headers: {},
        set: (key, val) => { res.headers[key.toLowerCase()] = val; },
        json: (data) => {
            console.log('res.json called');
            if (res.expectedCompression) {
                console.error('FAIL: Expected compression but got JSON');
                process.exit(1);
            }
             if (!res.expectedCompression) {
                 console.log('PASS: Correctly returned JSON');
                 done();
             }
        },
        send: (buffer) => {
            console.log('res.send called');
            if (!res.expectedCompression) {
                 console.error('FAIL: Expected JSON but got Buffer');
                 process.exit(1);
            }
            if (res.headers['content-encoding'] !== 'gzip') {
                console.error('FAIL: Missing Content-Encoding: gzip');
                process.exit(1);
            }
            try {
                const decompressed = unzipSync(buffer);
                const json = JSON.parse(decompressed.toString());
                if (Array.isArray(json)) {
                     console.log('PASS: Decompressed JSON is valid array');
                     console.log(`Received ${json.length} items`);
                     done();
                } else {
                    console.error('FAIL: Decompressed data is not an array');
                    process.exit(1);
                }
            } catch (e) {
                console.error('FAIL: Invalid Gzip buffer', e);
                process.exit(1);
            }
        }
    };
    return res;
};

// Test 1: No Gzip support
console.log('Test 1: Client does not support Gzip');
const req1 = createReq('');
const res1 = createRes(() => {
    // Test 2: Gzip support
    console.log('\nTest 2: Client supports Gzip');
    const req2 = createReq('gzip, deflate');
    const res2 = createRes(() => {
        console.log('\nAll tests passed.');
    });
    res2.expectedCompression = true;
    getCustomers(req2, res2);
});
res1.expectedCompression = false;
getCustomers(req1, res1);
