"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newEnrollmentCoordinatorAccountEmailTemplate = void 0;
const constants_1 = require("../../../constants");
const logger_1 = require("../../../utils/logger");
const newEnrollmentCoordinatorAccountEmailTemplate = ({ email, firstName, lastName }, pwd) => {
    const query = {
        Destination: {
            ToAddresses: [email],
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: `
              <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
              <html xmlns="http://www.w3.org/1999/xhtml">
    
              <head>
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                <title>New visit submission!</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              </head>
    
              <body>
                <table bgcolor="#ffffff" align="center" border="0" cellpadding="0" cellspacing="0" width="650">
                  <tr>
                    <td style="font-family:Helvetica,Arial,sans-serif; font-size: 0; line-height: 0;" height="20">&nbsp;</td>
                  </tr>
                  <tr>
                    <td align="center"><img src="https://honeydew-prod.s3.amazonaws.com/logo.jpg" alt="Logo"></td>
                  </tr>
                  <tr>
                    <td>
                      <table style="padding: 30px 40px 30px 40px;">
                        <tr>
                          <td style="font-family:Helvetica,Arial,sans-serif; font-size: 24px; line-height: 24px;">Thanks for joining Honeydew!</td>
                        </tr>
                        <tr>
                          <td style="font-size: 0; line-height: 0;" height="20">&nbsp;</td>
                        </tr>
                        <tr>
                          <td style="font-family:Helvetica,Arial,sans-serif; font-size: 16px; line-height: 24px;">
                            Welcome to our Honeydew team!<br />
                            Name: ${firstName} ${lastName} <br />
                            Temporary password: ${pwd} <br />
                            To access your dashboard <a href='${constants_1.ACNE_APP_URL}' target='_blank'>click here</a> <br />
                          </td>
                        </tr>
                        <tr>
                          <td style="font-size: 0; line-height: 0;" height="20">&nbsp;</td>
                        </tr>
                        <tr>
                          <td style="font-family:Helvetica,Arial,sans-serif; font-size: 14px; line-height: 18px;">- Your dedicated care team</td>
                        </tr>
                        <tr>
                          <td style="font-size: 0; line-height: 0;" height="20">&nbsp;</td>
                        </tr>
                        <tr>
                          <td style="font-family:Helvetica,Arial,sans-serif; font-size: 12px; line-height: 16px;">Please do not reply to this email, as we are unable to respond from this email address. If you need
                            help or
                            would like to contact us, please send an email to <a href="mailto:info@honeydewcare.com">info@honeydewcare.com</a></td>
                        </tr>
                      </table>
                    </td>
                  </tr>
              </body>
    
              </html>
            `,
                },
            },
            Subject: {
                Charset: "UTF-8",
                Data: "Welcome to Honeydew!",
            },
        },
        Source: "notifications@honeydewcare.com",
    };
    (0, logger_1.logInfo)("Email message query", query);
    return query;
};
exports.newEnrollmentCoordinatorAccountEmailTemplate = newEnrollmentCoordinatorAccountEmailTemplate;
//# sourceMappingURL=new-enrollment-coordinator-account.js.map