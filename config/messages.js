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