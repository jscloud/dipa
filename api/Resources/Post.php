<?php

$app->map(
    '/create',
    function () use ($app) 
    {    
    	try {
	        $bodyData = json_decode($app->request->getBody(), true);
	        $response = array('st' => 'ok');

	        if (array_key_exists('username', $bodyData) && array_key_exists('pwd', $bodyData)) {

	            $userMapper = new \Models\User\UserMapper($app->pdo);
	            $user       = $userMapper->findByUsername($bodyData['username']);

	            if (array_key_exists('text', $bodyData)) {

	                if ($user) {
	                    $userId = $user->id;
	                } else {
	                    $userModel       = new \Models\User\User;
	                    $userModelMapper = new \Models\User\UserMapper($app->pdo);

	                    $userModel->username = strtolower($bodyData['username']);
	                    $userModel->password = $bodyData['pwd'];

	                    $userModelMapper->insert($userModel);
	                    $userId = $userModel->id;
	                }

	                $userValidateMapper = new \Models\User\UserMapper($app->pdo);
	                if ($userValidateMapper->validate($bodyData['username'], $bodyData['pwd'])) 
	                {
	                    $document       = new \Models\Document\Document;
	                    $documentMapper = new \Models\Document\DocumentMapper($app->pdo);

	                    if (array_key_exists('code', $bodyData)) {
	                    	if ($bodyData['code'] == 1) $document->code = 1;
	                    }

	                   	if (array_key_exists('type', $bodyData)) {
	                    	if (in_array($bodyData['type'], array(0,1))) {
	                    		$document->type = $bodyData['type'];
	                    	}
	                    }

	                   	if (array_key_exists('protected', $bodyData)) {
	                    	if (in_array($bodyData['protected'], array(0,1))) {
	                    		$document->protected = $bodyData['protected'];
	                    	}
	                    }

	                   	if (array_key_exists('public_password', $bodyData)) {
	                    	if ($bodyData['public_password'] != '') {
	                    		$document->public_password = $bodyData['public_password'];
	                    	}
	                    }

	                    $document->user_id  = $userId;
	                    $document->text     = $bodyData['text'];

	                    $documentMapper->insert($document);

	                    $response['userId']     = $userId;
	                    $response['documentId'] = $document->id;
	                } else {
	                    $response['st'] = 'error';
	                    $response['msg'] = 'Invalid password';
	                }

	            } else {
	                $response['st'] = 'error';
	                $response['msg'] = 'Missing text parameter';
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
    '/update',
    function () use ($app) 
    {    
    	try {
	        $bodyData = json_decode($app->request->getBody(), true);
	        $response = array('st' => 'ok');

	        if (array_key_exists('username', $bodyData) && array_key_exists('pwd', $bodyData)) {

	            $userMapper = new \Models\User\UserMapper($app->pdo);
	            $user       = $userMapper->findByUsername($bodyData['username']);

	            if (array_key_exists('documentid', $bodyData)) {

	                if ($user) {

	                    $userId = $user->id;
	                    $userValidateMapper = new \Models\User\UserMapper($app->pdo);
		                
		                if ($userValidateMapper->validate($bodyData['username'], $bodyData['pwd'])) {

		                	$document       	= new \Models\Document\Document;
		                    $documentOwnMapper 	= new \Models\Document\DocumentMapper($app->pdo);

		                    if ($documentOwnMapper->isOwner($userId, $bodyData['documentid'])) {

		                    	$documentMapper = new \Models\Document\DocumentMapper($app->pdo);
		                    	$documentModel 	= $documentMapper->find(array('id' => $bodyData['documentid']), new \Models\Document\Document);

	                    		if (array_key_exists('code', $bodyData)) {
			                    	if ($bodyData['code'] == 1) $documentModel->code = 1;
			                    }

			                   	if (array_key_exists('type', $bodyData)) {
			                    	if (in_array($bodyData['type'], array(0,1))) {
			                    		$documentModel->type = $bodyData['type'];
			                    	}
			                    }

			                   	if (array_key_exists('protected', $bodyData)) {
			                    	if (in_array($bodyData['protected'], array(0,1))) {
			                    		$documentModel->protected = $bodyData['protected'];
			                    	}
			                    }

			                   	if (array_key_exists('public_password', $bodyData)) {
			                    	if ($bodyData['public_password'] != '') {
			                    		$documentModel->public_password = $bodyData['public_password'];
			                    	}
			                    }

			                   	if (array_key_exists('text', $bodyData)) {
			                    	$documentModel->text = $bodyData['text'];
			                    }

			                    $documentMapper->save($documentModel);

		                    } else {
		                    	$response['st'] = 'error';
		                    	$response['msg'] = 'Invalid access';
		                    }

		                } else {
		                	$response['st'] = 'error';
		                    $response['msg'] = 'Invalid password';
		                }

	                } else {
	                	$response['st'] = 'error';
		                $response['msg'] = 'User not found';
	                }

	            } else {
	            	$response['st'] = 'error';
		            $response['msg'] = 'Missing documentid parameter';
	            }

	        } else {
	            $response['st'] = 'error';
	            $response['msg'] = 'Missing parameters: username, pwd';
	        }

	    } catch (\Exception $e) {
	    	$response['st'] = 'error';
	        $response['msg'] = 'Unexpected error';
	    }

		$app->response()->header("Content-Type", "application/json");
        echo json_encode($response);
    }
)->via('OPTIONS', 'POST');
