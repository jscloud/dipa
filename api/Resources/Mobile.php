<?php

$app->map(
    '/recent',
    function () use ($app) 
    {    
        $documentMapper = new \Models\Document\DocumentMapper($app->pdo);
        $documents      = $documentMapper->getRecents($app->request->params('size'), $app->request->params('lastId'));

        $response = array('st' => 'ok');

        if ($documents) {
            $response['data'] = $documents->getAll();
        }
        
        $app->response()->header("Content-Type", "application/json");
        echo json_encode($response);
    }
)->via('OPTIONS', 'GET');

$app->map(
    '/pastes',
    function () use ($app) 
    {    
        $response = array('st' => 'ok');

        if ($app->request->params('username')) {

            $username = $app->request->params('username');

            if ($app->request->params('v')) {

					$hash_key = $app->request->params('v');
            		$userValidateMapper = new \Models\User\UserMapper($app->pdo);
	            	$userData 			= $userValidateMapper->validateKeyHash($username, $hash_key, 'hash');

	            	if ($userData) {
	            		$documentMapper         = new \Models\Document\DocumentMapper($app->pdo);
                    	$documents              = $documentMapper->getForUser($username, $app->request->params('size'), $app->request->params('lastId'));
                    	$response['data']   	= $documents->getPrivates(false);
	            	} else {
                    	$documentMapper         = new \Models\Document\DocumentMapper($app->pdo);
                    	$documents              = $documentMapper->getForUser($username, $app->request->params('size'), $app->request->params('lastId'));
                    	$response['data']   	= $documents->getPublics();
	            	}

            } else {
                    $documentMapper         = new \Models\Document\DocumentMapper($app->pdo);
                    $documents              = $documentMapper->getForUser($username, $app->request->params('size'), $app->request->params('lastId'));
                    $response['data']   	= $documents->getPublics();
            }
        } else {
                $documentMapper         = new \Models\Document\DocumentMapper($app->pdo);
                $documents              = $documentMapper->getForUser($username, $app->request->params('size'), $app->request->params('lastId'));
                $response['data']   	= $documents->getPublics();
        }

        $app->response()->header("Content-Type", "application/json");
        echo json_encode($response);
    }
)->via('OPTIONS', 'GET');