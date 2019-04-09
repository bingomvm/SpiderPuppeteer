<?php
$ssrHost = 'http://10.209.154.60:8362';
$protocol = strpos(strtolower($_server['server_protocol']),'https')  === false ? 'http' : 'https';
$host = $protocol.'://'.$_SERVER["SERVER_NAME"];
$user_agent = urlencode($_SERVER['HTTP_USER_AGENT']);
$port = '';

if($protocol == 'http' && $_SERVER["SERVER_PORT"] != 80){
    $port = ':'.$_SERVER["SERVER_PORT"];
}

if($protocol == 'https' && $_SERVER["SERVER_PORT"] != 443){
    $port = ':'.$_SERVER["SERVER_PORT"];
}
$requestUrl = $host.$port.$_SERVER['REQUEST_URI'];
$result = file_get_contents($ssrHost.'/render?url='.$requestUrl);

echo $result;
?>