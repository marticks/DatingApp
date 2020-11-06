import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild("editForm") editForm: NgForm //asi tengo acceso a la template form desde aca
  member: Member
  user: User
  @HostListener("window: beforeunload", ['$event']) unloadNotification($event: any) { //con esto podes reaccion a eventos en el browser como un cambio de pagina
    if (this.editForm.dirty) {  //no se si me cabe mucho porque ya tenes los otros eventos por si se cambia de pagina pero bueno saber esto
      $event.returnValue = true
    }
  }


  constructor(private accountService: AccountService, private memberService: MembersService,
    private toastr: ToastrService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user)

  }

  ngOnInit(): void {
    this.LoadMember()
  }

  LoadMember() {
    this.memberService.getMember(this.user.username).subscribe(member => this.member = member)
  }

  UpdateMember() {
    this.memberService.UpdateMember(this.member).subscribe(() => { // no te devuelve nada esto, se ponen los parentesis vacios
      this.toastr.success("Profile Updated successfully")
      this.editForm.reset(this.member) // con esto reseteo pero con los valores nuevos, para que se apague el boton de submit y eso
    });

  }



}
