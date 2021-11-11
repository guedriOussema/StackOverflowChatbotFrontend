import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../services/messages.service';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements OnInit {

  messages = []
  userMessage

  constructor(private messagesService: MessagesService) { }

  ngOnInit() {
  }

  addMessage(message:string, isUser: boolean){
    let messageUser = {
      text: message,
      isUser: isUser
    }
    this.messagesService.addMessage(messageUser)
    this.messages = this.messagesService.getMessages()
    this.userMessage = ""
  }

}
