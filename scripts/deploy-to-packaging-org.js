#!/usr/bin/env node

// NodeJS
const { spawn } = require('child_process');
const path = require('path');

const rootDir = path.resolve(__dirname, '../');
const alias = 'PackagingOrg';

/**
 * Convert an sfdx package directory into a 'package' that can be deployed with
 * sfdx force:mdapi:deploy.
 */
const convertPackage = (srcFolder, destFolder) => {
  return new Promise((resolve, reject) => {

    console.log(rootDir);

    const cmd = spawn(
      'sfdx',
      [
        'force:source:convert',
        '-r', srcFolder,
        '-d', destFolder,
        '--packagename', '"My Project Name"'
      ],
      {
        cwd: rootDir,
        stdio: 'inherit',
        shell: true
      }
    );

    cmd.on('exit', (code) => {
      if (code == 0) {
        resolve();
      }
      else {
        reject(`\nsfdx force:source:convert failed with exit code:- ${code}.`);
      }
    });
  });
};

/**
 * Log in to the packaging org and store credentials for deployment.
 */
const login = () => {
  return new Promise((resolve, reject) => {

    const cmd = spawn(
      'sfdx',
      ['force:auth:web:login', '-a', alias],
      { stdio: 'inherit', shell: true }
    );

    cmd.on('exit', (code, signal) => {
      if (code == 0) {
        resolve();
      }
      else {
        reject(`\nsfdx force:auth:web:login failed with exit code:- ${code}.`);
      }
    });
  });
};

/**
 * Deploy code from packageDir, running tests at the given level.
 */
const deployPackage = (packageDir, testLevel) => {
  return new Promise((resolve, reject) => {

    const cmd = spawn(
      'sfdx',
      [
        'force:mdapi:deploy',
        '-l', testLevel,
        '-w', '15',
        '-u', alias,
        '-d', path.resolve(rootDir, packageDir)
      ],
      { stdio: 'inherit', shell: true }
    );

    cmd.on('exit', (code, signal) => {
      if (code == 0) {
        resolve();
      }
      else {
        reject(`\nsfdx force:mdapi:deploy failed with exit code:- ${code}.`);
      }
    });
  });
};

const main = async () => {
  try {
    await login();
    await convertPackage('src/main/default', 'build');
    await deployPackage('build', 'RunLocalTests');

    console.log('\nDeployment was successful.');
  } catch (error) {
    console.error(error);
  }
}

main();
