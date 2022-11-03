<?php

  $connection = mysqli_connect("136.243.14.123", "littl265_admin", "JayRadhaShyam", "littl265_art");

  $_POST = json_decode(file_get_contents('php://input'), true);

  $name = mysqli_real_escape_string($connection, $_POST["name"]);
  $middleName = mysqli_real_escape_string($connection, $_POST["middleName"]);
  $lastName = mysqli_real_escape_string($connection, $_POST["lastName"]);
  $login = mysqli_real_escape_string($connection, $_POST["login"]);
  $email = mysqli_real_escape_string($connection, $_POST["email"]);
  $pass = mysqli_real_escape_string($connection, $_POST["pass"]);

  $querySelectBefore = "SELECT * FROM user WHERE (email = '$email') AND (pass = '$pass')";
  $resultBefore = mysqli_query($connection, $querySelectBefore);

  if(mysqli_num_rows($resultBefore) != 0) {
    echo json_encode([
      'status' => 'Пользователь c таким email уже существует, попробуйте авторизоваться']);
  } else {
    $queryInsert = "INSERT INTO user (firstName, middleName, lastName, nickname, email, pass)
                     VALUES ('$name','$middleName','$lastName', '$login', '$email', '$pass')";

    $result = mysqli_query($connection, $queryInsert);

    if($result) {

      $querySelect = "SELECT * FROM user WHERE (email = '$email') AND (pass = '$pass')";
      $result = mysqli_query($connection, $querySelect);
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
    } else {
      echo json_encode([
        'status' => 'Данные успешно не добавлены']);
    }
  }

  

  mysqli_close($connection);
?>