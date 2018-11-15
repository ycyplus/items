<?php
	header("Content-type:text/html;charset-utf-8");
	//1 接收数据
	$username = $_REQUEST["phone"];
	//2、处理 链接数据库 保存数据
	//1）建立链接(搭桥)
	$con = mysql_connect("localhost","root","root");
	if(!$con){
		echo "链接失败，请检查";
	}else {
		//选择数据库(目的地)
		mysql_select_db("students",$con);
		//查询 运输数据 执行sql数据
		$sqlstr = "select * from studentss where username='$username'";
		$result = mysql_query($sqlstr,$con);
		//关闭数据库
		mysql_close($con);
		//响应
		$rows = mysql_num_rows($result);
		if($rows==0){
			echo "1"; //可以使用
		}else {
			echo "0"; //已经被人使用
		}
	}
?>