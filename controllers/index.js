const express = require("express");
const {multerSchema, validateEmailSchema, sendEmailSchema} = require("../schema");
const { isTrustedEmail } = require("../utils/email");
const { sendEmail } = require("../services/sendEmail");
const validateRequest = require("./validate");
const {post500Alert} = require("../services/alert500");

const router = express.Router();

//Validate email API
router.post("/validate",  validateRequest(validateEmailSchema), async (req, res, next) => {
    try{
        let isValid = await isTrustedEmail(req.body.email);
        res.status(200).json({ message: "Email Verified Successfully!", is_valid: isValid });
    }
    catch (error) {
        next(error);
    }
});

//Send email API with attachments
router.post("/send", multerSchema, validateRequest(sendEmailSchema), async (req, res, next) => {
    try {
        // Check email validity
        const isNeedValidation = req.body.is_need_validation;
        if(isNeedValidation === "true"){
            const isValidEmail = await isTrustedEmail(req.body.to); 
            if (!isValidEmail) {
                return res.status(422).json({ message: "Email is not trusted" });
            }
        }

        const { org_name, to, subject, text, html } = req.body;
        const attachments = req.files;

        // Send email
        const result = await sendEmail({ org_name, to, subject, text, html, attachments });
        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

// Global Error Handling Middleware
router.use(async (err, req, res, next) => {
    console.error("Global Error Handler:", err);
    await post500Alert(req, err);
    res.status(500).json({ message: "Internal Server Error" });
});

module.exports = router;
