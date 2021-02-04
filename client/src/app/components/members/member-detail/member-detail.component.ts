import { Observable } from 'rxjs';
import { Member } from 'src/app/models/member';
import { MembersService } from 'src/app/services/members.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss']
})
export class MemberDetailComponent {
  member$: Observable<Member> = this._memberSvc.getMember(this._route.snapshot.paramMap.get('username'));

  constructor(
    private _memberSvc: MembersService,
    private _route: ActivatedRoute,
  ) { }
}
