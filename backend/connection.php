<?php
   $con = mysqli_connect("localhost", "root", "", "signup-interview");
   if (!$con) {
      die('could not connect' . mysqli_connect_errno());
   }

   function postMsg($success,$status,$message,$extra = []){
      return array_merge([
          'success' => $success,
          'status' => $status,
          'message' => $message
      ],$extra);
   }

?>