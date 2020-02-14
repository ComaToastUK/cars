import { Guid } from 'guid-typescript'

export class Car {
    private _id: Guid

    constructor(
        private _make: string,
        private _model: string,
        private _colour: string,
        private _year: string,
    ) { 
        this._id = Guid.create()
    }

    get id(): Guid {
        return this._id
    }

    get make(): string {
        return this._make
    }

    get model(): string {
        return this._model
    }

    get colour(): string {
        return this._colour
    }

    get year(): string {
        return this._year
    }
}