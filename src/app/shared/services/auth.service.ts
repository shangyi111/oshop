import { ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import * as firebase from 'firebase';
import { UserService } from './user.service';
import { switchMap, map} from 'rxjs/operators'; 
import { AppUser} from './../models/app-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$:Observable<firebase.User>;

  constructor( 
          private userService: UserService,
          private afAuth: AngularFireAuth,
  				private route: ActivatedRoute) { 
  	this.user$ = afAuth.authState;
  }
  login(){
  	let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
  	localStorage.setItem('returnUrl',returnUrl);
  	this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }
  logout(){
  	this.afAuth.signOut();
  }

  get appUser$():Observable<AppUser>{
    return this.user$
    .pipe(switchMap(user=>{
      if(user) return this.userService.get(user.uid);

      return of(null);
    }));
  }

}
