module.exports = {
    baseURL: process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000',
    FRONTEND_URL: process.env.NODE_ENV === 'production' ? 'https://ft-choir-portal.firebaseapp.com' : 'http://localhost:3000',
    ALLOWED_STATUS:  [
        "active",
        "inactive",
        "suspended",
    ],
    ONBBOARDING_MESSAGE: `
        Dear Friend,
        <br />
            Use the link below and password to login to the choir portal
        <br />
        <br />
        Email: this email address
        Password: 123456
        <br />

        Stay blessed, <br />
        FTC Team                            
  `,
}