const fs = require('fs');
const csv = require('csv-parser');
const { Client } = require('@elastic/elasticsearch');

const client = new Client({ node: 'http://localhost:9200' }); // שנה לפי הכתובת שלך
const indexName = 'streets';

async function createIndex() {
    const exists = await client.indices.exists({ index: indexName });
    if (!exists) {
        await client.indices.create({
            index: indexName,
            body: {
                mappings: {
                    properties: {
                        id: { type: 'keyword' },
                        name: { type: 'text' },
                        city: { type: 'text' },
                        district: { type: 'text' },
                        postal_code: { type: 'keyword' },
                        additional_info: { type: 'text' }
                    }
                }
            }
        });
        console.log('Index created');
    }
}

async function loadCSVToElastic() {
    const bulkData = [];
    fs.createReadStream('streets.csv')
        .pipe(csv())
        .on('data', (row) => {
            bulkData.push({ index: { _index: indexName } });
            bulkData.push(row);
        })
        .on('end', async () => {
            if (bulkData.length > 0) {
                await client.bulk({ body: bulkData });
                console.log('Data inserted');
            }
        });
}

(async () => {
    await createIndex();
    await loadCSVToElastic();
})();