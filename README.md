# Examenopdracht Web Services

- Student: Sam De Waegeneer
- Studentennummer: 202183489
- E-mailadres: sam.dewaegeneer@student.hogent.be

## Vereisten

Ik verwacht dat volgende software reeds geïnstalleerd is:

- [NodeJS](https://nodejs.org)
- [Yarn](https://yarnpkg.com)
- [MySQL Community Server](https://dev.mysql.com/downloads/mysql/)
- ...

## Opstarten

Om de API te starten maak je eerst een '.env' file aan in de root directory met de volgende inhoud:

```
NODE_ENV=development
# Database
DATABASE_HOST={hostName}
DATABASE_PORT={port}
DATABASE_USERNAME={username}
DATABASE_PASSWORD={'password'}
DATABASE_NAME={databaseName}
# JWT
AUTH_JWKS_URI=https://{AUTH0 DOMAIN}/.well-known/jwks.json
AUTH_AUDIENCE={AUTH0 API IDENTIFIER}
AUTH_ISSUER=https://{AUTH0 DOMAIN}/
AUTH_USER_INFO=https://{AUTH0 DOMAIN}/userinfo
```

Om de api te runnen geef je vervolgens het commando `yarn start` in. <br />
> Schrijf hier hoe we de applicatie starten (.env bestanden aanmaken, commando's om uit te voeren...)

## Testen

- `yarn add jest --dev`
- `yarn add supertest --dev`

Om de testen uit te voeren maak je eerst een '.env.test' file aan in de root directory met de volgende inhoud:

```
NODE_ENV=test
# Database
DATABASE_HOST={hostName}
DATABASE_PORT={port}
DATABASE_USERNAME={username}
DATABASE_PASSWORD={'password'}
DATABASE_NAME={databaseName}
# JWT
AUTH_JWKS_URI=https://{AUTH0 DOMAIN}/.well-known/jwks.json
AUTH_AUDIENCE={AUTH0 API IDENTIFIER}
AUTH_ISSUER=https://{AUTH0 DOMAIN}/
AUTH_USER_INFO=https://{AUTH0 DOMAIN}/userinfo
AUTH_TEST_USER_USERNAME={AUTH0 TEST USER NAME}
AUTH_TEST_USER_PASSWORD={AUTH0 TEST USER PASSWORD}
AUTH_TOKEN_URL=https://{AUTH0 DOMAIN}/oauth/token
AUTH_CLIENT_ID={AUTH0 CLIENT ID}
AUTH_CLIENT_SECRET={AUTH0 CLIENT SECRET}
```

Om de testen te laten runnen geef je het commando `yarn test` in. <br />
Om de coverage te testen geef je het commando `yarn test:coverage` in.
> Schrijf hier hoe we de testen uitvoeren (.env bestanden aanmaken, commando's om uit te voeren...)

## Common errors

- Modules not found error, probeer dit en run again:

```
yarn install
```
