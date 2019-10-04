const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

exports.generateThumbnail = functions.storage
  .object()
  .onFinalize(async object => {
    let n = object.name.includes("/");
    let res = "";
    n ? (res = object.name.replace(/\//g, "%2F")) : (res = object.name);
    let imageName0 = res;
    let imageName1 = imageName0.split("%2F");
    return db.collection(imageName1[0]).add({
      src: `https://firebasestorage.googleapis.com/v0/b/${object.bucket}/o/${res}?alt=media&token=${object.metadata.firebaseStorageDownloadTokens}`,
      thumbnail: `https://firebasestorage.googleapis.com/v0/b/${object.bucket}/o/${res}?alt=media&token=${object.metadata.firebaseStorageDownloadTokens}`,
      createAt: Date.now()
    });
  });
