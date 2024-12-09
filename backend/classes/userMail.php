<?php
namespace Classes;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;


class userMail{
    public function sendUserMail($to, $emp_name) {
        $mail = new PHPMailer(true);

        try {
            $mail->isSMTP();
            $mail->Host= $_ENV['smtp_host'];
            $mail->Port= $_ENV['smtp_port'];
            $mail->setFrom('claims-admin@faurecia.com', 'Claims');
            $mail->addAddress($to);

            // Contenido del correo
            $mail->isHTML(true);
            $mail->Subject= "You got a claim";
            $mail->Body = <<<EOD
<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; background-color: #E5E5E5; padding: 0; margin: 0;">
  <table width="100%" cellspacing="0" cellpadding="0" border="0" align="center" bgcolor="#F6FAFB" style="background-color:#F6FAFB; margin:0; padding:0;">
    <tbody>
      <tr>
        <td valign="top" align="center">
          <table width="600" cellspacing="0" cellpadding="0" border="0" style="width:600px; margin:0 auto; background-color:#FFFFFF; padding: 0 20px;">
            <tbody>
              <tr>
                <td style="padding: 48px 0 30px; text-align: center; font-size: 14px; color: #4C83EE;">
                  FORVIA ©
                </td>
              </tr>
              <tr>
                <td style="padding: 48px 30px 40px; background-color: #FFFFFF; color: #000000; text-align: left; font-family: Arial, sans-serif;">
                  <table width="100%" cellspacing="0" cellpadding="0" border="0">
                    <tbody>
                      <tr>
                        <td style="font-size: 18px; line-height: 24px; font-weight: bold; color: #000000; padding-bottom: 24px; font-family: Arial, sans-serif;">
                          Welcome, $emp_name!
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size: 14px; line-height: 21px; color: #000000; padding-bottom: 10px; font-family: Arial, sans-serif;">
                          We inform you that a new claim has been set to you.
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size: 14px; line-height: 21px; color: #000000; padding-bottom: 16px; font-family: Arial, sans-serif;">
                          To view your claims, go to "My claims":
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom: 24px;">
                          <a href="{{next_step_link}}" style="display: block; width: 200px; background-color: #4C83EE; text-decoration: none; padding: 10px 0; color: #FFFFFF; font-size: 14px; line-height: 21px; text-align: center; font-weight: bold; border-radius: 7px; font-family: Arial, sans-serif;">
                            Next Step
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size: 14px; line-height: 21px; color: #000000; font-family: Arial, sans-serif;">
                          Best regards,<br><strong>Claims app</strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding: 24px 0 48px; text-align: center; font-size: 11px; color: #8B949F;">
                  This message is automated, please do not respond.<br/>
                  © 2024 Monitoring Services Team
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</body>
</html>
EOD;
            $mail->CharSet = 'UTF-8';
            $mail->Encoding = 'base64';
            $mail->send();
            echo 'El mensaje ha sido enviado';
        } catch (Exception $e) {
            echo "El mensaje no se pudo enviar. Error: {$mail->ErrorInfo}";
        }
    }

}