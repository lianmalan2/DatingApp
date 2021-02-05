import { Member } from 'src/app/models/member';
import { MembersService } from 'src/app/services/members.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {
  members: Member[];

  constructor(
    private _memberSvc: MembersService,
  ) { }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(): void {
    this._memberSvc.getMembers().subscribe(members =>
      this.members = members
    );
  }
}
