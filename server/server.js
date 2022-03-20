const http = require("http");
const fs = require("fs");
const url = require("url");
const { exec, spawn, ChildProcess } = require("child_process");

const hostname = "127.0.0.1";
const port = 3000;
const serverDir = "D:\\minecraft\\bedrock-server";
const serverFilePath = serverDir + "\\server.properties";
const worldsDir = serverDir + "\\worlds";
const fileOptions = {
  encoding: "utf-8",
};
let bedrockProcess;
const logs = [];

const server = http.createServer((req, res) => {
  let resturnValue = "Endpoint not working.";
  const path = req.url.split("?")[0];

  if (path === "/world/current") {
    resturnValue = worldCurrent();
  }

  if (path === "/world/set") {
    const params = url.parse(req.url, true).query;
    resturnValue = worldSet(params);
  }

  if (path === "/world/list") {
    resturnValue = worldList();
  }

  if (path === "/start") {
    start();
    resturnValue = '"Started"';
  }

  if (path === "/stop") {
    stop();
    resturnValue = '"Stopped"';
  }

  if (path === "/restart") {
    restart();
    resturnValue = '"Restarted"';
  }

  if (path === "/logs") {
    resturnValue = logsToJson();
  }

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Request-Method", "*");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET");
  res.setHeader("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(resturnValue);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

function worldCurrent() {
  const serverProperties = fs.readFileSync(serverFilePath, fileOptions);
  const split = serverProperties.split("\r\n");
  for (let index = 0; index < split.length; index++) {
    const each = split[index];
    const lineSplit = each.split("=");
    if (lineSplit[0] === "level-name") {
      return lineSplit[1];
    }
  }
}

function worldSet(params) {
  let serverProperties = fs.readFileSync(serverFilePath, fileOptions);
  for (const name in params) {
    if (Object.hasOwnProperty.call(params, name)) {
      const value = params[name];
      replace(name, value);
    }
  }
  fs.writeFileSync(serverFilePath, serverProperties, fileOptions);

  function replace(name, value) {
    const regex = new RegExp(`${name}=(.*)\r\n`);
    const replace = `${name}=${value}\r\n`;
    serverProperties = serverProperties.replace(regex, replace);
  }
}

function worldList() {
  const activeWorld = worldCurrent();
  const worldsFromDir = fs.readdirSync(worldsDir);
  const worlds = [];
  worldsFromDir.forEach((world) => {
    const newWorld = { name: world };
    if (world == activeWorld) {
      newWorld.active = true;
    } else {
      newWorld.active = false;
    }
    worlds.push(newWorld);
  });
  return JSON.stringify(worlds);
}

function restart() {
  console.log("restart");
  stop();
  start();
}

function start() {
  console.log("start");
  let lastOutput = "";
  logs.splice(0, logs.length);
  if (bedrockProcess) return;

  bedrockProcess = spawn("bedrock_server", [], {
    cwd: serverDir,
  });

  bedrockProcess.stdout.pipe(process.stdout);
  bedrockProcess.stdout.on("data", (chunk) => {
    let newLog = chunk.toString();
    if (newLog.endsWith("\r\n")) {
      lastOutput += newLog;
      const split = lastOutput.split("\r\n");
      split.forEach((element) => {
        logs.push(element);
      });
      lastOutput = "";
    } else {
      lastOutput = newLog;
    }
  });
  bedrockProcess.stderr.pipe(process.stdout);
  bedrockProcess.stderr.on("data", (chunk) => {
    logs.push(chunk.toString());
  });
}

function stop() {
  console.log("stop");
  bedrockProcess && bedrockProcess.kill();
  bedrockProcess = undefined;
  logs.length = 0;
}

function logsToJson() {
  return JSON.stringify(logs);
}

/*function writeCmd(process, msg) {
    process.stdin.write(msg + "\n");
  }*/
