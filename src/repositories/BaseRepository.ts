import { Guid } from 'guid-typescript'
import { Repository } from './Repository'
import { Collection, Db, InsertWriteOpResult } from 'mongodb'

export abstract class BaseRepository<T> implements Repository<T> {
  public readonly _collection: Collection

  constructor(db: Db, collectionName: string) {
    this._collection = db.collection(collectionName)
  }

  async create(entity: T): Promise<boolean> {
    const result: InsertWriteOpResult<any> = await this._collection.insert(entity)
    return !!result.result.ok
  }

  async delete(id: Guid): Promise<boolean> {
    const result = await this._collection.findOneAndDelete({ _id: id.toString() })
    return !!result.ok
  }

  async find(): Promise<T[]> {
    return await this._collection.find().toArray()
  }

  async findOne(id: Guid): Promise<T | null> {
    return await this._collection.findOne({ _id: id.toString() })
  }
}