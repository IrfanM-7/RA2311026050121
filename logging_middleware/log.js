const axios = require('axios');

const token = "YOUR_ACCESS_TOKEN";

async function Log(stack, level, pkg, message) {
  try {
    let obj = {
      stack: stack,
      level: level,
      package: pkg,
      message: message
    };

    await axios.post("http://20.207.122.201/evaluation-service/logs", obj, {
      headers: {
        Authorization: "Bearer " + token
      }
    });
  } catch (err) {
  }
}

module.exports = Log;
