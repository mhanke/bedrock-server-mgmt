import { Component } from '@angular/core';
import {
  IonRouterOutlet,
  LoadingController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import myTabsModel from '../services/my-tabs-model';
import worldsModel, { World } from '../services/worlds-model';
import { WorldsCreateModal } from './worlds.create.modal';

@Component({
  selector: 'app-worlds',
  templateUrl: 'worlds.page.html',
})
export class WorldsPage {
  public worlds = worldsModel.worlds;
  private modal?: HTMLIonModalElement;

  constructor(
    private toastController: ToastController,
    public modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
    public loadingController: LoadingController
  ) {
    this.refresh();
  }

  ionViewDidEnter() {
    myTabsModel.setPage('worlds');
  }

  public refresh(event?) {
    worldsModel.refresh().then(() => {
      // setTimeout(() => {
      event && event.target.complete();
      // }, 10000);
    });
  }

  public activeChanged(world: World) {
    worldsModel.activeChanged(world);
  }

  public restart() {
    worldsModel.restart().then(
      () => {
        this.showToast('Der Server wurde gestartet.', 'success', 2000);
      },
      (error) => {
        this.showToast(
          'Der Server konnte nicht gestartet werden.' + error,
          'danger',
          10000
        );
      }
    );
  }

  public createWorld() {
    this.presentModal();
  }

  async presentModal() {
    this.modal = await this.modalController.create({
      component: WorldsCreateModal,
      cssClass: 'my-custom-class',
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
    });
    this.modal.onDidDismiss().then(async () => {
      const loading = await this.presentLoading();
      setTimeout(() => {
        this.refresh();
        loading.dismiss();
      }, 2000);
    });
    return await this.modal.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
    });
    await loading.present();
    return loading;

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  private async showToast(message: string, color: string, duration: number) {
    const toast = await this.toastController.create({
      message: message,
      color: color,
      duration: duration,
      buttons: [{ icon: 'close-outline', role: 'cancel' }],
    });
    toast.present();
  }
}
