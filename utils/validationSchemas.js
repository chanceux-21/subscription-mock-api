const Joi = require('joi');

exports.userSchema = Joi.object({
  email: Joi.string().email().required(),
  account_type: Joi.string().valid('carrier', 'shipper').required()
});

exports.subscriptionSchema = Joi.object({
  user_id: Joi.number().integer().min(1).required(),
  tariff: Joi.string().valid('basic', 'pro', 'premium').required()
});