import Joi from 'joi'

export default {
    body: {
        make: Joi.string().required(),
        model: Joi.string().required(),
        colour: Joi.string().required(),
        year: Joi.string().required()
    }
}