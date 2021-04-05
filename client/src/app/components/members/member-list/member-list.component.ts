import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Member } from 'src/app/models';
import { Pagination } from 'src/app/models/pagination';
import { MembersService } from 'src/app/services';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {
  members$: Observable<Member[]>;
  pagination$: Observable<Pagination>;
  pageNumber: number = 1;
  pageSize: number = 5;

  constructor(
    protected _memberSvc: MembersService,
  ) { }

  ngOnInit(): void {
    const pagedMembers$ = this._memberSvc.getMembers(this.pageNumber, this.pageSize);

    this.members$ = pagedMembers$.pipe(map((pm) => pm.result));
    this.pagination$ = pagedMembers$.pipe(map((pm) => pm.pagination));
  }
}
