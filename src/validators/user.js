import Joi from 'joi';

const username = Joi.string();
const password = Joi.string().min(6);

const register = Joi.object({
  body: Joi.object().keys({
    username: username.required(),
    password: password.required(),
  }),
});

const login = Joi.object({
  body: Joi.object().keys({
    username: username.required(),
    password: password.required(),
  }),
});

export default {
  register,
  login,
};
