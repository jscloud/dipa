<?php

namespace Models\User;

class User extends \Slim\Extensions\Dmm\BaseDomainModel
{
    public function __construct()
    {
        parent::__construct('id');
        $this->__setFieldNames(array('id', 'username', 'console_key', 'extension_key', 'hash', 'name', 'email', 'country'));
    }
}
