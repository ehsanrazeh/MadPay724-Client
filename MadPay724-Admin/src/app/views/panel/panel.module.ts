import { NgModule } from '@angular/core';
import { PanelComponent } from './panel.component';
import { PanelRoutingModule } from './panel-routing.module';
import { CommonModule } from '@angular/common';
import { HasRoleModule } from 'src/app/Shared/Modules/hasRole/hasRole.module';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { AuthGuard } from 'src/app/core/_base/guards/auth.guard';
import { MatTooltipModule, MatPaginatorIntl, MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material';
import { NotificationComponent } from './layout/navbar/pages/notification/notification.component';
import { FaMatPaginatorIntl } from '../../Shared/Modules/material/faMatPaginatorIntl';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { ChatComponent } from './layout/navbar/pages/chat/chat.component';

@NgModule({
  imports: [
    PanelRoutingModule,
    CommonModule,
    HasRoleModule,
    MatTooltipModule,
    NgScrollbarModule
  ],
  declarations: [
    PanelComponent,
    NavbarComponent,
    SidebarComponent,
    NotificationComponent,
    ChatComponent
  ],
  providers: [
    AuthGuard,
    { provide: MatPaginatorIntl, useClass: FaMatPaginatorIntl },
    {provide: MAT_RADIO_DEFAULT_OPTIONS,useValue: { color: 'warn' }}
  ]
})

export class PanelModule { }
