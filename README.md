# SFDX Template

Simple template for new SFDX projects, with some useful configuration and commands.

## :seedling: Prerequisites

1. **Install [NodeJS](https://nodejs.org/en/download)** (latest LTS version)

1. **Install the [Salesforce CLI](https://developer.salesforce.com/tools/sfdxcli)**

1. **Install [PMD](https://pmd.github.io/)**

## :clipboard: Setup

Add your project's details in:

- `config/project-scratch-def.json` - "orgName"
- `package.json` - "name"
- `deploy-to-packaging-org.js` - project name
- `pmd-apex-ruleset.xml` - "description"

## :pray: Deploy

```bash
npm run deploy
```

## :microscope: Test

```bash
npm test
```

## :mag: Code Analysis

```bash
npm run lint
```

## :package: Package

Given a namespaced developer org to act as a packaging org:

```bash
npm run packaging
```

Log in to the org in your browser and follow manual packaging steps.
