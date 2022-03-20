import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  PreloadAllModules,
  RouteReuseStrategy,
  RouterModule,
  Routes,
} from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { StatusPage } from './status/status.page';
import { WorldsPage } from './worlds/worlds.page';
import { MyTabs } from './components/my-tabs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WorldsCreateModal } from './worlds/worlds.create.modal';

const routes: Routes = [
  {
    path: 'worlds',
    component: WorldsPage,
  },
  {
    path: 'status',
    component: StatusPage,
  },
  {
    path: '',
    redirectTo: 'worlds',
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [
    AppComponent,
    StatusPage,
    WorldsPage,
    MyTabs,
    WorldsCreateModal,
  ],
  entryComponents: [],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    BrowserModule,
    IonicModule.forRoot(),
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
