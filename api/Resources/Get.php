<?php

$app->map(
    '/get/publics',
    function () use ($app) 
    {    
        if ($app->request->params('username')) {

            $username = $app->request->params('username');
            $u        = $app->request->params('u');
            $uid      = $app->request->params('uid');
            $v        = $app->request->params('v');

            $documentMapper = new \Models\Document\DocumentMapper($app->pdo);
            $documents      = $documentMapper->getForUser($username);

            $response = array('publics' => array(), 'st' => 'ok');

            $userValidateMapper = new \Models\User\UserMapper($app->pdo);
            $userData           = $userValidateMapper->validateKeyHash($u, $v, 'hash');

            if ($documents) {
                if ($userData && (strtolower($u) == strtolower($username))) {
                    $response['publics'] = $documents->getAll();
                } else {
                    $response['publics'] = $documents->getPublics();
                }
            }
        } else {
            $response = array('publics' => array(), 'st' => 'error', 'msg' => 'Missing username param');
        }
        
        $app->response()->header("Content-Type", "application/json");
        echo json_encode($response);
    }
)->via('OPTIONS', 'GET');

$app->map(
    '/get/public',
    function () use ($app) 
    {
        if ($app->request->params('documentid')) {

            $documentId = $app->request->params('documentid');
        
            $documentMapper = new \Models\Document\DocumentMapper($app->pdo);
            $document       = $documentMapper->getPublic($documentId);

            $response = array('st' => 'ok');

            if ($document) 
            {
                $response['public']  = $document->getPublics();
            } else {
                $response['st'] = 'error';
                $response['msg'] = 'Invalid document';
            }
        } else {
            $response['st'] = 'error';
            $response['msg'] = 'Missing documentid param';
        }

        $app->response()->header("Content-Type", "application/json");
        echo json_encode($response);
    }
)->via('OPTIONS', 'GET');

$app->map(
    '/get/protected',
    function () use ($app) 
    {
        $response = array('st' => 'ok');

        if ($app->request->params('documentid')) {

            $documentId = $app->request->params('documentid');

            if ($app->request->params('pwd')) {
                $documentMapper = new \Models\Document\DocumentMapper($app->pdo);
                $document       = $documentMapper->getProtected($documentId, $app->request->params('pwd'));
                if ($document) 
                {
                    $response['protected']  = $document->getData();
                } else {
                    $response['st'] = 'error';
                    $response['msg'] = 'Invalid access';
                }
            } else {
                $response['st'] = 'error';
                $response['msg'] = 'Missing pwd param';
            }

        } else {
            $response['st'] = 'error';
            $response['msg'] = 'Missing documentid param';
        }

        $app->response()->header("Content-Type", "application/json");
        echo json_encode($response);
    }
)->via('OPTIONS', 'GET');

$app->map(
    '/get/privates',
    function () use ($app) 
    {    
        $response = array('st' => 'ok');

        if ($app->request->params('username')) {

            $usernamae = $app->request->params('username');

            if ($app->request->params('pwd')) {
                $userMapper = new \Models\User\UserMapper($app->pdo);
                if ($userMapper->validate($username, $app->request->params('pwd'))) {
                    $documentMapper         = new \Models\Document\DocumentMapper($app->pdo);
                    $documents              = $documentMapper->getForUser($username);
                    $response['privates']   = $documents->getPrivates(false);
                } else {
                    $response['st'] = 'error';
                    $response['msg'] = 'User or password is invalid';
                }
            } else {
                $response['st'] = 'error';
                $response['msg'] = 'Missing pwd param';
            }

        } else {
            $response['st'] = 'error';
            $response['msg'] = 'Missing username param';
        }

        $app->response()->header("Content-Type", "application/json");
        echo json_encode($response);
    }
)->via('OPTIONS', 'GET');

$app->map(
    '/get/recents',
    function () use ($app) 
    {    
            $documentMapper = new \Models\Document\DocumentMapper($app->pdo);
            $documents      = $documentMapper->getRecents();
            
            $response = array('publics' => array(), 'st' => 'ok');

            $response['publics'] = $documents;
        
        $app->response()->header("Content-Type", "application/json");
        echo json_encode($response);
    }
)->via('OPTIONS', 'GET');

$app->get(
    '/raw/:id',
    function ($id) use ($app) 
    {
        try {
            $documentMapper = new \Models\Document\DocumentMapper($app->pdo);
            $document       = $documentMapper->getPublic($id);

            $raw = "Invalid id";

            if ($document) 
            {
                $docu = $document->getPublics();
                $raw = $docu[0]['text'];
            }

            $app->response()->header("Content-Type", "text/plain");
            echo $raw;
        } catch(\Exception $e) {
            $app->response()->header("Content-Type", "text/plain");
            echo "Unexpected error";
        }
    }
);

$app->get(
    '/raw/:id/:hashId',
    function ($id, $hashId) use ($app) 
    {
        try {
            $documentMapper = new \Models\Document\DocumentMapper($app->pdo);
            $document       = $documentMapper->getProtected($id, $hashId);

            $raw = "Validation error";

            if ($document) 
            {
                $docu = $document->getData();
                $raw = $docu['text'];
            }

            $app->response()->header("Content-Type", "text/plain");
            echo $raw;
        } catch(\Exception $e) {
            $app->response()->header("Content-Type", "text/plain");
            echo "Unexpected error";
        }
    }
);



