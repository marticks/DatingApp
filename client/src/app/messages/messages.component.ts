import { Component, OnInit } from '@angular/core';
import { Message } from '../_models/message';
import { Pagination } from '../_models/pagination';
import { MessageService } from '../_services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: Message[] = [];
  pagination: Pagination;
  container = 'Unread';
  pageNumber = 1;
  pageSize = 5;
  loading = false; 
  // este laoding está basicamente para que ni muestre los mensajes hasta que se hayan podido cargar las fotos.
  // mientras fetcheas la data esta en true y cuando tenes todo pasa a false, en el html tenes un hiden = loading

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages() {
    this.loading = true;
    this.messageService.getMessages(this.pageNumber, this.pageSize, this.container).subscribe(response => {
      this.messages = response.result;
      this.pagination = response.pagination;
      this.loading = false;
    })
  }

  deleteMessage(id: number) {
    this.messageService.deleteMessage(id).subscribe(() => {
      this.messages.splice(this.messages.findIndex(m => m.id === id), 1);
    })
  }

  pageChanged(event: any) {
    this.pageNumber = event.page;
    this.loadMessages();
  }
}
