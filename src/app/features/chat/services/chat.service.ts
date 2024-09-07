import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, Subject } from 'rxjs';
import { message } from 'src/app/core/models/message';

import { environment } from 'src/environments/environment.development';
import { HttpTransportType, HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private apiUrl =environment.apiUrl;
  private hubConnection!:HubConnection;

  private messageReceivedSubject = new Subject<message>();
  private messageHistorySubject = new Subject<message[]>();

  messageReceived$ = this.messageReceivedSubject.asObservable();
  messageHistory$ = this.messageHistorySubject.asObservable();

  constructor(private http:HttpClient,private authService:AuthService) { }
  /*
  public getMessages(receiver:string,sender:string):Observable<message[]>{
  
    let params = new HttpParams()
    params.set('receiver', receiver)
    params.set('sender', sender);

    return this.http
      .get<any[]>(`${this.apiUrl}/api/message/get/receiver/${receiver}/sender/${sender}`,{params})
      .pipe(
        map(
          messages=>messages.map(message=>({
          status: message.senderId === sender ?'Sent':'Received',
          text: message.text,
          senderId: message.senderId,
          contactId: message.ReceiverId,
          sentAt: message.SentAt
        })))
      )
  }*/
  public startConnection(){

    this.hubConnection = new HubConnectionBuilder()
      .withUrl(`${environment.apiUrl}/chatHub`,{
        accessTokenFactory:()=>{
          return this.authService.getToken() || '';
        }
      })
      .build();

    this.hubConnection
      .start()
      .then(()=>console.log('Connection Started'))
      .catch(err=>console.error('Error while starting connection',err))

    this.hubConnection.on('ReceiveMessage',(message:any)=>{
      console.log(`New Message: ${message.text}`)
      this.messageReceivedSubject.next(message)
    })

    this.hubConnection.on('ReceiveMessageHistory', (messages: message[]) => {
      this.messageHistorySubject.next(messages);
    })
  }


  public getMessageHistory(receiver:String,sender:String){
    this.hubConnection.invoke('GetUserMessages',receiver,sender)
      .catch(err=>console.error(err))
  }
  public sendMessageToUser(receiver: string, sender: string,message:string) {
    this.hubConnection.invoke('SendMessageToUser', receiver, sender,message)
      .catch(err => console.error(err))
  }
  public getGroupMessageHistory(group:string,user:string){
    this.hubConnection.invoke('GetGroupMessages',group,user)
  }
  public sendGroupMessage(group:string,sender:string,message:string){
    this.hubConnection.invoke('SendMessageToGroup',group,sender,message)
  }

}
