import { Component } from '@angular/core';
import myTabsModel from '../services/my-tabs-model';
import statusModel from '../services/status-model';

@Component({
  selector: 'app-status',
  templateUrl: 'status.page.html',
})
export class StatusPage {
  public logs = statusModel.logs;

  constructor() {
    statusModel.loadLogs();
  }

  ionViewDidEnter() {
    myTabsModel.setPage('status');
  }

  public start() {
    statusModel.start();
  }

  public stop() {
    statusModel.stop();
  }
}
