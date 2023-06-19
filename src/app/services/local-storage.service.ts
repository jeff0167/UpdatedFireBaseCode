import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver'; // npm i localforage-cordovasqlitedriver

const STORAGE_KEY = 'pirates';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(private storage: Storage) { }

  async init(){
    await this.storage['defineDriver'](CordovaSQLiteDriver);
    await this.storage['create']();
  }

  getAllPirates() {
    return this.storage['get'](STORAGE_KEY);
    }

    isFavorite(id: number) {
    return this.getAllPirates().then((result: number[]) => {
    return result && result.indexOf(id) !== -1;
    });
    }

    favoritePirate(id: number) {
      return this.getAllPirates().then((result: any[]) => {
      if (result) {
      result.push(id);
      return this.storage['set'](STORAGE_KEY, result);
      } else {
      return this.storage['set'](STORAGE_KEY, [id]);
      }
      });
    }
    
    unfavoriteFilm(id: number) {
    return this.getAllPirates().then((result: any[]) => {
    if (result) {
    var index = result.indexOf(id);
    result.splice(index, 1);
    return this.storage['set'](STORAGE_KEY, result);
    }
    return null
    });
  }
}
