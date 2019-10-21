<?php
namespace Deployer;

require 'recipe/laravel.php';

// Project name
set('application', 'LostAndFoundIDs');

// Project repository
set('repository', 'git@github.com:johnGachihi/LostAndFoundIDs.git');

// [Optional] Allocate tty for git clone. Default value is false.
set('git_tty', true);

// Shared files/dirs between deploys
add('shared_files', []);
add('shared_dirs', []);

// Writable dirs by web server
add('writable_dirs', []);


// Hosts

host('wolfteamalpha.ninja')
    ->user('deployer')
    ->identityFile('~/.ssh/deployerkey')
    ->set('deploy_path', '/var/www/html-deployer/{{application}}');

// Tasks

task('build', ['npm-install', 'npm-build']);

desc('Install npm packages');
task('npm-install', 'npm install');

desc('Build');
task('npm-build', function () {
    run('cd {{release_path}} && npm run dev');
});

after('deploy:vendors', 'build');

// [Optional] if deploy fails automatically unlock.
after('deploy:failed', 'deploy:unlock');

// Migrate database before symlink new release.
before('deploy:symlink', 'artisan:migrate');

