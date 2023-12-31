import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';
import { Pirate } from '../interfaces/pirate';

@Injectable({
  providedIn: 'root'
})
export class PirateFBService {

  collectionName: string = 'Pirate';

  constructor(private fs:Firestore) { }

  getPirates(){
    let pirateCollection = collection(this.fs, this.collectionName);
    return collectionData(pirateCollection, {idField: "id"});
  }

  addPirate(pirate: Pirate) {
    let data = {name: pirate.name, age: pirate.age, pirateCrew: pirate.pirateCrew};
    let pirateCollection = collection(this.fs, this.collectionName);
    return addDoc(pirateCollection, data);
  }

  updatePirate(_id: string, pirate: Pirate){
    let data = {name: pirate.name, age: pirate.age, pirateCrew: pirate.pirateCrew};
    let docRef=doc(this.fs, this.collectionName + "/" + _id);
    return updateDoc(docRef, data); 
  }

  deletePirate(id: string) {
    let docRef=doc(this.fs, this.collectionName + "/" + id);
    return deleteDoc(docRef);
  }

}
