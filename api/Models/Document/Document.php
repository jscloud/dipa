<?php

namespace Models\Document;

class Document extends \Slim\Extensions\Dmm\BaseDomainModel
{
    public function __construct()
    {
        parent::__construct('id');
        $this->__setFieldNames(array('id', 'date', 'user_id', 'type', 'protected', 'code', 'text', 'view_count'));
    }
}
