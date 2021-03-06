<?php

namespace Models\User;

class UserMapper extends \Slim\Extensions\Dmm\Mapper
{
    protected $tableName = 'users';
    protected $tablePrimaryKey = 'id';

    protected $modelClass = '\Models\User\User';
    protected $modelCollectionClass = '\Models\User\UserCollection';

    public function __construct(\PDO $pdo)
    {
        parent::__construct($pdo, $this->tableName, $this->tablePrimaryKey);
    }

    public function findByUsername($username)
    {
        $sql =
            "SELECT *
            FROM {$this->tableName}
            WHERE username = :username limit 1";

        $bindings = array(
            'username' => strtolower($username)
        );

        $results = $this->fetchCollection($sql, $bindings);

        if (count($results) > 0) {
            $results = $results[0];
        } else {
            $results = false;
        }

        return $results;
    }

    public function validate($username, $password)
    {
        $sql =
            "SELECT *
            FROM {$this->tableName}
            WHERE username = :username
            AND password = :password limit 1";

        $bindings = array(
            'username' => strtolower($username),
            'password' => $password
        );
        
        $results = $this->fetchCollection($sql, $bindings);

        if (count($results) > 0) {
            $results = true;
        } else {
            $results = false;
        }

        return $results;
    }

    public function validateKeyHash($username, $key_hash, $field) 
    {
        $sql =
            "SELECT *
            FROM {$this->tableName}
            WHERE username = :username
            AND {$field} = :keyhash LIMIT 1";

        $bindings = array(
            'username' => strtolower($username),
            'keyhash' => $key_hash
        );
        
        $results = $this->fetchCollection($sql, $bindings);

        if (count($results) > 0) {
            $results = $results[0];
        } else {
            $results = false;
        }

        return $results;
    }

}
