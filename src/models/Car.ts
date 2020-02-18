import { Guid } from 'guid-typescript'

export class Car {
    private id: string

    constructor(
        private make: string,
        private model: string,
        private colour: string,
        private year: string,
    ) { 
        this.id = Guid.create().toString()
    }

    get getId(): string {
        return this.id
    }

    set setId(id: string) {
        this.id = id
    }

    get getMake(): string {
        return this.make
    }

    get getModel(): string {
        return this.model
    }

    get getColour(): string {
        return this.colour
    }

    get getYear(): string {
        return this.year
    }
}