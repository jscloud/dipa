<?php

$app->map(
    '/register',
    function () use ($app) 
    {    
    	try {
	        $bodyData = json_decode($app->request->getBody(), true);
	        $response = array('st' => 'ok');
	        $hash = null;

	        if (array_key_exists('username', $bodyData) && array_key_exists('pwd', $bodyData)) {

	            if (array_key_exists('text', $bodyData)) {

	            	$userMapper = new \Models\User\UserMapper($app->pdo);
	            	$user       = $userMapper->findByUsername($bodyData['username']);

	                if ($user) {
	            		$response['st'] = 'error';
	                	$response['msg'] = 'Username is already in use';
	                } else {
	                    $userModel       = new \Models\User\User;
	                    $userModelMapper = new \Models\User\UserMapper($app->pdo);

	                    $userModel->username = strtolower($bodyData['username']);
	                    $userModel->password = $bodyData['pwd'];

	                   	$hash = substr(substr(
							"abcdefghijklmnopqrstuvwxyz0123456789%*^.;?_+-#@!{}", 
							mt_rand(0 ,25), 1) . substr(md5(time()), 1
	   					), 0, 29);

	   					$userModel->hash = $hash;
	                    $userModelMapper->insert($userModel);
	                    $userId = $userModel->id;
	                    $username = $userModel->username;

	                    $document       = new \Models\Document\Document;
	                    $documentMapper = new \Models\Document\DocumentMapper($app->pdo);

	                   	if (array_key_exists('protected', $bodyData)) {
	                    	if (in_array($bodyData['protected'], array(0,1))) {
	                    		$document->protected = $bodyData['protected'];
	                    	}
	                    }

	                    if ($document->protected == 1) {
		                   	$public_pwd = substr(substr(
								"abcdefghijklmnopqrstuvwxyz0123456789%*^.;?_+-#@!{}", 
								mt_rand(0 ,25), 1) . substr(md5(time()), 1
		   					), 0, 29);

		   					$document->public_password = $public_pwd;
	                    }

	                    $document->user_id  = $userId;
	                    $document->text     = $bodyData['text'];

	                    $documentMapper->insert($document);

	                    $response['v'] 			= $hash;
	                    $response['userId']     = $userId;
	                    $response['u'] 			= $userModel->username;
	                    $response['documentId'] = $document->id;
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
    '/registerUser',
    function () use ($app) 
    {    
    	try {
	        $bodyData = $_POST;
	        $response = array('st' => 'ok');
	        $hash = null;

	        if (array_key_exists('username', $bodyData) && array_key_exists('pwd', $bodyData)) {

	            if (array_key_exists('text', $bodyData)) {

	            	$userMapper = new \Models\User\UserMapper($app->pdo);
	            	$user       = $userMapper->findByUsername($bodyData['username']);

	                if ($user) {
	            		$response['st'] = 'error';
	                	$response['msg'] = 'Username is already in use';
	                } else {
	                    $userModel       = new \Models\User\User;
	                    $userModelMapper = new \Models\User\UserMapper($app->pdo);

	                    $userModel->username = strtolower($bodyData['username']);
	                    $userModel->password = $bodyData['pwd'];
	                    $userModel->email 	 =  $bodyData['email'];

	                   	$hash = substr(substr(
							"abcdefghijklmnopqrstuvwxyz0123456789%*^.;?_+-#@!{}", 
							mt_rand(0 ,25), 1) . substr(md5(time()), 1
	   					), 0, 29);

	   					$userModel->hash = $hash;
	                    $userModelMapper->insert($userModel);
	                    $userId = $userModel->id;
	                    $username = $userModel->username;

	                    $document       = new \Models\Document\Document;
	                    $documentMapper = new \Models\Document\DocumentMapper($app->pdo);

	                   	if (array_key_exists('protected', $bodyData)) {
	                    	if (in_array($bodyData['protected'], array(0,1))) {
	                    		$document->protected = $bodyData['protected'];
	                    	}
	                    }

	                    if ($document->protected == 1) {
		                   	$public_pwd = substr(substr(
								"abcdefghijklmnopqrstuvwxyz0123456789%*^.;?_+-#@!{}", 
								mt_rand(0 ,25), 1) . substr(md5(time()), 1
		   					), 0, 29);

		   					$document->public_password = $public_pwd;
	                    }

	                    $document->user_id  = $userId;
	                    $document->text     = $bodyData['text'];

	                    $documentMapper->insert($document);

	                    $response['v'] 			= $hash;
	                    $response['userId']     = $userId;
	                    $response['u'] 			= $userModel->username;
	                    $response['documentId'] = $document->id;
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
)->via('POST');


$app->map(
    '/create',
    function () use ($app) 
    {    
    	try {

	        $bodyData = json_decode($app->request->getBody(), true);
	        $response = array('st' => 'ok');

	        if ((array_key_exists('v', $bodyData) && array_key_exists('text', $bodyData))) {

	        	$keyData 	= explode(":", $bodyData['v']);
	        	$hash_key 	= $keyData[0];
	        	$hash_user 	= $keyData[1];

	            $userValidateMapper = new \Models\User\UserMapper($app->pdo);
	            $userData 			= $userValidateMapper->validateKeyHash($hash_user, $hash_key, 'hash');

                if ($userData) 
                {
                    $document       = new \Models\Document\Document;
                    $documentMapper = new \Models\Document\DocumentMapper($app->pdo);

                   	if (array_key_exists('protected', $bodyData)) {
                    	if (in_array($bodyData['protected'], array(0,1))) {
                    		$document->protected = $bodyData['protected'];
                    	}
                    }

       	            if ($document->protected == 1) {
	                   	$public_pwd = substr(substr(
							"abcdefghijklmnopqrstuvwxyz0123456789%*^.;?_+-#@!{}", 
							mt_rand(0 ,25), 1) . substr(md5(time()), 1
	   					), 0, 29);

	   					$document->public_password = $public_pwd;
	                }

                    $document->user_id  = $userData->id;
                    $document->text     = $bodyData['text'];

                    $documentMapper->insert($document);

                    $response['userId']     = $userData->id;
                    $response['username']	= $hash_user;
                    $response['documentId'] = $document->id;
	            } else {
                    $response['st'] = 'error';
                    $response['msg'] = 'Invalid credentials.';
	           	}

	        } else {
	            $response['st'] = 'error';
	        	$response['msg'] = 'Invalid request params';
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
    '/delete',
    function () use ($app) 
    {    
    	try {

	        $bodyData = json_decode($app->request->getBody(), true);
	        $response = array('st' => 'ok');

	        if ((array_key_exists('v', $bodyData) && array_key_exists('documentId', $bodyData))) {

	        	$keyData 	= explode(":", $bodyData['v']);
	        	$hash_key 	= $keyData[0];
	        	$hash_user 	= $keyData[1];

	            $userValidateMapper = new \Models\User\UserMapper($app->pdo);
	            $userData 			= $userValidateMapper->validateKeyHash($hash_user, $hash_key, 'hash');

                if ($userData) 
                {
                    $documentMapper = new \Models\Document\DocumentMapper($app->pdo);
                    $documentMapper->deleteDocument($userData->id, $bodyData['documentId']);
	            } else {
                    $response['st'] = 'error';
                    $response['msg'] = 'Invalid credentials.';
	           	}

	        } else {
	            $response['st'] = 'error';
	        	$response['msg'] = 'Invalid request params';
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
    '/createFromConsole',
    function () use ($app) 
    {    
    	try {
	        $bodyData = json_decode($app->request->getBody(), true);
	        $response = array('st' => 'ok');
	        $public_pwd = '';

	        if ((array_key_exists('consoleKey', $bodyData) && array_key_exists('text', $bodyData))) {

	        	$keyData = explode(":", $bodyData['consoleKey']);
	        	$console_key 	= $keyData[0];
	        	$username 		= $keyData[1];

	            $userValidateMapper = new \Models\User\UserMapper($app->pdo);
	            $userData 			= $userValidateMapper->validateKeyHash($username, $console_key, 'console_key');

                if ($userData) 
                {
                    $document       = new \Models\Document\Document;
                    $documentMapper = new \Models\Document\DocumentMapper($app->pdo);

                   	if (array_key_exists('protected', $bodyData)) {
                    	if (in_array($bodyData['protected'], array(0,1))) {
                    		$document->protected = $bodyData['protected'];
                    	}
                    }

       	            if ($document->protected == 1) {
	                   	$public_pwd = substr(substr(
							"abcdefghijklmnopqrstuvwxyz0123456789%*^.;?_+-#@!{}", 
							mt_rand(0 ,25), 1) . substr(md5(time()), 1
	   					), 0, 29);

	   					$document->public_password = $public_pwd;
	                }

					$document->origin = 1;
                    $document->user_id  = $userData->id;
                    $document->text     = $bodyData['text'];

                    $documentMapper->insert($document);

                    $response['hash']     	= $public_pwd;
                    $response['userId']     = $userData->id;
                    $response['username']	= $username;
                    $response['documentId'] = $document->id;
	            } else {
                    $response['st'] = 'error';
                    $response['msg'] = 'Invalid credentials. Please, configure your pasting cli with the follow command: ~ pasting -u yourUsername -p yourPassword';
	           	}

	        } else {
	            $response['st'] = 'error';
	        	$response['msg'] = 'Missing configuration. Please, configure your pasting cli with the follow command: ~ pasting -u yourUsername -p yourPassword';
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
    '/createConsoleKey',
    function () use ($app) 
    {    
    	try {
	        $bodyData = json_decode($app->request->getBody(), true);
	        $response = array('st' => 'ok');

	        if (array_key_exists('username', $bodyData) && array_key_exists('pwd', $bodyData)) {

	            $userMapper = new \Models\User\UserMapper($app->pdo);
	            $user       = $userMapper->findByUsername($bodyData['username']);

                if ($user) {

                	$userValidateMapper = new \Models\User\UserMapper($app->pdo);
	                if ($userValidateMapper->validate($bodyData['username'], $bodyData['pwd'])) 
	   				{
	   					$console_key = $user->console_key;

	   					if (!$console_key) {
	   						$console_key = substr(substr(
	   							"abcdefghijklmnopqrstuvwxyz0123456789%*^.;?_+-#@!{}", 
	   							mt_rand(0 ,25), 1) . substr(md5(time()), 1
	   						), 0, 29);

	   						$user->console_key = $console_key;
	   						$userMapper->save($user);
	   					}

	   					$response['st']  = "ok";
	   					$response['console_key'] = "$console_key:$user->username";

	                } else {
               			$response['st'] = 'error';
                    	$response['msg'] = 'Invalid credentials. Check username and password';
	                }

                } else {
                    $response['st'] = 'error';
                    $response['msg'] = 'Invalid username';
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
    '/createFromExtension',
    function () use ($app) 
    {    
    	try {
	        $bodyData = json_decode($app->request->getBody(), true);
	        $response = array('st' => 'ok');
	        $public_pwd = '';

	        if ((array_key_exists('extensionKey', $bodyData) && array_key_exists('text', $bodyData))) {

	        	$keyData = explode(":", $bodyData['extensionKey']);
	        	$extension_key 	= $keyData[0];
	        	$username 		= $keyData[1];

	            $userValidateMapper = new \Models\User\UserMapper($app->pdo);
	            $userData 			= $userValidateMapper->validateKeyHash($username, $extension_key, 'extension_key');

                if ($userData) 
                {
                    $document       = new \Models\Document\Document;
                    $documentMapper = new \Models\Document\DocumentMapper($app->pdo);

                   	if (array_key_exists('protected', $bodyData)) {
                    	if (in_array($bodyData['protected'], array(0,1))) {
                    		$document->protected = $bodyData['protected'];
                    	}
                    }

       	            if ($document->protected == 1) {
	                   	$public_pwd = substr(substr(
							"abcdefghijklmnopqrstuvwxyz0123456789%*^.;?_+-#@!{}", 
							mt_rand(0 ,25), 1) . substr(md5(time()), 1
	   					), 0, 29);

	   					$document->public_password = $public_pwd;
	                }

					$document->origin = 2;
                    $document->user_id  = $userData->id;
                    $document->text     = $bodyData['text'];

                    $documentMapper->insert($document);

                    $response['hash']     	= $public_pwd;
                    $response['userId']     = $userData->id;
                    $response['username']	= $username;
                    $response['documentId'] = $document->id;
	            } else {
                    $response['st'] = 'error';
                    $response['msg'] = 'Invalid credentials. Please, configure your extension with a valid username and password.';
	           	}

	        } else {
	            $response['st'] = 'error';
	        	$response['msg'] = 'Missing configuration. Please, configure your pasting cli with the follow command: ~ pasting -u yourUsername -p yourPassword';
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
    '/createExtensionKey',
    function () use ($app) 
    {    
    	try {
	        $bodyData = json_decode($app->request->getBody(), true);
	        $response = array('st' => 'ok');

	        if (array_key_exists('username', $bodyData) && array_key_exists('pwd', $bodyData)) {

	            $userMapper = new \Models\User\UserMapper($app->pdo);
	            $user       = $userMapper->findByUsername($bodyData['username']);

                if ($user) {

                	$userValidateMapper = new \Models\User\UserMapper($app->pdo);
	                if ($userValidateMapper->validate($bodyData['username'], $bodyData['pwd'])) 
	   				{
	   					$extension_key = $user->extension_key;

	   					if (!$extension_key) {
	   						$extension_key = substr(substr(
	   							"abcdefghijklmnopqrstuvwxyz0123456789%*^.;?_+-#@!{}", 
	   							mt_rand(0 ,25), 1) . substr(md5(time()), 1
	   						), 0, 29);

	   						$user->extension_key = $extension_key;
	   						$userMapper->save($user);
	   					}

	   					$response['st']  = "ok";
	   					$response['extnsion_key'] = "$extension_key:$user->username";

	                } else {
               			$response['st'] = 'error';
                    	$response['msg'] = 'Invalid credentials. Check username and password';
	                }

                } else {
                    $response['st'] = 'error';
                    $response['msg'] = 'Invalid username';
                }

	        } else {
	            $response['st'] = 'error';
	            $response['msg'] = 'Missing parameters: username, password';
	        }

	    } catch(\Exception $e) {
	    	$response['st'] = 'error';
	        $response['msg'] = 'Unexpected error';
	   	}

		$app->response()->header("Content-Type", "application/json");
        echo json_encode($response);
    }
)->via('OPTIONS', 'POST');
