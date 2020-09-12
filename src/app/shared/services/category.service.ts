import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db:AngularFireDatabase) { }
  getAll(){
  	this.db.list('/categories',query => query.orderByChild('name'))
  	// .snapshotChanges().subscribe((c) => {
  	// 	console.log(c);
  	// });
  	return this.db.list('/categories',query => query.orderByChild('name'))
  	.snapshotChanges()
  }
}
