const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

// Custom URL Validator

const validateURL = (value, helpers) => {
  if (validator.isURL(value, { require_protocol: true })) {
    return value;
  }
  return helpers.error("string.uri", { value });
};

// Clothing Item Validation
const validateClothingItem = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2 characters.',
      "string.max": 'The maximum length of the "name" field is 30 characters.',
      "string.empty": 'The "name" field must not be empty.',
    }),
    imageUrl: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" field must not be empty.',
      "string.uri": 'The "imageUrl" field must be a valid URL.',
    }),
    weather: Joi.string().valid("hot", "warm", "cold").required().messages({
      "any.only": 'The "weather" field must be one of: hot, warm, cold.',
      "string.empty": 'The "weather" field must not be empty.',
    }),
  }),
});

// User Registration Validation

const validateUserRegistration = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required().messages({
      "string.min": 'The minimum length of the "name" field is 2 characters.',
      "string.max": 'The maximum length of the "name" field is 30 characters.',
      "string.empty": 'The "name" field must not be empty.',
    }),
    avatar: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "avatar" field must not be empty.',
      "string.uri": 'The "avatar" field must be a valid URL.',
    }),
    email: Joi.string().required().email().messages({
      "string.empty": 'The "email" field must not be empty.',
      "string.email": 'The "email" field must be a valid email address.',
    }),
    password: Joi.string().required().min(6).messages({
      "string.empty": 'The "password" field must not be empty.',
      "string.min": 'The "password" field must be at least 6 characters long.',
    }),
  }),
});

// User Login Validation

const validateUserLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.empty": 'The "email" field must not be empty.',
      "string.email": 'The "email" field must be a valid email address.',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "password" field must not be empty.',
    }),
  }),
});

// 5. ID Validation for Params

// This validates IDs passed in `req.params` for both user and item endpoints.
const validateId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required().messages({
      "string.hex": 'The "id" must be a valid hexadecimal string.',
      "string.length": 'The "id" must be exactly 24 characters long.',
      "string.empty": 'The "id" field must not be empty.',
    }),
  }),
});

// Validate Clothing Item ID (Separate for clarity)
const validateItemId = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().hex().length(24).required().messages({
      "string.hex": 'The "itemId" must be a valid hexadecimal string.',
      "string.length": 'The "itemId" must be exactly 24 characters long.',
      "string.empty": 'The "itemId" field must not be empty.',
    }),
  }),
});

// Query Parameter Validation

const validateQueryParams = celebrate({
  query: Joi.object().keys({
    page: Joi.number().integer().min(1).optional().messages({
      "number.base": 'The "page" parameter must be a number.',
      "number.min": 'The "page" parameter must be at least 1.',
    }),
    limit: Joi.number().integer().min(1).optional().messages({
      "number.base": 'The "limit" parameter must be a number.',
      "number.min": 'The "limit" parameter must be at least 1.',
    }),
  }),
});

// User Update Validation (PATCH /me)
const validateUserUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required().messages({
      "string.min": 'The minimum length of the "name" field is 2 characters.',
      "string.max": 'The maximum length of the "name" field is 30 characters.',
      "string.empty": 'The "name" field must not be empty.',
    }),
    avatar: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "avatar" field must not be empty.',
      "string.uri": 'The "avatar" field must be a valid URL.',
    }),
  }),
});

// Export All Validators

module.exports = {
  validateURL,
  validateClothingItem,
  validateUserRegistration,
  validateUserLogin,
  validateId,
  validateItemId,
  validateQueryParams,
  validateUserUpdate,
};
