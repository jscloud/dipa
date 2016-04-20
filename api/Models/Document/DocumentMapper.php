<?php

namespace Models\Document;

class DocumentMapper extends \Slim\Extensions\Dmm\Mapper
{
    protected $tableName = 'documents';
    protected $tablePrimaryKey = 'id';

    protected $tableRelationKey = 'user_id';
    protected $relationQuery = "SELECT id FROM users WHERE username = :username LIMIT 1";

    protected $modelClass = '\Models\Document\Document';
    protected $modelCollectionClass = '\Models\Document\DocumentCollection';

    public function __construct(\PDO $pdo)
    {
        parent::__construct($pdo, $this->tableName, $this->tablePrimaryKey);
    }

    public function getForUser($username)
    {
        $sql = "SELECT *
                FROM {$this->tableName}
                WHERE {$this->tableRelationKey} = ({$this->relationQuery})
                ORDER BY date DESC";
                
        $bindings = array(
            'username' => strtolower($username)
        );

        $documents = $this->fetchCollection($sql, $bindings);
        
        if ($documents->getCount() == 0) {
            $documents = false;
        }

        return $documents;
    }

    public function getProtected($documentId, $pwd)
    {
        $sql = "SELECT *
                FROM {$this->tableName}
                WHERE {$this->tablePrimaryKey} = :documentId
                AND type = 0
                AND protected = 1
                AND public_password = :pwd
                LIMIT 1";
                
        $bindings = array(
            'documentId' => $documentId,
            'pwd'        => $pwd
        );

        $documents = $this->fetchCollection($sql, $bindings);
        
        if ($documents->getCount() == 0) {
            $documents = false;
        } else {
            $documents = $documents[0];
        }

        return $documents;
    }

    public function getPublic($documentId) 
    {
        $sql = "SELECT *
                FROM {$this->tableName}
                WHERE {$this->tablePrimaryKey} = :documentId
                AND type = 0
                LIMIT 1";
                
        $bindings = array(
            'documentId' => $documentId
        );

        $documents = $this->fetchCollection($sql, $bindings);
        
        if ($documents->getCount() == 0) {
            $documents = false;
        }

        return $documents;
    }

    public function isOwner($userId, $documentId) 
    {
        $sql = "SELECT *
                FROM {$this->tableName}
                WHERE {$this->tablePrimaryKey} = :documentId
                AND {$this->tableRelationKey} = :userId
                LIMIT 1";
                
        $bindings = array(
            'documentId' => $documentId,
            'userId'     => $userId
        );

        $documents = $this->fetchCollection($sql, $bindings);
        
        if ($documents->getCount() > 0) {
            $result = true;
        } else {
            $result = false;
        }

        return $result;
    }

    public function deleteDocument($userId, $documentId) 
    {
        $sql = "DELETE
                FROM {$this->tableName}
                WHERE {$this->tablePrimaryKey} = :documentId
                AND {$this->tableRelationKey} = :userId";
                
        $bindings = array(
            'documentId' => $documentId,
            'userId'     => $userId
        );

        $documents = $this->fetchCollection($sql, $bindings);
        
        if ($documents->getCount() > 0) {
            $result = true;
        } else {
            $result = false;
        }

        return $result;
    }
    
    public function getRecents()
    {
        $sql = "SELECT *
                FROM {$this->tableName}
                WHERE `protected` = 0
                ORDER BY date DESC LIMIT 30";
                
        $documents = $this->fetchCollection($sql, null);
        
        if ($documents->getCount() == 0) {
            $documents = false;
        }
        
        return $documents;
    }
}
