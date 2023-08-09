export interface UserType {
	id: number;
	username: string;
	displayname: string;
	password: string;
	mobile: string;
	email: string;
	image: string | File | null;
	created_on: Date | null;
	last_login: Date | null;
	is_active: boolean;
	is_deleted: boolean;
}

export class User implements UserType {
	id: number;
	username!: string;
	displayname!: string;
	password!: string;
	mobile!: string;
	email!: string;
	image: string | File | null;
	created_on: Date | null;
	last_login: Date | null;
	is_active: boolean;
	is_deleted: boolean;

	constructor(
		id: number,
		username: string = '',
		displayname: string = '',
		mobile: string = '',
		email: string = '',
		image: string | File | null = null,
		is_active: boolean = false,
		is_deleted: boolean = false,
		last_login: Date | null = null,
		created_on: Date | null = null
	) {
	    this.id = id;
	    this.username = username;
	    this.displayname = displayname;
	    this.mobile = mobile;
	    this.email = email;
	    this.image = image;
	    this.is_active = is_active;
	    this.is_deleted = is_deleted;
	    this.last_login = last_login;
	    this.created_on = created_on;
	}

	static fromJson(data: any) {
	    return new User(
			data.id,
			data.username,
			data.displayname,
			data.mobile,
			data.email,
			data.image,
			data.is_active,
			data.is_deleted,
			new Date(data.last_login),
			new Date(data.created_on)
	    );
	}
}
