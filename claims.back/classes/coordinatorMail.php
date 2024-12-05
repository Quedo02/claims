<?php
namespace Classes;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;


class coordinatorMail{
    public function sendCoordinatorMail() {
        $mail = new PHPMailer(true);

        try {
            $mail->isSMTP();
            $mail->Host= $_ENV['smtp_host'];
            $mail->Port= $_ENV['smtp_port'];

            $mail->setFrom('claims-admin@faurecia.com', 'Claims');
            $mail->addAddress('DL-chiefs');

            $mail->isHTML(true);
            $mail->Subject= "You got a claim";
            $mail->Body= "
            <!DOCTYPE html>
            <head>
                <meta charset='UTF-8'>
                <meta name='viewport' content='width=device-width, initial-scale=1.0'>
                <title>Test</title>
            </head>
            <body>
                <div class='container'>
                    <h1>Test!</h1>
                    <p>This is a test claim mail:</p>
                    <p><strong>ID of the claim:</strong> {ID DE LA CLAIM}</p>
                    <p><strong>TOPIC OF THE CLAIM:</strong> {TOPIC DE LA CLAIM}</p>
                    <p><strong>LINK</strong></p>
                    
                    <div class='footer'>
                        <p>Please review it as soon as possible</p>
                        <br>
                        <p>This email is automatic. No response needed.</p>
                        <p>Thanks for your support!.</p>
                    </div>
                </div>
            </body>
            </html>
            ";
            
            $mail->CharSet = 'UTF-8';
            $mail->Encoding = 'base64';
            $mail->send();
            echo 'El mensaje ha sido enviado';
        } catch (Exception $e) {
            echo "El mensaje no se pudo enviar. Error: {$mail->ErrorInfo}";
        }
    }

}