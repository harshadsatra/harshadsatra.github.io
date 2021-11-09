<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Max-Age: 1000");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
header("Access-Control-Allow-Methods: PUT, POST, GET, OPTIONS, DELETE");

date_default_timezone_set('Asia/Calcutta');

$todays_date = date('Y-m-d H:i:s');
$airtable_base = $airable_table = $airtable_key = "";

$responseArray = array(
    "msg"=> "failure",
    "status" => 400,
    "text" => "Something Went Wrong"
);


function sendResponse($data){
    header('Content-Type: application/json');
	
	if($data['status'] == 400){
		header('HTTP/1.1 400 Bad Request');
	}
	
    echo json_encode($data);
    exit;
}

function sendData($data, $airtable_base,$airable_table, $airtable_key){
    $send_data = array(
        "fields" => $data
    );

    $data_json = json_encode($send_data);

    $ch = curl_init("https://api.airtable.com/v0/".$airtable_base."/".$airable_table."?api_key=".$airtable_key);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data_json);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/json'
    ));
    
    $result = curl_exec($ch);
    return json_decode($result);
}


$data = array(
    'Status' => 'New',
    'DateAdded' => $todays_date
);

foreach ($_POST as $key => $value) {
    if($key === 'airtable_table'){
        $airable_table = $value;
    }
    else if($key === 'airtable_base'){
        $airtable_base = $value;
    }
    else if($key === 'airtable_key'){
        $airtable_key = $value;
    }else{
        $data[$key] = $value;
    }
}

$result = sendData($data, $airtable_base,$airable_table, $airtable_key);

if (array_key_exists("error",$result)){
    $responseArray['text'] = "Data Not Saved on Table";
}else{
    $responseArray['s']= $result;
    $responseArray['text'] = "Data Saved";
    $responseArray['status'] = 200;
    $responseArray['msg'] = "success";
}


sendResponse($responseArray);
exit;
