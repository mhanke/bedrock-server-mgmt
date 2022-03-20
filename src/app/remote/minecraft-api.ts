const minecraftServerUrl = 'http://localhost:3000';
const worldSetUrl = minecraftServerUrl + '/world/set';
const worldListUrl = minecraftServerUrl + '/world/list';
const restartUrl = minecraftServerUrl + '/restart';
const startUrl = minecraftServerUrl + '/start';
const stopUrl = minecraftServerUrl + '/stop';
const logsUrl = minecraftServerUrl + '/logs';

export default {
  restart,
  start,
  stop,
  worldSet,
  worldList,
  logs,
};

async function restart() {
  return fetch(restartUrl).then(function (response) {
    return response.json();
  });
}

async function start() {
  return fetch(startUrl).then(function (response) {
    return response.json();
  });
}

async function stop() {
  return fetch(stopUrl).then(function (response) {
    return response.json();
  });
}

function worldSet(name: String, mode?: String) {
  const queryParams = { 'level-name': name } as any;
  if (mode) queryParams.gamemode = mode;

  var url = new URL(worldSetUrl);
  Object.keys(queryParams).forEach((key) =>
    url.searchParams.append(key, queryParams[key])
  );
  return fetch(url.toString()).then(function () {
    console.log('Set World success.');
  });
}

async function worldList() {
  return fetch(worldListUrl).then(function (response) {
    return response.json();
  });
}

async function logs() {
  return fetch(logsUrl).then(function (response) {
    return response.json();
  });
}
