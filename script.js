const axios = require('axios')

async function run() {
  try {
    let data1 = {
      email: "irfuijukas@gmail.com",
      name: "Syed Irfn M",
      mobileNo: "8940742364",
      githubUsername: "IrfanM-7",
      rollNo: "RA2311026050121",
      accessCode: "QkbpxH"
    }

    let res1 = await axios.post('http://20.207.122.201/evaluation-service/register', data1)
    console.log(res1.data)

    let data2 = {
      email: "irfuijukas@gmail.com",
      name: "Syed Irfn M",
      rollNo: "RA2311026050121",
      accessCode: "QkbpxH",
      clientID: res1.data.clientID,
      clientSecret: res1.data.clientSecret
    }

    let res2 = await axios.post('http://20.207.122.201/evaluation-service/auth', data2)
    console.log(res2.data.access_token)
  } catch(e) {
    console.log(e.response ? e.response.data : e.message)
  }
}

run()
