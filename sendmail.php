<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require 'phpmailer/src/Exception.php';
    require 'phpmailer/src/PHPMailer.php';

    $mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8';
    $mail->setLanguage('ru', 'phpmailer/language/');
    $mail->IsHTML(true);

    $mail->setFrom('1730020@gmail.com', 'SEND');
    $mail->addAddress('1730020@gmail.com');
    $mail->Subject = 'Привет! Письмо с резюие!'

    $body = '<h1>Пришло письмо!</h1>'

    if(trim(!empty($_POST['name']))) {
        $body.='<p><strong>Имя:</strong> '.$POST['name'].'</p>';
    }

    if(trim(!empty($_POST['email']))) {
        $body.='<p><strong>E-mail:</strong> '.$POST['email'].'</p>';
    }

    if(trim(!empty($_POST['message']))) {
        $body.='<p><strong>Сообщение:</strong> '.$POST['message'].'</p>';
    }

    $mail->Body = $body;

    if (!$mail->send()) {
        $message = 'Ошибка :(';
    } else {
        $message = 'Письмо отправлено :)';
    }

    $response = ['message' => $message];

    header('Content-type: application/json');
    echo json_encode($response);
?>