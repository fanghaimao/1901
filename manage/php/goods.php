<?php
	// 连接数据库
	$pageIndex = $_GET["pageIndex"];
	mysql_connect("localhost", "root", "");
	mysql_select_db("logoin");
	mysql_query("set charset 'utf8'");
	mysql_query("set character set 'utf8'");
	$sumdata = "select * from goods";
	$sumdata1 = mysql_query($sumdata);
//	echo $sumdata;
	$num = mysql_num_rows($sumdata1);
//	echo $num;
	$totolIndex = ceil($num/6);
	if($pageIndex>$totolIndex){
	    $pageIndex = $totolIndex;
	}

	$stat = ($pageIndex-1) * 6;
    $sersql = "select * from goods limit $stat , 6";
	$resser = mysql_query($sersql);
	if(mysql_num_rows($resser) >= 1){
	        $arr =array();
            while($row = mysql_fetch_assoc($resser)){
                  array_push($arr,$row);
            }
	        echo json_encode(array('res_code' => 1, 'res_message' => $arr,'totolIndex'=>$totolIndex,'pageIndex'=>$pageIndex));
	}else{
        echo json_encode(array('res_code' => 0, 'res_message' => "暂无数据"));
	}

?>