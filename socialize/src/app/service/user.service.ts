import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';

import { Observable, of, timer } from 'rxjs';
import { catchError, debounceTime, map, take, switchMap, distinctUntilChanged } from 'rxjs/operators';

import { isEmptyInputValue } from './validators';
import { User } from './entity/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly BACKEND_HOST: string = "http://localhost:8080";

  constructor(private request: HttpClient) { }

  create(formData: FormData): Observable<any> {
    const header = new HttpHeaders({
      // 'Content-Type': 'application/json',
      // 'Content-Type': 'multipart/form-data',
      // 'enctype': 'multipart/form-data',
      'Accept': 'application/json',
      'type': 'formData'
    });

    return this.request.post<any>(`${this.BACKEND_HOST}/user/create-profile/`, formData, { headers: header });
  }

  update(formData: FormData) {
    const header = new HttpHeaders({
      // 'Content-Type': 'application/json',
      // 'Content-Type': 'multipart/form-data',
      // 'enctype': 'multipart/form-data'
      'Accept': 'application/json',
      'type': 'formData'
    });
    return this.request.put<any>(`${this.BACKEND_HOST}/user/update-profile/${formData.get('id')}/`, formData, { headers: header });
  }

  updatePassword(id: number, password: string) {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Content-Type': 'multipart/form-data',
      // 'enctype': 'multipart/form-data'
    });
    return this.request.put<any>(`${this.BACKEND_HOST}/user/update-password/${id}/`, { password: password }, { headers: header });
  }

  getById(pk: number): Observable<any> {
    return this.request.get<any>(`${this.BACKEND_HOST}/user/get/by-id/${pk}/`);
  }

  getByUsername(username: string): Observable<any> {
    return this.request.get<any>(`${this.BACKEND_HOST}/user/get/by-username/${username}/`);
  }

  checkIsExistUsername(username: string, id: number | null): Observable<boolean> {
    const body: any = { username: username };
    if (id !== null) body['id'] = id;
    return this.request.post<boolean>(`${this.BACKEND_HOST}/user/isexist-username/`, body);
  }

  getAll(): Observable<any> {
    return this.request.get<any>(`${this.BACKEND_HOST}/user/get/all/`);
  }

  delete(pk: number | undefined): Observable<any> {
    return this.request.delete<any>(`${this.BACKEND_HOST}/user/delete-profile/${pk}/`);
  }


  uniqueUsernameValidator(id: number | null = null, delay: number = 0): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      // return control.valueChanges.pipe(
      //   debounceTime(delay),
      //   switchMap((value) => {
      //     const val = this.checkIsExistUsername(value, id);
      //     return val;
      //   }),
      //   map((isExist: boolean) => {
      //     const val = isExist ? { uniqueUsername: true } : null;
      //     return val;
      //   }),
      //   catchError(() => of(null)) // Handle any errors and return null (no error)
      // );

      return this.checkIsExistUsername(control.value, id).pipe(
        distinctUntilChanged(),
        switchMap((value) => of(value)),
        map((isExist: boolean) => {
          const val = isExist ? { uniqueUsername: true } : null;
          return val;
        })
      );










    }
  }

  /*uniqueUsernameValidator(id: number | null = null, delay: number = 0): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      return this.checkIsExistUsername(control.value, id).pipe(debounceTime(delay)).pipe(
        distinctUntilChanged(),
        map((isExist: boolean) => (isExist ? { uniqueUsername: true } : null)),
        catchError(() => of(null)) // Handle any errors and return null (no error)
      );
      // return control.valueChanges.pipe(
      //   debounceTime(delay),
      //   distinctUntilChanged(),
      //   switchMap((value) => this.checkIsExistUsername(value, id)),
      //   map((isExist: boolean) => (isExist ? { uniqueUsername: true } : null)),
      //   catchError(() => of(null)) // Handle any errors and return null (no error)
      // );
    }
  }*/
}


//POST http://localhost:8080/user/create-profile/
//GET http://localhost:8080/user/get/by-id/{id}/
//GET http://localhost:8080/user/get/by-username/{username}/
//GET http://localhost:8080/user/get/isexist-username/{username}/
//GET http://localhost:8080/user/get/all/
//PUT http://localhost:8080/user/update-profile/{id}/
//PUT http://localhost:8080/user/update-password/{id}/
//PUT http://localhost:8080/user/update-activestatus/1/?is_active=true
//DELETE http://localhost:8080/user/delete-profile/1/



// How to Access on XML element and How to access Json Element?
// What is Database. Wḥat are the different types of database available.
// What is class and Object.
// Whats Object of Objects.
// What is an Use Case diagram? Sequence diagram? Class diagram? ER diagram? Flow diagram?
// How to identiy a process in Flowchart? How to draw a flow chart?
// What are basic CRUD Operations? How to Perform all hose operation in general?
// What are different datatypes possible in any Programming Languages. Idetify them and find the difference especially enum, string, varchar, integer, numbers, char, float, double.
// What is a Data Structure? Why it is used for? What are the different data structure elements available? Arrays, List, Queues, Trees.
// What are variables? What are type of variables available in a programming language
// What is a recursive function? what is the importance of recursive functions.