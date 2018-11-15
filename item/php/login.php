<?php
	//头部 
	header("Content-type:text/html;charset=utf-8");

	//获取数据
	$username = $_REQUEST["username"];
	$password = $_REQUEST["password"];

	//建立连接(搭桥)
	$con = mysql_connect("localhost","root","root");
	//紧接着判断
	if(!$con){ // 如果连接库失败或者这个库不存在
		echo "亲，连接库失败，请检查";
	}else{
		// 连接数据库 目的地
		mysql_select_db("students",$con);
		// 执行连接到的sql 传输数据
		// 查询
		$sqlstr = "select * from studentss where username='$username' and userpass='$password'";

		$result = mysql_query($sqlstr,$con);
		// 关闭数据库 过河拆桥
		mysql_close($con);
		//响应
		$rows = mysql_num_rows($result);
		//判断
		if($rows == 0){
			echo "0";
		}else {
			echo "1";
		}

	}
	
?>