<?php

require 'Slim/Slim.php';

\Slim\Slim::registerAutoloader();

\Slim\Extensions\Config::init(
    array(
        'BASE_PATH'   => '',
        'CONFIGS_DIR' => 'Configs/'
    )
);

$app = new \Slim\Slim();

$app->container->singleton('pdo', function () {
    return new \PDO(
        "mysql:host=" . \Slim\Extensions\Config::get('db.default.host') .
        ";dbname=". \Slim\Extensions\Config::get('db.default.dbname'), 
        \Slim\Extensions\Config::get('db.default.user'), 
        \Slim\Extensions\Config::get('db.default.password')
    );
});

require 'Resources/Default.php';

$app->run();
