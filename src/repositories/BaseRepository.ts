import { Repository } from './Repository'
import { Collection, Db, InsertWriteOpResult, DeleteWriteOpResultObject } from 'mongodb'
import { inject, injectable, unmanaged } from 'inversify'

@injectable()
export abstract class BaseRepository<T> implements Repository<T> {
  public readonly _collection: Collection

  constructor(@inject('Db') db: Db, @unmanaged() collectionName: string) {
    this._collection = db.collection(collectionName)
  }

  async create(entity: T): Promise<boolean> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: InsertWriteOpResult<any> = await this._collection.insert(entity)
    return !!result.result.ok
  }

  async delete(id: string): Promise<boolean> {
    const result: DeleteWriteOpResultObject = await this._collection.deleteOne({ _id: id })
    return !!result.result.ok
  }

  async find(): Promise<T[]> {
    return await this._collection.find().toArray()
  }

  async findOne(id: string): Promise<T | null> {
    return await this._collection.findOne({ _id: id })
  }
}