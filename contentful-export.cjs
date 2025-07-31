const { exec } = require('child_process');
const path = require('path');

// Ensure @next/env is installed:
// npm install @next/env
const { loadEnvConfig } = require('@next/env');

// Load environment variables from .env files
// loadEnvConfig takes the directory where your .env files are located
// and an optional boolean for "dev" mode (true for dev, false for prod)
loadEnvConfig(process.cwd()); // Loads from current working directory

// --- Configuration ---
// These variables will be read from your environment (e.g., .env file or shell)
const CONTENTFUL_SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const CONTENTFUL_ENVIRONMENT = process.env.CONTENTFUL_ENVIRONMENT || 'master';
const CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN = process.env.CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN;

// Define output directory and file name
const EXPORT_DIR = path.resolve(__dirname, 'contentful-data'); // Creates a 'contentful-data' folder
const CONTENT_FILE_NAME = 'all-contentful-data.json';

// Ensure all required environment variables are set
if (!CONTENTFUL_SPACE_ID || !CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN) {
  console.error('Error: CONTENTFUL_SPACE_ID and CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN must be set in your environment variables.');
  console.error('Please ensure your .env file is correctly configured or variables are set in your shell.');
  process.exit(1);
}

// Construct the Contentful CLI command
// The CLI automatically picks up CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN from environment
const command = `contentful space export \
  --space-id ${CONTENTFUL_SPACE_ID} \
  --environment-id ${CONTENTFUL_ENVIRONMENT} \
  --management-token ${CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN} \
  --export-dir ${EXPORT_DIR} \
  --content-file ${CONTENT_FILE_NAME} \
  --include-drafts \
  --include-archived \
  --download-assets \
  --save-file true`; // Explicitly save the file

console.log(`Attempting to export Contentful space: ${CONTENTFUL_SPACE_ID} (Environment: ${CONTENTFUL_ENVIRONMENT})`);
console.log(`Output will be saved to: ${EXPORT_DIR}/${CONTENT_FILE_NAME}`);
console.log('Starting Contentful export...');

// Execute the command
exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing Contentful export: ${error.message}`);
    if (stderr) console.error(`CLI Error Output:\n${stderr}`);
    return;
  }
  if (stderr) {
    console.warn(`CLI Warning/Info Output:\n${stderr}`);
  }
  console.log(`Contentful export successful!`);
  console.log(`CLI Output:\n${stdout}`);
  console.log(`Data saved to: ${EXPORT_DIR}/${CONTENT_FILE_NAME}`);
});