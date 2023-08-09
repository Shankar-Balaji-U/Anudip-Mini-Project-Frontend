import { Component } from '@angular/core';

import { UserService } from '../../service/user.service';
import { User, UserType } from '../../service/entity/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  users?: UserType[] = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getAll().subscribe(users => { this.users = users, console.log(users) }/*.map((user: any) => User.fromJson(user))*/);
  }
}