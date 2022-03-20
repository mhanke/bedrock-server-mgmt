import minecraftApi from '../remote/minecraft-api';

const logs = new Array<String>();

export default {
  logs,
  loadLogs,
  start,
  stop,
};

function loadLogs() {
  logs.splice(0, logs.length);

  minecraftApi
    .logs()
    .then((logsFromServer) => {
      logsFromServer.forEach((log) => {
        logs.push(log);
      });
    })
    .finally(() => {
      setTimeout(() => {
        loadLogs();
      }, 2000);
    });
}

function start() {
  minecraftApi.start();
}

function stop() {
  minecraftApi.stop();
}
