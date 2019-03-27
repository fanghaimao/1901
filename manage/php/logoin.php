<?php
    $name = $_GET["name"];
    $psd = $_GET["psd"];
	// 连接数据库
	mysql_connect("localhost", "root", "");
	mysql_select_db("logoin");
	mysql_query("set charset 'utf8'");
	mysql_query("set character set 'utf8'");
    $sql = "select * from information  where name = '$name' and psd = '$psd'";
    $res = mysql_query($sql);
    if($res){
     $arr =array();
        while($row = mysql_fetch_assoc($res)){
              array_push($arr,$row);
              }
        if(empty($arr)){
             echo '用户名不存在或密码错误';
        }else {
          echo json_encode($arr);
        }
    }else{
         echo '用户名不存在或密码错误';
    }
?>