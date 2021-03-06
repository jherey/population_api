# Population Management System

This API creates a Population Management System that contains a list of locations and the total number of residents in each location broken down by gender.

## Project Structure

The project structure follows the **MVC** (Model-View-Controller) pattern. You can think of the **JSON** representation of data returned by the API as the 'view'.
```
├── src/
    ├── controllers
        ├── LocationsController.ts
    ├── helpers
        ├── validatePayload.ts
    ├── middlewares
        ├── validateUserInputs.ts
    ├── models
        ├── BaseSchema.ts
    ├── repositories
        ├── BaseRepository.ts
    ├── routers
        ├── index.ts
    ├── services
        ├── LocationService.ts
    ├── tests
        ├── home.spec.ts
    ├── utils
        ├── db.ts
        ├── logger.ts
    ├── app.ts
    ├── index.ts
├── typings
    ├── config.d.ts
├── README.md
├── tsconfig.json
```

## Requirements

* Node.js v10.x or higher
* npm
* MongoDB instance (local or remote)

## Getting Started

```
$ git clone https://github.com/jherey/population_api.git
$ cd population_api
$ npm install
$ npm run dev                 # For development purpose
$ npm start                   # To run production build
```

You should now be able to access the API via http://localhost:2300/api/

**NOTE:** Create a `.env` file configuration following the `.env.example`.


## Notes

Some things to note about the project

- It uses Typescript to ensure type safety.
- The `typings` folder holds custom Typscript type definitions.

## API Endpoints

<table>
<tr><th>HTTP VERB</th><th>ENDPOINTS</th><th>DESCRIPTION</th></tr>
<tr><td>POST</td><td>/api/locations</td><td>Creates a new location</td></tr>
<tr><td>GET</td><td>/api/locations</td><td>Returns available locations</td></tr>
<tr><td>PUT</td><td>/api/locations/:id</td><td>Updates a location</td></tr>
<tr><td>DELETE</td><td>/api/locations/:id</td><td>Deletes a location</td></tr>
</table>

## Testing

* [Jest](https://jestjs.io/)
* [Supertest](https://www.npmjs.com/package/supertest)

## Contributions

We welcome contributions, what are you waiting for? Raise a Pull Request!! 😁

### License

This project is licensed under the MIT license.