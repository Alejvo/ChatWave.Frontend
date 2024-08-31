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


@NgModule({
  declarations: [
    ContactsComponent,
    MessageComponent,
    OptionsComponent,
    ChatPageComponent,
    NotMessagesComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    MatIconModule,
    FormsModule
  ],
  exports:[
    ChatPageComponent
  ]
})
export class ChatModule { }
