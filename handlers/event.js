
const { readdirSync } = require('fs');

module.exports = async (client) => {
  const load = (dir) => {
    const eventFiles = readdirSync(`./events/${dir}/`).filter((file) =>
      file.endsWith(".js")
    );
    for (let file of eventFiles) {
      try {
        const event = require(`../events/${dir}/${file}`);
        const eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));
      } catch (err) {
        console.log(err);
      }
    }
  }
  ["client", "guild"].forEach((x) => load(x));
  console.log("Loaded events successfully");
}