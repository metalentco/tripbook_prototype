import {Base} from "../models/base";
import {LocalStorageKeyUndefinedException} from "../exceptions/local-storage-key-undefined.exception";

export abstract class Repository<T extends Base> {

  protected key: string | undefined;

  count(): number {
    return this.findAll().length;
  }

  exists(uid: string): boolean {
    return this.findById(uid) !== null;
  }

  save(entity: T): T {
    let trips: Array<T> = this.findAll();
    trips.push(entity);
    this.saveBatchToLocalStorage(trips);
    return entity;
  }

  findAll(): Array<T> {
    let trips: string | null = this.fetchFromLocalStorage();
    return trips === null ? [] : JSON.parse(trips);
  }

  findById(uid: string): T | null {
    let trip: T | undefined = this.findAll().find((t: T) => t.uid === uid);
    return trip === undefined ? null : trip;
  }

  modify(entity: T): T {
    let entities: Array<T> = this.findAll();
    this.saveBatchToLocalStorage(entities.map((t: T): T => t.uid === entity.uid ? entity : t));
    return entity;
  }

  delete(entity: T): void {
    let entities: Array<T> = this.findAll();
    this.saveBatchToLocalStorage(entities.filter((t: T): boolean => t.uid !== entity.uid));
  }

  deleteAll(): void {
    this.removeFromLocalStorage();
  }

  protected saveBatchToLocalStorage(e: Array<T>): void {
    if (this.key === undefined) {
      throw new LocalStorageKeyUndefinedException();
    }
    localStorage.setItem(this.key, JSON.stringify(e));
  }

  protected fetchFromLocalStorage(): string | null {
    if (this.key === undefined) {
      throw new LocalStorageKeyUndefinedException();
    }
    return localStorage.getItem(this.key);
  }

  protected removeFromLocalStorage(): void {
    if (this.key === undefined) {
      throw new LocalStorageKeyUndefinedException();
    }
    localStorage.removeItem(this.key);
  }
}