import 'reflect-metadata'
import request from 'supertest'
import { AppBuilder } from '../src/app'
import { Controller } from '../src/controllers/Controller'
import { CarController } from '../src/controllers/CarController'
import { Application } from 'express'
import { Container } from 'inversify'
import { MockCarService } from './mocks/MockCarService'
import { CarService } from '../src/services/CarService'

let app: Application
let container: Container

describe('Post Endpoints', () => {

    beforeEach(() => {
        container = new Container()
        container.bind<Controller>('Controller').to(CarController)
        container.bind<CarService>('CarService').to(MockCarService)
        app = new AppBuilder(container).build()
    })

    describe('/cars validation', () => {

        it('should return 400 bad request when car is missing mandatory fields', async () => {

            const reqBody = {
                make: 'Ford',
                model: 'Focus',
                colour: 'Blue',
            }

            const res = await request(app)
                .post('/cars')
                .send(reqBody)
            expect(res.status).toEqual(400)
            expect(res.text).toContain('Bad Request')
        })

        it('should return 200 ok when car is valid', async () => {

            const reqBody = {
                make: 'Ford',
                model: 'Focus',
                colour: 'Blue',
                year: '2020'
            }
            
            const res = await request(app)
                    .post('/cars')
                    .send(reqBody)
                expect(res.status).toEqual(200)
                expect(res.text).toContain('{\"make\":\"Ford\",\"model\":\"Focus\",\"colour\":\"Blue\",\"year\":\"2020\",\"id\":')
        })
    })
})