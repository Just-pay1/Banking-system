import Joi from 'joi';

export const createAccountSchema = Joi.object({
  user_id: Joi.string(),
  account_type: Joi.string().valid('merchant', 'user').required(),
  balance: Joi.number().min(0).required(),
  status: Joi.string().valid('active', 'not').required(),
});

export const UpdateAccountSchema = Joi.object({
  account_type: Joi.string().valid('merchant', 'user').required(),
  balance: Joi.number().min(0).required(),
  status: Joi.string().valid('active', 'not').required(),
});