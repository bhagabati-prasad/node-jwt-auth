const crypto = require("crypto");

const password = "hello world";

const hash = crypto.createHash("sha256").update(password).digest("hex");
console.log(hash);
// b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9
// The resuling sha-256 hash is constant to the input data.

const hmacHash = crypto
  .createHmac("sha256", "password") // (hash algo, key)
  .update(password)
  .digest("hex");
console.log(hmacHash);
// 8f5f355441dc2722900f292004f3d8a83245ff4d6e3078a5b77a4d7a921eeae9
// The resulting SHA-256 hash is unique to both the input data and the key.
