<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $json = file_get_contents('php://input');
    $data = json_decode($json);

    $name = filter_var($data->name, FILTER_SANITIZE_STRING);
    $email = filter_var($data->email, FILTER_SANITIZE_EMAIL);
    $message = filter_var($data->message, FILTER_SANITIZE_STRING);

    $errors = [];
    if (empty($name)) {
        $errors[] = "O nome é obrigatório.";
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "O e-mail é inválido.";
    }
    if (empty($message)) {
        $errors[] = "A mensagem é obrigatória.";
    }

    if (count($errors) == 0) {
        echo "Dados recebidos com sucesso.";
    } else {
        foreach ($errors as $error) {
            echo "<p>$error</p>";
        }
    }
} else {
    http_response_code(405);
    echo "Método não permitido";
}
