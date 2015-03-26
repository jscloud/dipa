<?php

$app->map(
    '/login',
    function () use ($app) 
    {    
    	try {
	        $bodyData = json_decode($app->request->getBody(), true);
	        $response = array('st' => 'ok');

	        if (array_key_exists('username', $bodyData) && array_key_exists('pwd', $bodyData)) {
	            $userValidateMapper = new \Models\User\UserMapper($app->pdo);
	            if ($userValidateMapper->validate($bodyData['username'], $bodyData['pwd'])) 
	            {
	            	$userMapper = new \Models\User\UserMapper($app->pdo);
	        		$userData   = $userMapper->findByUsername($bodyData['username']);

	        		$response['v'] = $userData->hash;
	                $response['userId']   = $userData->id;
	                $response['username'] = $userData->username;
	            } else {
	                $response['st'] = 'error';
	                $response['msg'] = 'Invalid username or password';
	            }
	        } else {
	            $response['st'] = 'error';
	            $response['msg'] = 'Missing parameters: username, pwd';
	        }

	    } catch(\Exception $e) {
	    	$response['st'] = 'error';
	        $response['msg'] = 'Unexpected error';
	    }

		$app->response()->header("Content-Type", "application/json");
        echo json_encode($response);
    }
)->via('OPTIONS', 'POST');

$app->map(
    '/loginUser',
    function () use ($app) 
    {    
    	try {
	        $bodyData = $_POST;
	        $response = array('st' => 'ok');

	        if (array_key_exists('username', $bodyData) && array_key_exists('pwd', $bodyData)) {
	            $userValidateMapper = new \Models\User\UserMapper($app->pdo);
	            if ($userValidateMapper->validate($bodyData['username'], $bodyData['pwd'])) 
	            {
	            	$userMapper = new \Models\User\UserMapper($app->pdo);
	        		$userData   = $userMapper->findByUsername($bodyData['username']);

	        		$response['v'] = $userData->hash;
	                $response['userId']   = $userData->id;
	                $response['username'] = $userData->username;
	            } else {
	                $response['st'] = 'error';
	                $response['msg'] = 'Invalid username or password';
	            }
	        } else {
	            $response['st'] = 'error';
	            $response['msg'] = 'Missing parameters: username, pwd';
	        }

	    } catch(\Exception $e) {
	    	$response['st'] = 'error';
	        $response['msg'] = 'Unexpected error';
	    }

		$app->response()->header("Content-Type", "application/json");
        echo json_encode($response);
    }
)->via('POST');