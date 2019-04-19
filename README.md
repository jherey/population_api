# Population Management System

This API creates a Population Management System that contains a list of locations and the total number of residents in each location broken down by gender.

## Project Structure

The project structure follows the **MVC** (Model-View-Controller) pattern. You can think of the **JSON** representation of data returned by the API as the 'view'.
```
├── src/
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
$ npm dev                     # For development purpose
$ npm start                   # To run production build
```

You should now be able to access the API via http://localhost:2300/api/

**NOTE:** Create a `.env` file configuration following the `.env.example`.


## Notes

Some things to note about the project

- It uses Typescript to ensure type safety.
- The `typings` folder holds custom Typscript type defintions.

## API Endpoints

<table>
<tr><th>HTTP VERB</th><th>ENDPOINTS</th><th>DESCRIPTION</th></tr>