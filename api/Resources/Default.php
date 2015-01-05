<?php

$app->get(
    '/',
    function () use ($app) {
        $testMapper = new \Models\Test\TestMapper($app->pdo);
        $results = $testMapper->findByName('juan');
        echo count($results);
    }
);

$app->post(
    '/create/:usr',
    function ($usr) use ($app) {

        $userMapper = new \Models\User\UserMapper($app->pdo);

        $documentMapper = new \Models\Document\DocumentMapper($app->pdo);


/*
        $result = $userMapper->findByUsername($usr);

        if ($result) {
            echo "la id es: " . $result->id;
        } else {
            echo "user not found";
        }
        

        if ($userMapper->validate($usr, '')) {
            echo "valide";
        } else {
            echo "no valide";
        }

*/

        $documents = $documentMapper->getForUser($usr);

        foreach ($documents as $document) {
            echo $document->text;
        }

        // var_dump($app->request->getBody());
        // echo $app->request->post('var1');
    }
);
