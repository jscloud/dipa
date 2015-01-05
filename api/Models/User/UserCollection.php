<?php

namespace Models\User;

class UserCollection extends \Slim\Extensions\Dmm\ModelCollection
{
	public function getCount() {
		return count($this);
	}
}
