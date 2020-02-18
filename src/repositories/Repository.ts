export interface Repository<T> {
    find(): Promise<T[]>;
    findOne(id: string): Promise<T | null>;
    create(entity: T): Promise<boolean>;
    delete(id: string): Promise<boolean>;
    update(entity: T, id: string): Promise<boolean>;
}
  