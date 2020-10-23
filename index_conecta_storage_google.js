// Imports the Google Cloud client library
const {Storage} = require('@google-cloud/storage');


// Creates a client
const storage = new Storage({ keyFilename : "keys.json", projectId : process.env.GOOGLE_CLOUD_PROJECT});
// Creates a client from a Google service account key.
// const storage = new Storage({keyFilename: "key.json"});

/**
 * TODO(developer): Uncomment these variables before running the sample.
 */
// const bucketName = 'bucket-name-awesome-lulu';
 const bucketName2 = 'pictures-awesome-lulu-flow';

 async function createBucket() {
  // Creates the new bucket
  await storage.createBucket(bucketName2);
  console.log(`Bucket ${bucketName2} created.`);
}

createBucket().catch(console.error);