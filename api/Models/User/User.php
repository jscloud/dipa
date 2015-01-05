<?php

namespace Models\User;

class User extends \Slim\Extensions\Dmm\BaseDomainModel
{
    public function __construct()
    {
        parent::__construct('id');
        $this->__setFieldNames(array('id', 'username', 'name', 'email', 'country'));
    }
}
