import { BaseRepository } from './BaseRepository'
import { Db } from 'mongodb'

export class CarRepository<T> extends BaseRepository<T> {
    constructor(db: Db) {
        super(db, 'cars')
    }
}