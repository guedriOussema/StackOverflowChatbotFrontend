import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private http: HttpClient) {}

  messages: any[] = []
  
  addMessage(message: any){
    this.messages.push(message)
    this.getResponseChatbot(message.text)
  }

  getMessages(){
    return this.messages
  }


  getResponseChatbot(message: string){
    let payload = { text: message }

    this.http.post('https://stackoverflow-chatbot-api.herokuapp.com/response', payload, {responseType: 'text'}).subscribe((res:any)=> {


      try {
        var obj:any = JSON.parse(res)
      } catch (error) {
        var obj:any = {
          status: "Not OK",
          Body: res
        }
      }

      if(obj.status == "OK"){
        let resp = "This may help you: <a href='" + obj.link + "'>"+ obj.link +"</a> <br><br>" + obj.Body

        let responseMessage = {
          text: resp,
          isUser: false
        }
  
        this.messages.push(responseMessage)
      } else {
        let responseMessage = {
          text: obj.Body,
          isUser: false
        }
        this.messages.push(responseMessage)
      }

    }, (err)=> {
      let responseMessage = {
        text: "It seems that the server cannot respond. Please try again later.",
        isUser: false
      }
      this.messages.push(responseMessage)
    })
  }

}
