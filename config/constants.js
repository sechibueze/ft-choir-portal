module.exports = {
    baseURL: process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000',
    FRONTEND_URL: process.env.NODE_ENV === 'production' ? 'https://ft-choir-portal.firebaseapp.com' : 'http://localhost:3000',
    ALLOWED_STATUS:  [
        "active",
        "inactive",
        "suspended",
    ],
    ADMIN_EMAIL: "ftc@gmail.com"
}