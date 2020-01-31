import { Component, OnInit, OnDestroy } from '@angular/core';

import * as fromStore from 'src/app/store';
import { Store } from '@ngrx/store';
import { DirectMessageStateModel } from 'src/app/store/_model/directMessageStateModel';
import { AuthService } from 'src/app/core/_services/auth/auth.service';
import { DirectMessageStateContainer } from 'src/app/store/_model/directMessageStateContainer';
import { Subscription, Observable } from 'rxjs';
import { UserInfo } from 'src/app/data/models/common/chat/userInfo';
import { DirectMessage } from 'src/app/data/models/common/chat/directMessage';

@Component({
  selector: 'app-user-chat',
  templateUrl: './user-chat.component.html',
  styleUrls: ['./user-chat.component.css']
})
export class UserChatComponent implements OnInit, OnDestroy {
  subManager = new Subscription();
  //*********** 
  onlineUsers$: Observable<UserInfo[]>;
  onlineUser: UserInfo;
  directMessages: DirectMessage;
  selectedOnlineUserName = '';
  dmState$: Observable<DirectMessageStateContainer>;
  connected: boolean;
  message = '';
  //***********
  constructor(private authService: AuthService, private store: Store<fromStore.State>) {

    this.onlineUsers$ = this.store.select(fromStore.getOnlineUsers);
    this.dmState$ = this.store.select(fromStore.getDirectMessageStateContainer);
    this.subManager.add(
      this.store.select(fromStore.getConnected).subscribe(data => {
        this.connected = data;
      })
    );
  }
  ngOnInit() {
    this.selectedOnlineUserName = 'admin@madpay724.com';
  }
  ngOnDestroy() {
    this.subManager.unsubscribe();
  }

  connect(onlineUsers: UserInfo[]) {
    if (this.isAdminOnline(onlineUsers)) {
      this.store.dispatch(new fromStore.Join());
    }
  }
  sendMessage(onlineUsers: UserInfo[]) {
    if (this.isAdminOnline(onlineUsers)) {
      this.store.dispatch(new fromStore.SendDirectMessage(this.message, this.selectedOnlineUserName))
    }
  }
  getUserInfoName(directMessage: DirectMessage) {
    if (directMessage.fromOnlineUser) {
      return directMessage.fromOnlineUser.userName;
    }
    return '';
  }
  isAdmin(directMessage: DirectMessage) {
    if (directMessage.fromOnlineUser) {
      return true
    }
    return false;
  }
  isAdminOnline(onlineUsers: UserInfo[]):boolean {
    if (onlineUsers.some(el => el.userName === 'admin@madpay724.com')) {
      return true;
    } else {
      return false;
    }
  }
  disConnect() {
    this.store.dispatch(new fromStore.Leave());
  }

}
