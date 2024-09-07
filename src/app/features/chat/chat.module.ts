import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ContactsComponent } from './components/contacts/contacts.component';
import { MessageComponent } from './components/message/message.component';
import { OptionsComponent } from './components/options/options.component';
import { ChatPageComponent } from './pages/chat-page/chat-page.component';
import { MatIconModule } from '@angular/material/icon';
import { NotMessagesComponent } from './components/not-messages/not-messages.component';
import { FormsModule } from '@angular/forms';
import { AuthModule } from "../auth/auth.module";
import { AddGroupComponent } from './modals/add-group/add-group.component';
import { AddUserComponent } from './modals/add-user/add-user.component';
import { CreateGroupComponent } from './modals/create-group/create-group.component';


@NgModule({
  declarations: [
    ContactsComponent,
    MessageComponent,
    OptionsComponent,
    ChatPageComponent,
    NotMessagesComponent,
    AddGroupComponent,
    AddUserComponent,
    CreateGroupComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    MatIconModule,
    FormsModule,
    AuthModule
],
  exports:[
    ChatPageComponent
  ]
})
export class ChatModule { }
