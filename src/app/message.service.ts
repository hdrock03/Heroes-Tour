import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages: string[]= [] // array banaye

  constructor() { }

  add(message:string){ // add message function h jisko call kregnge jb bh iadd krna hga message
    this.messages.push(message)
  }

  clear(){  // isse message array khali kr denge
    this.messages = [] 
  }
}
