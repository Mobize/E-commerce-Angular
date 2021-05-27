import { Result } from './../model/result';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Users } from './../model/users';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  user: Users;
  isAuth = localStorage.getItem('userAuth') == 'true' ? true : false;
  userSubject = new Subject<Users>();

  constructor(private http: HttpClient) { }

  emitUsers(): void {
    this.userSubject.next(this.user);
  }

  authentifier(newUser: Users) {
    return new Promise(
      (resolve, reject) => {
        const url = `${environment.api + 'authentifier.php?API_KEY=' + environment.api_key}` + '&email=' + newUser.email +
        '&password=' + newUser.password;
        this.http.get(url).subscribe(
          (data: Result) => {
            if(data.status === 200) {
              this.user = data.result;
              this.isAuth = true;
              localStorage.setItem('userAuth',this.isAuth.toString())
              this.emitUsers();
              resolve(data.result);
            } else {
              console.log(data.result);
              reject(data);
            }
          }, (error) => {
            console.log('Erreur: ' + error);
            reject(false);
          }
        );
      }
    );
  }

  createUser(newUser: Users) {

    console.log(newUser);

    return new Promise(
      (resolve, reject) => {
        const url = `${environment.api + 'createUsers.php?API_KEY=' + environment.api_key}` +
        '&email=' + newUser.email + '&password=' + newUser.password + '&sexe=' + newUser.sexe +
        '&firstname=' + newUser.firstname + '&lastname=' + newUser.lastname + '&dateBirth=' +
        newUser.dateBirth + '&pseudo=' + newUser.pseudo;
        this.http.get(url).subscribe(
          (data: Result) => {
            if (data.status === 200) {
              this.user = data.result;
              this.isAuth = true;
              resolve(data.result);
            } else {
              reject(data);
            }
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  logout(): void {
    this.user = null;
    this.isAuth = false;
    localStorage.setItem('userAuth', this.isAuth.toString())
    this.userSubject = new Subject<Users>();
  }
}
