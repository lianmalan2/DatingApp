import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, mergeMap, shareReplay } from 'rxjs/operators';
import { MembersService } from 'src/app/services';
import { Component } from '@angular/core';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent {
  protected pageNumberSubject$: BehaviorSubject<number> = new BehaviorSubject(1);
  protected pageNumber$: Observable<number> = this.pageNumberSubject$.asObservable().pipe(
    distinctUntilChanged(),
    shareReplay(1),
  );;

  protected pageSizeSubject$: BehaviorSubject<number> = new BehaviorSubject(5);
  protected pageSize$: Observable<number> = this.pageSizeSubject$.asObservable().pipe(
    distinctUntilChanged(),
    shareReplay(1),
  );

  protected pagedMembers$ = combineLatest([this.pageNumber$, this.pageSize$]).pipe(
    debounceTime(20),
    mergeMap(([pageNumber, pageSize]) => this._memberSvc.getMembers(pageNumber, pageSize)),
    shareReplay(1),
  );

  members$ = this.pagedMembers$.pipe(map((pm) => pm.result));
  pagination$ = this.pagedMembers$.pipe(map((pm) => pm.pagination));

  constructor(
    protected _memberSvc: MembersService,
  ) { }

  pageChanged(event: any) {
    this.pageNumberSubject$.next(event.page);
  }
}
