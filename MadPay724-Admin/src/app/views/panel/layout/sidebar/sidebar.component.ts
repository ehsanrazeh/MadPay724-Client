import { Component, OnInit } from '@angular/core';
import * as fromStore from '../../../../store';
import { Store } from '@ngrx/store';
import { NotificationStateModel } from 'src/app/store/_model/notificationsStateModel';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  url = '../../../../../assets/js/app-sidebar.js';
  loadAPI: any;
  notifyBlogUnverifiedCount$: Observable<number>;
  constructor(private store: Store<fromStore.State>) {
    this.loadBlogNotify();
  }
  loadBlogNotify() {
    this.store.dispatch(new fromStore.LoadUnverifiedBlogCount());

    this.notifyBlogUnverifiedCount$ =
      this.store.select(fromStore.getNotificationBlogUnverifiedCount);
  }
  ngOnInit() {
    this.loadAPI = new Promise(resolve => {
      this.loadScript();
    });
  }

  public loadScript() {
    const node = document.createElement('script');
    node.src = this.url;
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
  }

}
