<?php
	
	$data = json_decode(file_get_contents("php://input"));
	
	$idPhone = $data->id;
	$review = $data->rev;
	
	$_datastr = file_get_contents("./data/phones.json");
	
	$phoneList = json_decode($_datastr, true);	//in ASSOC;
	
	for($i = 0; $i < count($phoneList); $i++)
	{
		if ($phoneList[$i]['id'] == $idPhone)
		{
			$phoneList[$i]['reviews']['list'][] = array( 'author' => $review->author, 'message' => $review->message, 'stars' => $review->stars );
			
			file_put_contents( "./data/phones.json", json_encode($phoneList) );
			
			return 1;
		}
	}
	
	return 0;
	
?>