<?php

declare(strict_types=1);

return function (): array {
    ob_start();
    phpinfo(INFO_MODULES);
    $phpinfo = explode(PHP_EOL, ob_get_contents());
    ob_end_clean();

    sleep(3);

    return $phpinfo;
};
