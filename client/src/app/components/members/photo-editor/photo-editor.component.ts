import { FileUploader } from 'ng2-file-upload';
import { take } from 'rxjs/operators';
import { Member, Photo, User } from 'src/app/models';
import { AccountService, MembersService } from 'src/app/services';
import { environment } from 'src/environments/environment';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.scss']
})
export class PhotoEditorComponent implements OnInit {
  @Input() member: Member;
  uploader: FileUploader;
  hasBaseDropzoneOver = false;
  baseUrl = environment.apiUrl;
  user: User;

  constructor(private _accountSvc: AccountService, protected _memberSvc: MembersService) {
    this._accountSvc.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.initializeUploader();
  }

  fileOverBase(e: any) {
    this.hasBaseDropzoneOver = e;
  }

  setMainPhoto(photo: Photo): void {
    this._memberSvc.setMainPhoto(photo.id).subscribe(() => {
      this.user.photoUrl = photo.url;
      this._accountSvc.setCurrentUser(this.user);
      this.member.photoUrl = photo.url;
      this.member.photos.forEach(p => {
        if (p.isMain) { p.isMain = false; }
        if (p.id === photo.id) { p.isMain = true; }
      })
    });
  }

  deletePhoto(photo: Photo): void {
    this._memberSvc.deletePhoto(photo.id).subscribe(() => {
      this.member.photos = this.member.photos.filter(p => p.id !== photo.id);
    });
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: `${this.baseUrl}users/add-photo`,
      authToken: `Bearer ${this.user.token}`,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (!!response) {
        const photo = JSON.parse(response);
        this.member.photos.push(photo);
      }
    }
  }
}
