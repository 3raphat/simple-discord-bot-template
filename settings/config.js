require("dotenv").config();

module.exports = {
  token: process.env.TOKEN || "YOUR_BOT_TOKEN",
  embed_color: process.env.EMBED_COLOR || "#2f3037", // You can change with hex color code or color name e.g. "BLURPLE"
  owner: process.env.OWNER_ID || "OWNER_ID"
};