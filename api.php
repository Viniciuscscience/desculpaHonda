<?php
// get the HTTP method, path and body of the request
$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['PATH_INFO'],'/'));
$input = json_decode(file_get_contents('php://input'),true);
$action = $input['action'];
unset($input['action']);

// connect to the mysql database
$link = mysqli_connect('localhost', 'desculpahonda', 'desculpahonda', 'desculpahonda');
mysqli_set_charset($link,'utf8');

// retrieve the table and key from the path
$table = preg_replace('/[^a-z0-9_]+/i','',array_shift($request));
$key = array_shift($request)+0;

// escape the columns and values from the input object
$columns = preg_replace('/[^a-z0-9_]+/i','',array_keys($input));
$values = array_map(function ($value) use ($link) {
  if ($value===null) return null;
  return mysqli_real_escape_string($link,(string)$value);
},array_values($input));

// build the SET part of the SQL command
$set = '';
for ($i=0;$i<count($columns);$i++) {
  $set.=($i>0?',':'').'`'.$columns[$i].'`=';
  $set.=($values[$i]===null?'NULL':'"'.$values[$i].'"');
}

// create SQL based on HTTP method
switch ($method) {
  case 'GET':
   if($table == "desculpas"){
    $sql = "select * from `$table`".($key?" WHERE professor=$key || student=$key ":''); break;
   }else{
    $sql = "select * from `$table`".($key?" WHERE id=$key":''); break;
    }
  case 'PUT':
    $sql = "update `$table` set $set where id=$key"; break;
  case 'POST':
    if($action == "login"){
       $name = $input['name'];
       $password = $input['password'];
       $sql = "select name,id,email,type from `$table` WHERE name='$name' AND password='$password'";
       break;
    }else{
        $sql = "insert into `$table` set $set"; break;
    }
  case 'DELETE':
    $sql = "delete `$table` where id=$key"; break;
}

// excecute SQL statement

$result = mysqli_query($link,$sql);

// die if SQL statement failed
if (!$result) {
  http_response_code(404);
  die(mysqli_error());
}

// print results, insert id or affected row count
if ($method == 'GET' || $action == "login") {
  if (!$key || $table == "desculpas") echo '[';
  for ($i=0;$i<mysqli_num_rows($result);$i++) {
    echo ($i>0?',':'').json_encode(mysqli_fetch_object($result));
  }
  if (!$key || $table == "desculpas") echo ']';
} elseif ($method == 'POST') {
  echo mysqli_insert_id($link);
} else {
  echo mysqli_affected_rows($link);
}

// close mysql connection
mysqli_close($link);