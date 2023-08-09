import { OnInit, Component, Input, Inject, Injector, ApplicationRef, ComponentRef, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { UserType } from '../../service/entity/user';
import { UserService } from '../../service/user.service';
import { spaceValidator, imageSize, mobileNumberValidator } from '../../service/validators';

import { convertFileToUrl, convertUrlToFile } from '../../utility/converters';

import { SetPasswordComponent } from '../../page/set-password/set-password.component'; 


@Component({
  selector: '[app-user-row]',
  templateUrl: './user-row.component.html',
  styleUrls: ['./user-row.component.css']
})


export class UserRowComponent implements OnInit {
  @Input() userRow?: UserType; // this will set from the parent component.

  setPasswordComponentRef?: ComponentRef<SetPasswordComponent>;
  // @ViewChild('body', { read: ViewContainerRef }) bodyRef!: ViewContainerRef;

  userForm!: FormGroup;

  private default_profile_url: string = 'assets/images/default_avatar.png';
  image_uri: string = this.default_profile_url;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private appRef: ApplicationRef,
    private viewRef: ViewContainerRef, 
    private resolver: ComponentFactoryResolver, 
    private injector: Injector
  ) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      username: [this.userRow?.username, [ Validators.required, Validators.minLength(6), spaceValidator ], this.userService.uniqueUsernameValidator(this.userRow?.id, 1000) ],
      fullname: [this.userRow?.displayname],
      mobile: [this.userRow?.mobile, mobileNumberValidator],
      email: [this.userRow?.email, Validators.email],
      image: [this.userRow?.image, imageSize(1024)],
      password: [this.userRow?.password, this.getPasswordValidator() ], // only validation if new user
    });

    // To set the preview of the image loaded from the server
    this.setProfileImage(this.userRow?.image);

    this.userForm.valueChanges
    .pipe(debounceTime(1000))
    .subscribe((form: UserType) => {
      if (this.userRow !== null && this.userRow !== undefined) {
        if (this.userForm.valid) {
          this.updateRow(form);
        }
      }
    });
    if (this.userRow !== null && this.userRow !== undefined) {
      this.password?.setErrors(null)
    }

    this.password?.valueChanges
    .pipe(debounceTime(1000))
    .subscribe((data) => {
      // this.userService.updatePassword(this.id, data).subscribe();
    });
  }

  updateRow(form: any): void {
    // this.onAdd();
    if (this.userRow !== null && this.userRow !== undefined) {
      const user = this.userService.update(this.getUserFormData()).subscribe(user => console.log(user));
    }
  }

  onAdd(): void {
    console.log(this.userForm);
    console.log(this.getUserFormData());
    if (this.userForm.valid) {
      this.userService.create(this.getUserFormData()).subscribe((user: UserType) => {
      
        // adding the row after saving the record in DB
        const factory = this.resolver.resolveComponentFactory(UserRowComponent);
        const root = document.createElement('tr'); // host element or wrapper element
        const userRowComponentRef = factory.create(this.injector, [], root);
        userRowComponentRef.instance.userRow = user;
        this.viewRef.insert(userRowComponentRef.hostView, 0); // element, index
        this.userForm.reset();
      });
    }
  }

  onDelete(event: any): void {
    if (this.userRow !== null && this.userRow !== undefined) {
      this.userService.delete(this.userRow.id).subscribe(
        (user) => this.viewRef.element.nativeElement.remove()
      );
    }
  }

  onSetPassword(value: any): void {
    this.password?.setValue(value);
  }

  createModel(): void {
    this.removeModel();

    const factory = this.resolver.resolveComponentFactory(SetPasswordComponent);
    this.setPasswordComponentRef = factory.create(this.injector);
    this.setPasswordComponentRef.instance.id = this.id;
    this.setPasswordComponentRef.instance.setPasswordEvent.subscribe((data: any) => {
      // Handle the event here when it is triggered in the dynamically created component
      this.onSetPassword(data);
    });

    this.appRef.attachView(this.setPasswordComponentRef.hostView);
    
    const setPasswordEl = this.setPasswordComponentRef.location.nativeElement;
    document.body.appendChild(setPasswordEl);

    // putting a delay to complete the appendChild method
    setTimeout(() => {
      const modelEl = document.getElementById(this.setpassword_model_id)
      // const bs = new (window as any).bootstrap.Offcanvas("#" + this.setpassword_model_id);
      
      // this will closes after the model is closed
      modelEl?.addEventListener('hidden.bs.offcanvas', (event: any) => {
        this.removeModel();
      });
    }, 0);
  }

  removeModel(): void {
    if (this.setPasswordComponentRef) {
      this.appRef.detachView(this.setPasswordComponentRef.hostView);
      this.setPasswordComponentRef.destroy();
    }
  }

  loadPreviewImage(event: any): void {
    const file: File | null = event.target.files.item(0);
    this.setProfileImage(file);
  }

  setProfileImage(file: any) {
    if (file instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          this.image_uri = reader.result;
        } else {
          this.image_uri = this.default_profile_url;
          console.error(new Error('Failed to convert file to Data URL'));
        }
      };
      reader.readAsDataURL(file);
    } else if (typeof file === 'string') {
      this.image_uri = file;
    }
  }

  toEditable(event: any) {
    if (this.userRow !== null && this.userRow !== undefined) {
      event.target.readOnly = false;
    }
  }

  toNonEditable(event: any) {
    if (this.userRow !== null && this.userRow !== undefined) {
      event.target.readOnly = true;
    }
  }

  getUserFormData(): FormData {
    const userData: FormData = new FormData();

    Object.entries(this.userForm.getRawValue()).forEach((entry: any) => {
      userData.append(entry[0], entry[1]);
    });

    userData.forEach((entry: any) => {
    console.log(entry);
    });
    // console.log(rawData)
    // Object.entries(this.userForm.controls).forEach((entry) => {
    //   if (entry[1]?.value !== null)
    //     userData.append(entry[0], entry[1]?.value);
    // })
    // {
    //   username: this.username?.value,
    //   displayname: this.fullname?.value,
    //   password: this.password?.value
    //   mobileNo: this.mobile?.value,
    //   emailId: this.email?.value,
    // }
    // if (this.userRow !== undefined) user['id'] = this.userRow?.id;
    // if (this.image?.value instanceof File) user['image'] = this.image?.value;
    return userData;
  }

  getPasswordValidator() {
    if (this.userRow === undefined) {
      return [ Validators.required ];
    }
    return [];
  }

  get id() { return this.userRow?.id; }
  get username() { return this.userForm.get('username'); }
  get fullname() { return this.userForm.get('fullname'); }
  get mobile() { return this.userForm.get('mobile'); }
  get email() { return this.userForm.get('email'); }
  get image() { return this.userForm.get('image'); }
  get image_preview_id() { return 'profile-preview-' + this.id; }
  get image_upload_id() { return 'upload-profile-' + this.id; }
  get setpassword_model_id() { return 'setPasswordModel-' + this.id; }
  get setpassword_model_button_id() { return 'setPasswordButton-' + this.id; }
  get password() { return this.userForm.get('password'); }
  // image_uri
}

