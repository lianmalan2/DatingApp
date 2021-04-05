import { Observable } from 'rxjs';
import { Member } from 'src/app/models';
import { MembersService } from 'src/app/services';
import { Component } from '@angular/core';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent {
  members$: Observable<Member[]> = this._memberSvc.getMembers();

  constructor(
    protected _memberSvc: MembersService,
  ) { }
}
