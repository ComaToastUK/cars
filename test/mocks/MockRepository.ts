import { Repository } from '../../src/repositories/Repository'
import { Car } from '../../src/models/Car'

export class MockRepository implements Repository<Car> {
    private _collection: Array<Car>

    constructor() {
        this._collection = []
    }

    async find(): Promise<Car[]> {
        return this._collection
    }

    async findOne(id: string): Promise<Car | null> {
        const exists = this._collection.some(car => car.id === id)
        if (exists) {
            for (let i = 0; i < this._collection.length; i++) {
                if (this._collection[i].id === id) {
                    return this._collection[i]
                }
            }
        }
        return null
    }

    async create(car: Car): Promise<boolean> {
        this._collection.push(car)
        return true
    }

    async delete(id: string): Promise<boolean> {
        const exists = this._collection.some(car => car.id === id)
        if (exists) {
            for (let i = 0; i < this._collection.length; i++) {
                if (this._collection[i].id === id) {
                    this._collection.splice(i)
                    return true
                }
            }
        }
        return false
    }
}