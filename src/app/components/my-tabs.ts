import { Component, Input } from '@angular/core';
import myTabsModel from '../services/my-tabs-model';

@Component({
  selector: 'my-tabs',
  template: `
    <style>
      ion-button div {
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
      }
    </style>

    <ion-footer>
      <!-- <ion-button
        [fill]="page == 'worlds' ? 'outline' : 'clear'"
        [routerLink]="['/worlds']"
      >
        <div>
          <ion-icon name="globe-outline"></ion-icon>
          Worlds
        </div>
      </ion-button>
      <ion-button
        [fill]="page == 'status' ? 'outline' : 'clear'"
        [routerLink]="['/status']"
      >
        <div>
          <ion-icon name="power-outline"></ion-icon>
          Status
        </div>
      </ion-button> -->

      <ion-segment color="tertiary" [(ngModel)]="myTabsModel.currentPage">
        <ion-segment-button value="worlds" [routerLink]="['/worlds']">
          <ion-label>Worlds</ion-label>
          <ion-icon name="globe-outline"></ion-icon>
        </ion-segment-button>
        <ion-segment-button value="status" [routerLink]="['/status']">
          <ion-label>Status</ion-label>
          <ion-icon name="power-outline"></ion-icon>
        </ion-segment-button>
      </ion-segment>
    </ion-footer>
  `,
})
export class MyTabs {
  @Input() page: string;
  public myTabsModel = myTabsModel.data;
  constructor() {}
}
