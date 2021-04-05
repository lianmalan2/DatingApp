import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Member } from 'src/app/models';
import { MembersService } from 'src/app/services';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss']
})
export class MemberDetailComponent {
  member$: Observable<Member> = this._memberSvc.getMember(this._route.snapshot.paramMap.get('username'));

  galleryOptions: NgxGalleryOptions[] = [{
    width: '500px',
    height: '500px',
    imagePercent: 100,
    thumbnailsColumns: 4,
    imageAnimation: NgxGalleryAnimation.Slide,
    preview: false,
  }];

  galleryImages$: Observable<NgxGalleryImage[]> = this.member$.pipe(
    filter(member => !!member),
    map((member) => member.photos),
    map((photos) => photos.map(photo => ({
      small: photo?.url,
      medium: photo?.url,
      large: photo?.url,
    }))),
  );

  constructor(
    protected _memberSvc: MembersService,
    protected _route: ActivatedRoute,
  ) { }
}
