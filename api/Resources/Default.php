<?php

$app->post(
    '/create',
    function () use ($app) 
    {    
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
                    $document = new \Models\Document\Document;
                    $documentMapper = new \Models\Document\DocumentMapper($app->pdo);

                    $document->user_id  = $userId;
                    $document->text     = $bodyData['text'];

                    $documentMapper->insert($document);

                    $response['userId']     = $userId;
                    $response['documentId'] = $document->id;
                } else {
                    $response['st'] = 'error';
                    $response['msg'] = 'Invalid password for this user';
                }

            } else {
                $response['st'] = 'error';
                $response['msg'] = 'Missing text parameter';
            }

        } else {
            $response['st'] = 'error';
            $response['msg'] = 'Missing parameters: username, pwd';
        }

        echo json_encode($response);
    }
);

$app->get(
    '/get/publics/:username',
    function ($username) use ($app) 
    {    
        $documentMapper = new \Models\Document\DocumentMapper($app->pdo);
        $documents      = $documentMapper->getForUser($username);

        $response = array('publics' => array(), 'st' => 'ok');
        if ($documents) {
            $response['publics'] = $documents->getPublics();
        }

        echo json_encode($response);
    }
);

$app->get(
    '/get/public/:documentId',
    function ($documentId) use ($app) 
    {
        $documentMapper = new \Models\Document\DocumentMapper($app->pdo);
        $document = $documentMapper->getPublic($documentId);

        $response = array('st' => 'ok');

        if ($document) 
        {
            $response['public']  = $document->getPublics();
        } else {
            $response['st'] = 'error';
            $response['msg'] = 'Invalid document';
        }

        echo json_encode($response);
    }
);

$app->get(
    '/get/protected/:documentId',
    function ($documentId) use ($app) 
    {
        $response = array('st' => 'ok');

        if ($app->request->params('pwd')) {
            $documentMapper = new \Models\Document\DocumentMapper($app->pdo);
            $document = $documentMapper->getProtected($documentId, $app->request->params('pwd'));
            if ($document) 
            {
                $response['protected']  = $document->getData();
            } else {
                $response['st'] = 'error';
                $response['msg'] = 'Invalid access';
            }
        } else {
            $response['st'] = 'error';
            $response['msg'] = 'Missing pwd parameter';
        }

        echo json_encode($response);
    }
);

$app->post(
    '/get/privates/:username',
    function ($username) use ($app) 
    {    
        $bodyData = json_decode($app->request->getBody(), true);
        $response = array('st' => 'ok');

        if (array_key_exists('pwd', $bodyData)) {
            $userMapper = new \Models\User\UserMapper($app->pdo);
            if ($userMapper->validate($username, $bodyData['pwd'])) {
                $documentMapper         = new \Models\Document\DocumentMapper($app->pdo);
                $documents              = $documentMapper->getForUser($username);
                $response['privates']   = $documents->getPrivates(false);
            } else {
                $response['st'] = 'error';
                $response['msg'] = 'User or password is invalid';
            }
        } else {
            $response['st'] = 'error';
            $response['msg'] = 'Missing pwd parameter';
        }

        echo json_encode($response);
    }
);
