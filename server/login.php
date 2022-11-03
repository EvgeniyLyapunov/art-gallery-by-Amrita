<?php

  $connection = mysqli_connect("136.243.14.123", "littl265_admin", "JayRadhaShyam", "littl265_art");

  $_POST = json_decode(file_get_contents('php://input'), true);

  $email = mysqli_real_escape_string($connection, $_POST["email"]);
  $pass = mysqli_real_escape_string($connection, $_POST["pass"]);

  $querySelect = "SELECT * FROM user WHERE (email = '$email') AND (pass = '$pass')";
  $result = mysqli_query($connection, $querySelect);

  if(mysqli_num_rows($result) == 0) {
    echo json_encode([
      'status' => 'Пользователь c такими данными не существует, попробуйте зарегистрироваться']);
  } else {
    $record = mysqli_fetch_assoc($result);

    echo json_encode([
      'status' => 'ok',
      'id' => $record['id'],
      'firstName' => $record['firstName'],
      'middleName' => $record['middleName'],
      'lastName' => $record['lastName'],
      'nickname' => $record['nickname'],
      'email' => $record['email'],
      'pass' => $record['pass']
    ]);
  }

  mysqli_close($connection);

?>