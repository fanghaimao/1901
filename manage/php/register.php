<?php
    $name = $_GET["name"];
    $psd = $_GET["psd"];
	// 连接数据库
	mysql_connect("localhost", "root", "");
	mysql_select_db("logoin");
	mysql_query("set charset 'utf8'");
	mysql_query("set character set 'utf8'");
	$sersql = "select * from information  where name = '$name'";
	$resser = mysql_query($sersql);
	if(mysql_num_rows($resser) >= 1){
	 echo json_encode(array('res_code' => 0, 'res_message' => "用户名已存在"));
	}else{
           $sql = "insert into  information (name , psd) values ('$name' , '$psd')";
           $res = mysql_query($sql);
           if($res){
           			echo json_encode(array('res_code' => 1, 'res_message' => "注册成功"));
           		}else{
           			echo json_encode(array('res_code' => 0, 'res_message' => "网络错误"));
           		}
	}

?>