import { Car } from '../models/Car'

export interface CarService {
    getCars(): Promise<Car[]>;
    getCarById(id: string): Promise<Car | null>;
    createCar(car: Car): Promise<boolean>;
    deleteCar(id: string): Promise<boolean>;
    updateCar(car: Car, id: string): Promise<boolean>;
}