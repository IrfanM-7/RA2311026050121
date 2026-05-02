const axios = require('axios');
const Log = require('./log');

const token = "YOUR_ACCESS_TOKEN";

async function run() {
  try {
    await Log("backend", "info", "route", "start of API");

    await Log("backend", "info", "route", "before depots API call");
    let res1 = await axios.get("http://20.207.122.201/evaluation-service/depots", {
      headers: { Authorization: "Bearer " + token }
    });

    await Log("backend", "info", "route", "before vehicles API call");
    let res2 = await axios.get("http://20.207.122.201/evaluation-service/vehicles", {
      headers: { Authorization: "Bearer " + token }
    });

    let data = res2.data.tasks || res2.data.vehicles || res2.data;
    let depots = res1.data;

    let ans = [];

    for (let i = 0; i < depots.length; i++) {
      await Log("backend", "info", "route", "inside loop");
      
      let capacity = depots[i].MechanicHours || depots[i].mechanicHours || 0;
      let n = data.length;
      
      let dp = [];
      let keep = [];
      
      for (let j = 0; j <= capacity; j++) {
        dp.push(0);
      }
      
      for (let j = 0; j < n; j++) {
        let tmp = [];
        for (let k = 0; k <= capacity; k++) {
          tmp.push(false);
        }
        keep.push(tmp);
      }

      for (let j = 0; j < n; j++) {
        let b = data[j];
        let w = b.Duration || b.duration;
        let v = b.Impact || b.impact;

        for (let c = capacity; c >= w; c--) {
          if (dp[c - w] + v > dp[c]) {
            dp[c] = dp[c - w] + v;
            keep[j][c] = true;
          }
        }
      }

      let curr = capacity;
      let tasks = [];
      let total = dp[capacity];

      for (let j = n - 1; j >= 0; j--) {
        if (keep[j][curr]) {
          let b = data[j];
          let w = b.Duration || b.duration;
          let id = b.TaskID || b.taskId;
          
          tasks.push(id);
          curr = curr - w;
        }
      }

      ans.push({
        depotId: depots[i].DepotID || depots[i].depotId,
        totalImpact: total,
        tasks: tasks
      });
    }

    await Log("backend", "info", "route", "before response");
    
    return { data: ans };

  } catch (err) {
    await Log("backend", "error", "route", "inside catch block");
    return { data: [] };
  }
}

module.exports = run;
