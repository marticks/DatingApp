import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { Message } from 'src/app/_models/message';
import { MessageService } from 'src/app/_services/message.service';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {

  @ViewChild('memberTabs', {static: true}) memberTabs: TabsetComponent; 
  member: Member
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  activeTab: TabDirective;
  messages: Message[] = [];


  constructor(private memberService: MembersService, private route: ActivatedRoute, 
    private messageService: MessageService) { }

  ngOnInit(): void {    
    this.route.data.subscribe(data => {
    this.member = data.member;
  })

  this.route.queryParams.subscribe(params => {
    params.tab ? this.selectTab(params.tab) : this.selectTab(0);
  })

    //en la docu del componente de galeria dice que recibe gallery options(como mostrar las fotos) y las imagenes
    this.galleryOptions = [{
      width: '500px',
      height: '500px',
      imagePercent:100,
      thumbnailsColumns:4,
      imageAnimation: NgxGalleryAnimation.Slide,
      preview:false
    }]

    this.galleryImages = this.getImages();
  }


  getImages(): NgxGalleryImage[]{
    const imageUrls = [];
    for(const photo of this.member.photos){
      imageUrls.push({
        small: photo?.url,
        medium: photo?.url,
        large: photo?.url
      })
    }
    return imageUrls
  }


  loadMessages() {
    this.messageService.getMessageThread(this.member.username).subscribe(messages => {
      this.messages = messages;
    })
  }

  selectTab(tabId: number) {
    this.memberTabs.tabs[tabId].active = true;
  }

  //con este método te enteras deque tab clickeo el usuario, y basicamente cargas los mensajes si clickeo esa opcion
  onTabActivated(data: TabDirective) {
    this.activeTab = data;
    if (this.activeTab.heading === 'Messages' && this.messages.length === 0) {
      this.loadMessages();
    }
  }


}
