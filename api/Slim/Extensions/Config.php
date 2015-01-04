<?php

namespace Slim\Extensions;

class Config
{
    private static $conf;

    public static function init($values)
    {
        self::$conf = $values;
        self::loadConfigs();
    }

    public static function loadConfigs($dir = false, $overwrite = false)
    {
        if (!$dir) {
            $dir = self::get('CONFIGS_DIR');
        }

        $files = array();
        if (is_dir($dir)) {
            $files = scandir($dir);
        }

        foreach ($files as $file) {
            if (preg_match("/.+\.yml$/i", $file)) {
                $configArray = \Slim\Extensions\Spyc::YAMLLoad($dir . $file);
                $configName  = explode(".", $file);
                self::set($configName[0], $configArray, $overwrite);
            }
        }
    }

    /**
     * set
     *
     * Set an global var
     *
     * @param string $key
     * @param mix    $value
     * @param bool   $overwrite
     *
     * @return mix
     */
    public static function set($key, $value, $overwrite = false)
    {
        if (isset(self::$conf[$key]) && !$overwrite) {
            throw new \Exception("Key: `$key` already exists. Use `overwrite` param in true if you want to modify the existing key.");
        }

        return self::$conf[$key] = $value;
    }

    /**
     * get
     *
     *  Get an global var
     *
     * @param string $key
     * @param <type> $default
     *
     * @return mix
     */
    public static function get($key, $default = null)
    {
        $keys = explode('.', $key);

        $value = self::$conf;
        while (true) {
            if (empty($keys)) {
                return $value;
            }

            $first = array_shift($keys);

            if (isset($value[$first])) {
                $value = $value[$first];
            } else {
                return $default;
            }
        }

        return $default;
    }

    public static function getAll()
    {
        return self::$conf;
    }
}