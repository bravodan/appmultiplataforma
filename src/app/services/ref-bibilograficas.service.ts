import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IRefBibliografica } from '../models/ref-bibliograficas';

@Injectable({
  providedIn: 'root'
})
export class RefBibilograficasService {
  path = "RefBibliograficas/";

  referenciaBibliografica: IRefBibliografica = undefined;

  constructor(public fireStore:AngularFirestore) { }

  getAll(idUsuario: string): Observable<IRefBibliografica[]>{
    const itemCollection = this.fireStore.collection<IRefBibliografica>("Users/"+idUsuario+"/"+this.path);
    return itemCollection.valueChanges();
  }

  add(item: IRefBibliografica, idUsuario: string){
    const itemCollection = this.fireStore.collection<IRefBibliografica>("Users/"+idUsuario+"/"+this.path);
    return itemCollection.doc(item.idReferencia).set(item);
  }

  update(item: IRefBibliografica, idUsuario:string){
    const itemCollection = this.fireStore.collection<IRefBibliografica>("Users/"+idUsuario+"/"+this.path);
    return itemCollection.doc(item.idReferencia).update(item);
  }

  createId(){
    return this.fireStore.createId();
  }

  delete(id: string, idUsuario){
    const itemDelete = this.fireStore.doc("Users/"+idUsuario+"/"+this.path + id).delete();
    return itemDelete;
  }

  set(referenciaBibliografica: IRefBibliografica){
    this.referenciaBibliografica = referenciaBibliografica;
  }

  get(): IRefBibliografica{
    return this.referenciaBibliografica;
  }
}
