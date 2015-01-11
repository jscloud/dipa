<?php

namespace Models\Document;

class DocumentCollection extends \Slim\Extensions\Dmm\ModelCollection
{
	const TYPE_PUBLIC	= 0;
	const TYPE_PRIVATE 	= 1;

	public function getCount() 
	{
		return count($this);
	}

	public function getPublics() 
	{
		$publics = array();
		foreach ($this as $collection) 
		{
			if ($collection->type == self::TYPE_PUBLIC) {
				if ($collection->protected) $collection->text = "****";
				array_push($publics, $collection->getData());
			}
		}
		return $publics;
	}

	public function getPrivates($maskText=true) 
	{
		$privates = array();
		foreach ($this as $collection) 
		{
			if ($collection->type == self::TYPE_PRIVATE) {
				if ($maskText) $collection->text = "****";
				array_push($privates, $collection->getData());
			}
		}
		return $privates;
	}
}
