const multer = require("multer"),
fileSize = parseInt(process.env.ATTACHMENT_SIZE_LIMIT_BYTES), // (eg:) 5 * 1024 * 1024 => 5MB
attachmentLimit = parseInt(process.env.ATTACHMENT_LIMIT);

const multerUpload = multer({
    limits: { fileSize: fileSize },
    fileFilter: (req, file, cb) => {
        const allowedTypes = [
            "application/pdf",                // PDF
            "image/png", "image/jpeg",        // Images (PNG, JPG, JPEG)
            "text/plain",                     // TXT
            "application/msword",             // DOC
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // DOCX
            "application/vnd.ms-excel",       // XLS
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // XLSX
            "application/vnd.ms-powerpoint",  // PPT
            "application/vnd.openxmlformats-officedocument.presentationml.presentation", // PPTX
            "application/zip",                // ZIP
            "application/x-zip-compressed"    // Alternative ZIP MIME
        ];
        
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true); // Accept file
        } else {
            cb(new Error("Unsupported file format. Allowed: TXT, PNG, JPG, DOC(X), XLS(X), PPT(X), PDF, ZIP."), false);
        }
    }
}).array("attachments", attachmentLimit);

// Wrap Multer with Error Handling
const multerSchema = (req, res, next) => {
    multerUpload(req, res, (err) => {
        if (err) {
            if (err.code === "LIMIT_FILE_SIZE") {
                return res.status(413).json({ message: "File too large. Max size is " + fileSize + " bytes." });
            }
            return res.status(400).json({ message: err.message });
        }
        next();
    });
};

const validateEmailSchema = {
    type: "object",
    properties: {
        email: {
            type: "string",
            format: "email",
            maxLength: 255,
            errorMessage: {
                maxLength: "Email must be at most 255 characters."
            }
        }
    },
    required: ["email"],
    additionalProperties: false
};

const sendEmailSchema = {
    type: "object",
    properties: {
        org_name: { type: "string", minLength: 1, maxLength: 100, errorMessage: "Organization name is required and should be at most 100 characters." },
        is_need_validation: { type: "string", pattern: "^(true|false)$", minLength: 1, maxLength: 5, errorMessage: "is_need_validation node must be boolean."},
        to: { 
            type: "string", 
            format: "email", 
            maxLength: 255,
            errorMessage: {
                maxLength: "Email must be at most 255 characters."
            }
        },
        subject: { type: "string", minLength: 1, maxLength: 200, errorMessage: "Subject is required and should be at most 200 characters." },
        text: { type: "string", minLength: 1, maxLength: 100000, errorMessage: "Text content must be at most 5000 characters." },
        html: { type: "string", minLength: 1, maxLength: 1000000, errorMessage: "HTML content must be at most 10000 characters." }
    },
    required: ["org_name", "to", "subject"],
    additionalProperties: false
};

module.exports= {multerSchema, validateEmailSchema, sendEmailSchema};