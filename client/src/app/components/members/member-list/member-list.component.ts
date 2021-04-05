import { BehaviorSubject, combineLatest } from 'rxjs';
import {
    debounceTime, distinctUntilChanged, filter, first, map, mergeMap, shareReplay
} from 'rxjs/operators';
import { UserParams } from 'src/app/models';
import { MembersService } from 'src/app/services';
import { AccountService } from 'src/app/services/account.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent {
  protected pageNumberSubject$: BehaviorSubject<number> = new BehaviorSubject(1);
  protected pageNumber$ = this.pageNumberSubject$.asObservable().pipe(
    distinctUntilChanged(),
    shareReplay(1),
  );

  protected userParamsSubject$: BehaviorSubject<UserParams> = new BehaviorSubject(null);
  protected userParams$ = this.userParamsSubject$.asObservable().pipe(
    distinctUntilChanged(),
    shareReplay(1),
  );

  protected pagedMembers$ = combineLatest([this.userParams$, this.pageNumber$]).pipe(
    filter(([params]) => !!params),
    debounceTime(20),
    map(([params, pageNumber]) => ({ ...params, pageNumber })),
    mergeMap((params) => this._memberSvc.getMembers(params)),
    shareReplay(1),
  );

  members$ = this.pagedMembers$.pipe(map((pm) => pm.result));
  pagination$ = this.pagedMembers$.pipe(map((pm) => pm.pagination));

  constructor(
    protected _memberSvc: MembersService,
    protected _accountSvc: AccountService,
  ) {
    this._accountSvc.currentUser$.pipe(first()).subscribe((user) => {
      this.userParamsSubject$.next(new UserParams(user));
    });
  }

  pageChanged(event: any) {
    this.pageNumberSubject$.next(event.page);
  }
}
