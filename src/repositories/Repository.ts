import { Guid } from 'guid-typescript'

export interface Repository<T> {
    find(): Promise<T[]>;
    findOne(id: Guid): Promise<T | null>;
    create(entity: T): Promise<boolean>;
    delete(id: Guid): Promise<boolean>;
}
  