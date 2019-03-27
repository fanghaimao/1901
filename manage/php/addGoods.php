<?php
    $name = $_GET["name"];
    $num = $_GET["num"];
    $price = $_GET["price"];
	// 连接数据库
	mysql_connect("localhost", "root", "");
	mysql_select_db("logoin");
	mysql_query("set charset 'utf8'");
	mysql_query("set character set 'utf8'");
	$sersql = "select * from goods  where name = '$name'";
//	echo $sersql;
	$resser = mysql_query($sersql);
	if(mysql_num_rows($resser) >= 1){
	 echo json_encode(array('res_code' => 0, 'res_message' => "商品已存在"));
	}else{
           $sql = "insert into  goods (name , num , price) values ('$name' , $num , $price)";
//           echo $sql;
           $res = mysql_query($sql);
           if($res){
           			echo json_encode(array('res_code' => 1, 'res_message' => "商品添加成功"));
           		}else{
           			echo json_encode(array('res_code' => 0, 'res_message' => "商品已存在"));
           		}
	}

?>