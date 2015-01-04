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
    '/',
    function () {
        echo 'This is a POST route';
    }
);
