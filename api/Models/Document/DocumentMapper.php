<?php

namespace Models\Document;

class DocumentMapper extends \Slim\Extensions\Dmm\Mapper
{
    protected $tableName = 'documents';
    protected $tablePrimaryKey = 'id';

    protected $modelClass = '\Models\Document\Document';
    protected $modelCollectionClass = '\Models\Document\DocumentCollection';

    public function __construct(\PDO $pdo)
    {
        parent::__construct($pdo, $this->tableName, $this->tablePrimaryKey);
    }

    public function getForUser($username)
    {
        $sql =
            "SELECT *
            FROM {$this->tableName}
            WHERE username = :username";

        $bindings = array(
            'username' => $username
        );
        
        $results = $this->fetchCollection($sql, $bindings);

        if (count($results) == 0) {
            $results = false;
        }

        return $results;
    }
}
