const axios = require('axios');

async function run() {
  try {
    let a = {
      email: "YOUR_EMAIL",
      name: "YOUR_NAME",
      mobileNo: "YOUR_PHONE",
      githubUsername: "YOUR_GITHUB",
      rollNo: "YOUR_ROLL",
      accessCode: "YOUR_ACCESS_CODE"
    };

    let r1 = await axios.post("http://20.207.122.201/evaluation-service/register", a);
    console.log(r1.data);

    let b = {
      email: "YOUR_EMAIL",
      name: "YOUR_NAME",
      rollNo: "YOUR_ROLL",
      accessCode: "YOUR_ACCESS_CODE",
      clientID: "...",
      clientSecret: "..."
    };

    let r2 = await axios.post("http://20.207.122.201/evaluation-service/auth", b);
    console.log(r2.data.access_token);
  } catch (err) {
    console.log(err.message);
  }
}

run();
