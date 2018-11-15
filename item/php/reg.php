<?php
	header("Count-type:text/html;charset=utf-8");
	$username = $_REQUEST["username"];
	$userpass = $_REQUEST["userpass"];
	$con  = mysql_connect("localhost","root","root");
	if(!$con){
		echo "链接失败，请检查";
	}else{
		//链接库
		mysql_select_db("students",$con);
		//查询
		$sqlstr = "select * from studentss where username='$username'";
		$result = mysql_query($sqlstr,$con);
		$rows = mysql_num_rows($result);
		if($rows <= 0){
			//如果不存在 就添加
			$sqlstr = "insert into studentss (username,userpass) values('$username','$userpass')";
			$result = mysql_query($sqlstr,$con);
			if($result == 1){
				echo "1";//注册成功
			}else{
				echo "0";//注册失败
			}
		}else{
			echo "-1";//注册失败，用户名已经存在
		}
	}
?>