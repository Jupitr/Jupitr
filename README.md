# Jupitr

> Jupitr is portal for Hack Reactor alumni and students to connect with each other.

## Team

  - __Product Owner__: Kevin lee
  - __Scrum Master__: Donald Steinert
  - __Development Team Members__: Melinda Budde, Lain Jiang

## Requirements

- Node 0.12.7
- Npm 2.14.2
- MongoDB 3.0.6
- Mongoose 4.1.8

## Development

### Installing Dependencies

From within the root directory install all dependencies with the following command:

```
npm install
```

### Usage

Once your MongoDB server is running, you can seed the database with randomly generated user profiles with either of the following commands:

```
node db/seed-db.js [number of profiles to create]
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

View the project roadmap [here](https://github.com/Jupitr/Jupitr/issues)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
