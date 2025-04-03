const Ajv = require("ajv");
const ajvFormats = require("ajv-formats");
const ajvErrors = require("ajv-errors");

const ajv = new Ajv({ allErrors: true, async: true, strict: false });
ajvFormats(ajv);
ajvErrors(ajv);


//Middleware to Validate Requests
const validateRequest = (schema) => {
    return async (req, res, next) => {
        try {
            const validate = ajv.compile(schema);
            const valid = await validate(req.body);
            if (!valid) {
                return res.status(400).json({
                    message: validate.errors[0].message
                });
            }

            next();
        } catch (error) {
            next(error);
        }
    };
};

module.exports = validateRequest;
