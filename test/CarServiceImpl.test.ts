import { Car } from '../src/models/Car'
import { CarServiceImpl } from '../src/services/CarServiceImpl'
import { Repository } from '../src/repositories/Repository'
import { MockRepository } from './mocks/MockRepository'

describe('CarServiceImpl', () => {
    let mockRepository: Repository<Car>
    let carServiceImpl: CarServiceImpl
    let cars: Car[]

    describe('createCar', () => {
        beforeEach(() => {
            mockRepository = new MockRepository()
            carServiceImpl = new CarServiceImpl(mockRepository)
            cars = [
                new Car('Ford', 'Focus', 'Blue', '2019'),
                new Car('BMW', 'M3', 'Red', '2020'),
                new Car('Jaguar', 'XF', 'Black', '2018')
            ]
        })

        it('Adds a Car object to the repository', async () => {
            const result = await carServiceImpl.createCar(cars[0])
            expect(result).toEqual(true) 
            expect(await mockRepository.findOne(cars[0].id)).toEqual(cars[0])
        })
    })

    describe('getCars', () => {
        it('gets all cars in the repository', async () => {
            mockRepository = new MockRepository()
            cars = [
                new Car('Ford', 'Focus', 'Blue', '2019'),
                new Car('BMW', 'M3', 'Red', '2020'),
                new Car('Jaguar', 'XF', 'Black', '2018')
            ]
            mockRepository.create(cars[0])
            mockRepository.create(cars[1])
            mockRepository.create(cars[2])
            carServiceImpl = new CarServiceImpl(mockRepository)

            const result = await carServiceImpl.getCars()
            expect(result).toEqual(cars)
        })

        it('returns an empty array if there are no cars in the database', async () => {
            mockRepository = new MockRepository()
            carServiceImpl = new CarServiceImpl(mockRepository)
            const result = await carServiceImpl.getCars()
            expect(result).toEqual([])
        })
    })

    describe('getCarById', () => {
        beforeEach(() => {
            mockRepository = new MockRepository()
            cars = [
                new Car('Ford', 'Focus', 'Blue', '2019'),
                new Car('BMW', 'M3', 'Red', '2020'),
                new Car('Jaguar', 'XF', 'Black', '2018')
            ]
            mockRepository.create(cars[0])
            mockRepository.create(cars[1])
            mockRepository.create(cars[2])
            carServiceImpl = new CarServiceImpl(mockRepository)
        })

        it('gets a single car based on its id', async () => {
            const result = await carServiceImpl.getCarById(cars[2].id)
            expect(result).toEqual(cars[2])
        })

        it('returns null if the car does not exist', async () => {
            const result = await carServiceImpl.getCarById('12345')
            expect(result).toEqual(null)
        })
    })

    describe('deleteCar', () => {
        beforeEach(() => {
            mockRepository = new MockRepository()
            cars = [
                new Car('Ford', 'Focus', 'Blue', '2019'),
                new Car('BMW', 'M3', 'Red', '2020'),
                new Car('Jaguar', 'XF', 'Black', '2018')
            ]
            mockRepository.create(cars[0])
            mockRepository.create(cars[1])
            mockRepository.create(cars[2])
            carServiceImpl = new CarServiceImpl(mockRepository)
        })

        it('removes a single car from the repository based on its id', async () => {
            const result = await carServiceImpl.deleteCar(cars[2].id)
            expect(result).toEqual(true)
            expect(await mockRepository.find()).toEqual([cars[0],cars[1]])
        })
    })
})