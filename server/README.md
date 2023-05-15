## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

step 1: run docker

- create a docker-compose.yml file and take the example from docker-compose.example
- fill up the POSTGRES_USER and POSTGRES_PASSWORD

STEP 2: run ./gradlew -x webapp

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

## Running the DB using docker

docker-compose -f server/docker-compose.yml up

## Changing DB structure needs to be updated. Run this in terminal:

1. cd server
2. npx prisma migrate dev --name init

## To create to yml file using swagger
1. cd to file that you want to install the resource and run this in terminal

        nest generate resource <name-of-resource> --no-spec

2. Then select REST API
