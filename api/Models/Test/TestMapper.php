<?php

namespace Models\Test;

class TestMapper extends \Slim\Extensions\Dmm\Mapper
{
    protected $tableName = 'test';
    protected $tablePrimaryKey = 'id';

    protected $modelClass = '\Models\Test\Test';
    protected $modelCollectionClass = '\Models\Test\TestCollection';

    public function __construct(\PDO $pdo)
    {
        parent::__construct($pdo, $this->tableName, $this->tablePrimaryKey);
    }

    public function findByName($name)
    {
        $sql =
            "SELECT *
            FROM {$this->tableName}
            WHERE name = :name";

        $bindings = array(
            'name' => $name
        );
        return $this->fetchCollection($sql, $bindings);
    }
}
