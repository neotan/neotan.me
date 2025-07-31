const { exec } = require('child_process');
const path = require('path');
const { loadEnvConfig } = require('@next/env');

loadEnvConfig(process.cwd()); // Loads from current working directory

// --- Configuration ---
const TARGET_SPACE_ID = process.env.CONTENTFUL_SPACE_ID; // Or a different variable for target space
const TARGET_ENVIRONMENT = process.env.CONTENTFUL_ENVIRONMENT || 'master'; // Or a different variable for target environment
const MANAGEMENT_API_TOKEN = process.env.CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN;

// Path to your exported data file
const EXPORTED_FILE_PATH = path.resolve(__dirname, 'contentful-data', 'all-contentful-data.json');

// Ensure required variables are set
if (!TARGET_SPACE_ID || !MANAGEMENT_API_TOKEN) {
  console.error('Error: TARGET_SPACE_ID and MANAGEMENT_API_TOKEN must be set in your environment variables.');
  process.exit(1);
}

const command = `contentful space import \
  --space-id ${TARGET_SPACE_ID} \
  --environment-id ${TARGET_ENVIRONMENT} \
  --management-token ${MANAGEMENT_API_TOKEN} \
  --content-file ${EXPORTED_FILE_PATH} \
  --publish-entries true`; // Add other --skip- flags as needed

console.log(`Attempting to import data to Contentful space: ${TARGET_SPACE_ID} (Environment: ${TARGET_ENVIRONMENT})`);
console.log(`Importing from file: ${EXPORTED_FILE_PATH}`);
console.log('Starting Contentful import...');

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing Contentful import: ${error.message}`);
    if (stderr) console.error(`CLI Error Output:\n${stderr}`);
    return;
  }
  if (stderr) {
    console.warn(`CLI Warning/Info Output:\n${stderr}`);
  }
  console.log(`Contentful import successful!`);
  console.log(`CLI Output:\n${stdout}`);
});