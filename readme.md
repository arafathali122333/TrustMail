# 📧 Email Service API

A **secure, fast, and efficient** Node.js-based email service with **attachment support**, **email validation**, and **trusted email filtering**.

## 🚀 Features

✅ **Send Emails** with attachments (PDF, Images, Office files, ZIP).  
✅ **Validate Emails** using a custom trust check.  
✅ **AJV-based Schema Validation** with detailed error messages.  
✅ **Multer for File Uploads** from env config.
✅ **Cliq** for production issues alert.  
![413937912-b6ba29df-6668-4e7c-bded-bf796c7abd4c](https://github.com/user-attachments/assets/8c03bd0a-b6b6-4d76-af1a-d03280387938)

## ⚙️ Configuration  

Create a `.env` file and add the required configurations:  

```ini
EMAIL_PASS=GOOGLE_APP_PSW
EMAIL_USER=GMAIL
QUICKEMAIL_BASE_DOMAIN=api.quickemailverification.com
QUICKEMAIL_API_KEY=
ATTACHMENT_SIZE_LIMIT_BYTES=
ATTACHMENT_LIMIT=3
ALERT_500_CHAT_ID=CLIQ_CHAT_ID
CLIQ_BASE_DOMAIN=CLIQ_BASE_DOMAIN
CLIQ_ENTRY_TOKEN=Directly provide your CLIQ ACCESS TOKEN.
**Note:** You need to modify the getCliqToken function to return process.env.CLIQ_ENTRY_TOKEN in /services/alert500.js.
CLIQ_BOT_LOGO_URL=ANY_IMAGE_LINK
SMTP_HOST=SMTP_HOST
SMTP_PORT=SMTP_PORT
```

## 🛠️ Technologies Used

- **Node.js & Express.js** – Backend framework
- **Multer** – File uploads
- **AJV** – Request validation
- **Nodemailer** – Email sending
- **dotenv** – Environment variables

## 🔒 Security Measures

- **File type validation:** Prevents malicious file uploads.
- **Input validation:** Ensures structured data before processing.
- **Global error handling:** Catches and logs all errors.
- **Cliq Integration:** We use cliq For Production Issues Alert Bot.
- **IP Throttling & Others:** Its handle our serverless function.


## 📬 Contact & Support

If you have any issues or suggestions, feel free to **open an issue** or **contact us** at `arafathalitech@gmail.com`.  

🚀 **Happy Coding!** 🎉
