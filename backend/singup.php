<?php
    include 'connection.php';
    include 'headers(cors).php';
    
    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $email = $_POST['email'];
    $password = $_POST['password'];


    if (isset($firstName) && isset($lastName) && isset($email)  && isset($password)){
        
        // ------------------------------------
        // also we can check for avalability of the user in database and then allow to singup
        // ------------------------------------
        
        $query = "INSERT INTO usre (firstName, lastName, email, password) VALUES ('".$firstName."', '".$lastName."', '".$email."', '".$password."')";
        $result = mysqli_query($con, $query);
        if ($query) {
            $response = postMsg(1, 200, "You Have Succesfully Registered");	
        }else{
            $response = postMsg(0, 500, "Not Registered");	
        }
    }else{
        $response = postMsg(0, 500, "Enter valid information.");	
    }
    echo json_encode($response);    
    mysqli_close($con);
?>