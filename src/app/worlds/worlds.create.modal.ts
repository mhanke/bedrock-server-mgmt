import { Component, Input } from '@angular/core';
import minecraftApi from '../remote/minecraft-api';
import { World } from '../services/worlds-model';

@Component({
  selector: 'worlds-create-modal',
  templateUrl: 'worlds.create.modal.html',
})
export class WorldsCreateModal {
  @Input() modal: HTMLIonModalElement;

  public newWorld: World = {
    name: '',
    active: false,
    mode: 'creative',
  };
  constructor() {}

  public closeModal() {
    this.modal.dismiss();
  }

  public save() {
    minecraftApi
      .worldSet(
        this.newWorld.name + ' ' + this.newWorld.mode,
        this.newWorld.mode
      )
      .then(minecraftApi.restart)
      .then(() => {
        this.closeModal();
      });
  }
}
