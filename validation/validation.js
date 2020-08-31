const Joi = require("@hapi/joi")

const profileValidation = (data) => {
    const schema = {
        userName: Joi.string()
            .min(6)
            .required(),
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        phoneNumber: Joi.string()
            .min(6)
            .required()
    };
    return Joi.validate(data, schema);
}

const passwordValidation = (data) => {
    const schema = {
        current_password: Joi.string()
            .min(6)
            .max(15)
            .required(),
        password: Joi.string().required(),
        confirmPassword: Joi.any().valid(Joi.ref('password')).required().options({ language: { any: { allowOnly: 'must match password' } } })
    };
    return Joi.validate(data, schema);
}

const addUsersValidation = (data) => {
    const schema = {
        userName: Joi.string()
            .min(6)
            .required(),
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        phoneNumber: Joi.string()
            .empty(''),
        userId: Joi.string()
            .empty(''),
        _csrf: Joi.string()
            .empty(''),
        password: Joi.string()
            .min(6)
            .max(15)
            .required(),
        role: Joi.string()
            .required(),
    };
    return Joi.validate(data, schema);
}

const rolesValidation = (data) => {
    const schema = {
        role: Joi.string()
            .min(2)
            .required(),
        _csrf: Joi.string()
            .empty(''),
        roleId: Joi.string()
            .empty(''),
    };
    return Joi.validate(data, schema);
}

const categoryValidation = (data) => {
    const schema = {
        name: Joi.string()
        .empty(''),
            image: Joi.string()
            .empty(''),
        _csrf: Joi.string()
            .empty(''),
    };
    return Joi.validate(data, schema);
}

module.exports = {
    profileValidation: profileValidation,
    passwordValidation: passwordValidation,
    addUsersValidation: addUsersValidation,
    rolesValidation: rolesValidation,
    categoryValidation: categoryValidation,
}