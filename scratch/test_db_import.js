import { db, schemaCache } from '../server/db.js';

console.log("Initial schemaCache:", JSON.stringify(schemaCache));

// Wait 5 seconds to let detectSchema complete
setTimeout(() => {
  console.log("After 5s schemaCache:", JSON.stringify(schemaCache));
}, 5000);
