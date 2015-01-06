<?php

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
        $document       = $documentMapper->getPublic($documentId);

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

$app->get(
    '/get/privates/:username',
    function ($username) use ($app) 
    {    
        $response = array('st' => 'ok');

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
            $response['msg'] = 'Missing pwd parameter';
        }

        echo json_encode($response);
    }
);
