<?php

namespace Models\Test;

class Test extends \Slim\Extensions\Dmm\BaseDomainModel
{
    public function __construct()
    {
        parent::__construct('id');
        $this->__setFieldNames(array('name', 'year'));
    }

    public function getName()
    {
        return $this->name;
    }
}
