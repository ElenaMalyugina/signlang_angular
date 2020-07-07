import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { SystemAlertModel } from './systemAlertModel';
import { SystemAlertService } from './system-alert.service';

@Component({
  selector: 'app-system-alert',
  templateUrl: './system-alert.component.html',
  styleUrls: ['./system-alert.component.scss']
})
export class SystemAlertComponent implements OnInit {
  alerts$:Observable<SystemAlertModel[]>;

  constructor(private systemAlertService: SystemAlertService) { }

  ngOnInit() {
    this.alerts$ = this.systemAlertService.message;
  }

}
