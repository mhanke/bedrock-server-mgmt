import minecraftApi from '../remote/minecraft-api';

const worlds = new Array<World>();

export interface World {
  name: string;
  mode: string;
  active: boolean;
}

export default {
  worlds,
  activeChanged,
  restart,
  refresh,
};

export function activeChanged(world: World) {
  console.log('activeChanged');

  minecraftApi.worldSet(world.name);
  worlds.forEach((currentWorld) => {
    if (currentWorld.name !== world.name) {
      console.log(currentWorld.name, world.name);
      currentWorld.active = false;
    }
  });
}

export function restart() {
  return minecraftApi.restart();
}

export function refresh() {
  return minecraftApi.worldList().then((worldsFromServer) => {
    setWorlds(worldsFromServer);
  });
}

function setWorlds(worldsFromServer: Array<World>) {
  worlds.length = 0;
  worldsFromServer.forEach((element) => {
    worlds.push({
      name: element.name,
      mode: element.mode,
      active: element.active,
    });
  });
}
