import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { AlertInterface } from '../../layout/alert/alert.interface';
import { AlertService } from '../../layout/alert/alert.service';

import { UserService } from '../../service/user.service';
import { User } from '../../service/entity/user';
import { spaceValidator, imageSize } from '../../service/validators';


@Component({
	selector: '[app-user-create]',
	templateUrl: './user-create.component.html',
	styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent {
	userData: any = {};
	userForm!: FormGroup;
	default_profile_url: string = "assets/images/default_avatar.png";
	profile_url?: string;

	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private userService: UserService
	) { }

	ngOnInit(): void {
		this.userForm = this.formBuilder.group({
			username: ['loverboi25112', [ Validators.required, Validators.minLength(6), spaceValidator ], [ this.userService.uniqueUsernameValidator() ]],
			firstname: ['Shankar', spaceValidator],
			lastname: ['Balaji', spaceValidator],
			mobile: ['9043393145'],
			email: ['shankarbalaji2511@gmail.com', Validators.email],
			image: [null, imageSize(1024)],
			password1: ['testing321', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
			password2: ['testing321', Validators.required]
		// }, 
		// {
		// 	validator: this.passwordMatchValidator
		});
		this.profile_url = this.default_profile_url;
		this.validate();
	}

	loadPreviewImage(event: any): void {
		const file: File | null = event.target.files.item(0);
		this.setProfileImage(file);
	}

	setProfileImage(file: any) {
		if (file !== null) {
			this.userData['image'] = file;
			const reader = new FileReader();
			reader.onloadend = () => {
  				if (typeof reader.result === 'string') {
  					this.profile_url = reader.result;
  				}
			}
			reader.readAsDataURL(this.userData['image'])
		} else {
			this.image?.setValue(null);
			this.profile_url = this.default_profile_url;
			delete this.userData['image'];
		}
	}

	onSubmit(): void {
		console.log(this.userForm);
		// stop here if form is invalid
        if (this.userForm.invalid) return;

		this.userData['username'] = this.username?.value
		this.userData['password'] = this.passwordOne?.value

		if (this.displayname) 
			this.userData['displayname'] = this.displayname;

		if (this.email?.value) 
			this.userData['emailId'] = this.email?.value;

		if (this.mobile?.value) 
			this.userData['mobileNo'] = this.mobile?.value;

		// this.userService.create(this.userData).subscribe(
		// 	(response) => console.log(response),
		// 	(error) => console.error(error.error)
		// );
	}

	get username() { return this.userForm.get('username'); }
	get firstname() { return this.userForm.get('firstname'); }
	get lastname() { return this.userForm.get('lastname'); }
	get displayname() { 
		let firstName = this.firstname?.value || '';
		let lastName = this.lastname?.value || '';

		return (firstName + lastName) !== '' ? (firstName + " " + lastName) : null;
	}
	get mobile() { return this.userForm.get('mobile'); }
	get email() { return this.userForm.get('email'); }
	get image() { return this.userForm.get('image'); }
	get passwordOne() { return this.userForm.get('password1'); }
	get passwordTwo() { return this.userForm.get('password2'); }

	private validate(): void {
		Object.keys(this.userForm.controls).forEach(key => {
			this.userForm.controls[key].markAsTouched();
			this.userForm.controls[key].markAsDirty();
		});
	}
}



	// private _previewImage(): Observable<string> {
	// 	return Observable.create((observer: any) => {
	// 		if (this.userData['image']) {
    // 			const reader = new FileReader();
    // 			reader.onloadend = () => {
    //   				if (typeof reader.result === 'string') {
	//         			observer.next(reader.result);
	//         			observer.complete();
	//         			observer.error(new Error('Failed to convert file to Data URL'));
	//       			} else {
	//         			observer.error(new Error('Failed to convert file to Data URL'));
	//       			}
	//     		};
    // 			reader.readAsDataURL(this.userData['image']);
	// 		} else {
	//         	observer.next();
	// 		}
  	// 	});
	// }




		// new Observable<string>((resolve, reject) => {
	    //   	if (this.userData['image']) {
	    //     	const reader = new FileReader();
	    //     	reader.onloadend = () => {
	    //       		if (typeof reader.result === 'string') {
	    //         		resolve(reader.result);
	    //       		} else {
	    //         		reject(new Error('Failed to convert file to Data URL'));
	    //       		}
	    //     	};
	    //     	reader.readAsDataURL(this.userData['image']);
	    //   	} else {
	//     	setTimeout(() => {
	//         	resolve('assets/images/default_avatar.png'); // Fallback image URL
    //   		}, 2000);

	//     //   	}
	//     })
	// }