<?php

$app->map(
    '/get/publics',
    function () use ($app) 
    {    
        if ($app->request->params('username')) {

            $username = $app->request->params('username');

            $documentMapper = new \Models\Document\DocumentMapper($app->pdo);
            $documents      = $documentMapper->getForUser($username);

            $response = array('publics' => array(), 'st' => 'ok');

            if ($documents) {
                $response['publics'] = $documents->getPublics();
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

$app->get(
    '/raw/:id',
    function ($id) use ($app) 
    {
        $documentMapper = new \Models\Document\DocumentMapper($app->pdo);
        $document       = $documentMapper->getPublic($id);

        $raw = "Invalid id";

        if ($document) 
        {
            $docu = $document->getPublics();
            $raw = $docu[0]['text'];
            //$raw  = $docu[0]->text;
        }

        $app->response()->header("Content-Type", "text/plain");
        echo $raw;
    }
);

