# Installation and Execution Instructions

## Prerequisites:
- Install **Node.js**
- Install **ElasticSearch** and ensure it is running at `http://localhost:9200`
- Install **React.js** for running the UI

---

## load to elastic

### Install Dependencies:
```bash
npm install @elastic/elasticsearch csv-parser fs
```

### Create Index with Mapping:
```bash
curl -X PUT "http://localhost:9200/streets" -H "Content-Type: application/json" -d @mapping.json
```

### Run the Script to Load Data:
```bash
node load_to_elastic.js
```

---

## UI

### Install Dependencies:
```bash
npm install axios
```

### Start the React App:
```bash
npm start
```

---
