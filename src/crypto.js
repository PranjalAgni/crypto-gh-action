const crypto = require("crypto");

const algorithm = "aes-256-ctr";
const secretKey = "vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3";

const decodeBase64 = (base64Text) => {
  return Buffer.from(base64Text, "base64").toString("utf-8");
};

const decryptAPIData = (hash) => {
  if (typeof hash === "string") return decodeBase64(hash);
  const decipher = crypto.createDecipheriv(
    algorithm,
    secretKey,
    Buffer.from(hash.iv, "hex")
  );

  const decrpyted = Buffer.concat([
    decipher.update(Buffer.from(hash.content, "hex")),
    decipher.final(),
  ]);

  return decrpyted.toString();
};

module.exports = {
  decryptAPIData,
};
