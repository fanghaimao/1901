<?php
    $id = $_GET["id"];
	// 连接数据库
	mysql_connect("localhost", "root", "");
	mysql_select_db("logoin");
	mysql_query("set charset 'utf8'");
	mysql_query("set character set 'utf8'");
	$sersql = "select * from goods  where id = '$id'";
	$resser = mysql_query($sersql);
	if(mysql_num_rows($resser) >= 1){
	     $sqlupdata = "delete from goods  where id = '$id'";
//	     echo $sqlupdata;
	     $res = mysql_query($sqlupdata);
	   if($res){
          	echo json_encode(array('res_code' => 1, 'res_message' => "商品删除成功"));
              }else{
               	echo json_encode(array('res_code' => 0, 'res_message' => "商品删除失败"));
               	}
	}else{
       echo json_encode(array('res_code' => 0, 'res_message' => "商品删除失败"));
	}

?>