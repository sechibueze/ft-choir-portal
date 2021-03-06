module.exports.getPasswordRestLinkMessage = function (firstname, link) {
    const HTMLmessage = `
    Dear ${firstname },
    <br />
    <br />
    You are receiving this email because you have requested to reset your password for FTC portal,
    Please, click on the link below to reset your password or copy the link and paste in your browser,
    <br />
    <br />

    <a href="${link}" 
      style="text-decoration: none;padding: 1rem 2.25rem; font-size: 1.2rem; font-weight: 900; background-color: red; color: white; margin: auto; text-align: center; display: block; width: 80%;"
    > Reset Password </a>
    <br />
    <br />

    ${ link }

    <br />
    <br />

  Stay blessed, <br />
  FTC Team
  `

  return HTMLmessage
}

module.exports.getOnboardingMessage = function () {
  const ONBBOARDING_MESSAGE = `
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
  `;
  return ONBBOARDING_MESSAGE;
}