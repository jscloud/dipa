<?php

namespace Models\Document;

class DocumentCollection extends \Slim\Extensions\Dmm\ModelCollection
{
	const TYPE_PUBLIC	 = 0;
	const TYPE_PROTECTED = 1;
	const MAX_STRING_TEXT = 200;

	public function getCount() 
	{
		return count($this);
	}

	public function getPublics() 
	{
		$publics = array();
		foreach ($this as $collection) 
		{
			if ($collection->protected == self::TYPE_PUBLIC) {
				$collection->text = substr($collection->text, 0, self::MAX_STRING_TEXT);
				$collection->public_password = null;
				array_push($publics, $collection->getData());
			}
		}
		return $publics;
	}

	public function getAll() 
	{
		$all = array();
		foreach ($this as $collection) 
		{
			array_push($all, $collection->getData());
		}
		return $all;
	}

	public function getPrivates($maskText=true) 
	{
		$privates = array();
		foreach ($this as $collection) 
		{
			if ($collection->protected == self::TYPE_PROTECTED) {
				if ($maskText) $collection->text = "****";
				array_push($privates, $collection->getData());
			}
		}
		return $privates;
	}
}
