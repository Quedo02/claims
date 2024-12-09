<?php
namespace Controllers;
use Classes\userMail;
use MVC\Router;
use Classes\coordinatorMail;

class MailController{
    public static function sendUserMail(Router $router, $id) {
        $modelo = "Model\\claims";
        $objects = $modelo::validClaim($id);
        var_dump($objects);
        exit;

        $data = json_decode(file_get_contents('php://input'), true);
        if (!$data || !isset($data['to'])) {
            echo json_encode(['error' => 'Missing required fields']);
            return;
        }
        $mail = new userMail();
        try {
            $mail->sendUserMail($data['to'], $data['emp_name'], $data['topic']);
            echo json_encode(['success' => 'Mail sent']);
        } catch (\Exception $e) {
            echo json_encode(['error' => 'Failed to send mail: ' . $e->getMessage()]);
        }
    }
    public static function sendCoordinatorMail(Router $router) {
        $data = json_decode(file_get_contents('php://input'), true);
        if (!$data || !isset($data['to'])) {
            echo json_encode(['error' => 'Missing required fields']);
            return;
        }
        $mail = new coordinatorMail();
        try {
            $mail->sendCoordinatorMail($data['to']);
            echo json_encode(['success' => 'Mail sent']);
        } catch (\Exception $e) {
            echo json_encode(['error' => 'Failed to send mail: ' . $e->getMessage()]);
        }
    }
}