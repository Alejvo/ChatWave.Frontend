import { Component, ElementRef, ViewChild } from '@angular/core';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';
import { ChatService } from '../../services/chat.service';
import { userMessage } from 'src/app/core/models/userMessage';
import { message } from 'src/app/core/models/message';
import { groupMessage } from 'src/app/core/models/groupMessage';
import { AuthService } from 'src/app/features/auth/services/auth.service';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent {

  user:User | null = null;
  userMessages!:userMessage[];
  groupMessages!: groupMessage[];
  messages!:message[];
  messageContent = "";
  currentContact = "";
  isSideBarActive: boolean = false;
  isGroupsAccordionOpen: boolean = true;
  isFriendsAccordionOpen: boolean = true;
  isSent:boolean = true;
  userId!:string;
  username:string ='';
  @ViewChild('messageContainer') private messageContainer!:ElementRef;

  constructor(
    private userService:UserService,
    private chatService:ChatService,
    private authService:AuthService){}
  ngOnInit(){
    const token = this.authService.getToken();
    if(token){
      const info = this.authService.getUserInfoFromToken(token);
      console.log(info?.userId)
      if(info){

        this.chatService.startConnection();
        this.chatService.messageReceived$.subscribe({
          next: (data) => {
            console.log(`Text: ${data.text}`);
            const status = data.senderId === this.userId ?'Sent':'Received'
            this.messages.push({...data,status});
          }
        })
        this.chatService.messageHistory$.subscribe({
          next: (data) => {
            this.messages = data;
            this.messages = this.messages.map(msg => ({
              ...msg,
              status: msg.senderId === this.userId ? 'Sent' : 'Received'
            }));
          }
        });
        this.userId = info.userId;
        this.username = info.username;
        console.log(`username: ${this.username}, userId: ${this.userId}`)
        this.getUserById(this.userId);
      }
    }else{
      alert('error!')
    }



  }

  ngAfterViewChecked(){
    this.scrollToBottom();
  }
  private scrollToBottom(): void {
    const container = this.messageContainer.nativeElement;
    container.scrollTop = container.scrollHeight;
  }
  toggleMenu(){
    this.isSideBarActive = !this.isSideBarActive;
  }
  toggleGroupsAccordion(){
    this.isGroupsAccordionOpen = !this.isGroupsAccordionOpen;


  }
  
  toggleFriendsAccordion() {
    this.isFriendsAccordionOpen = !this.isFriendsAccordionOpen;
  }

  getUserById(id:string){
    this.userService.getUserById(id).subscribe(
      {
        next:(data:User)=>{
          this.user = data;
        },
        error:(error)=>{
          console.error('Error when tried to get user',error)
        }
      }
    );
  }
  loadHistory(contactId:string):void{
    this.currentContact = contactId;
    if(this.currentContact && this.userId){
      this.chatService.getMessageHistory(this.userId,this.currentContact);
    }
  }
  sendMessage(){
    if (this.userId && this.currentContact && this.messageContent) {
      this.chatService.sendMessageToUser(this.currentContact,this.userId,this.messageContent);
      this.messageContent = '';
    }
  }
}
