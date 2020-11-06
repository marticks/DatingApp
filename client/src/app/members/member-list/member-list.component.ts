import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  members$: Observable<Member[]> //con el $ es convencion para decir que es observable

  constructor(private memberService:MembersService) { }

  ngOnInit(): void {
    this.members$ = this.memberService.getMembers()
  }

  /*
  loadMembers(){
    this.memberService.getMembers().subscribe(members => {
      this.members = members;
    })
  }
  así obtenia los usuarios antes
  */


}
