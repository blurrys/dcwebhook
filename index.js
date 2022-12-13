const axios = require("axios");

class Webhook {
  #webhook;
  #username;
  constructor() {
    this.#webhook = "";
    this.#username = "Default";
  }
  login(webhook) {
    this.#webhook = webhook;
  }
  #checkWebhook() {
    let pattern = /(https?)?(:\/\/)?(www.)?discord.com\/api\/webhooks/gi;
    return pattern.test(this.#webhook);
  }
  setUsername(username) {
    if (typeof username !== "string") {
      throw "Username can be only a string!";
    } else {
      this.#username = username;
    }
  }
  send(message) {
    if (this.#checkWebhook() === true) {
      axios.post(this.#webhook, {
        username: this.#username,
        content: message,
      });
    } else {
      throw "Invalid URL";
    }
  }
}

module.exports = new Webhook();
