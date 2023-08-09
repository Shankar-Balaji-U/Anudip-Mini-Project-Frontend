import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { spaceValidator, matchWith } from '../../service/validators';


@Component({
  selector: '[app-set-password]',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.css']
})
export class SetPasswordComponent {
  @Input() id?: string | number;
  @Output() setPasswordEvent = new EventEmitter<any>();
  passwordForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.passwordForm = this.formBuilder.group({
      password1: [null, [ Validators.required, Validators.minLength(8), spaceValidator ]],
      password2: [null, [ Validators.required, matchWith("password1") ]],
    // }, 
    // {
    //   validator: this.passwordMatchValidator
    });
  }

  onSave() {
    if (this.passwordForm.valid) {
      this.setPasswordEvent.emit(this.password1?.value);

      const modelEl = document.getElementById(this.setpassword_model_id);
      const model = (window as any).bootstrap.Offcanvas.getInstance(modelEl);
      // const model = (window?.bootstrap as any).Offcanvas.getInstance(modelEl);
      model?.hide();
    }
  }

  get password1() { return this.passwordForm.get('password1') }
  get password2() { return this.passwordForm.get('password2') }
  get setpassword_model_id() { return 'setPasswordModel-' + this.id; }
}
