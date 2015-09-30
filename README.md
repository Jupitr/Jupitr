# Jupitr

> A portal for Hack Reactor alumni and students to connect

## Team

  - __Product Owner__: Kevin lee
  - __Scrum Master__: Donald Steiner
  - __Development Team Members__: Melinda Budde, Lain Jiang

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies and Running Jupitr](#installing-dependencies-and-running-jupitr)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

> Some usage instructions

## Requirements

- Node 0.12.7
- Npm 2.14.2
- MongoDB 3.0.6
- Mongoose 4.1.8

## Development

### Installing Dependencies and Running Jupitr

From within the root directory install all dependencies with the following command:

```
npm install
```

Once your MongoDB server is running, you can seed the database with generated user profiles with either of the following commands:

```
node db/seed-db.js [profile records to create]
```
```
grunt seeddb // creates 50 profile records with each call
```

Jupiter can be deployed locally with the following command:

```
grunt local
```

Additional Grunt tasks are specified in Gruntfile.js

### Roadmap

View the project roadmap [https://github.com/Jupitr/Jupitr/issues](LINK_TO_PROJECT_ISSUES)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
