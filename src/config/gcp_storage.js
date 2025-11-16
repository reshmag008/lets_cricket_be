const { Storage } = require("@google-cloud/storage");
const path = require("path");

const storage = new Storage({
  keyFilename: path.join(__dirname, "../gcp-service-account.json"),
  projectId: "smooth-kiln-478304-t6",
});

const bucketName = "auction-players";
const bucket = storage.bucket(bucketName);
module.exports = { bucket };
