# Server

## Seed Database
Run `npm run seed`  to populate database with example emails and users.

## Development Server
Run `npm run dev` for host dev server at http://localhost:3000/. The application will automatically reload if you change any of the source files.

## Server API

### Auth

`POST /api/registration`
create a new employee user in database

`POST /api/login`
return a signed JWT token

### Employee Information

`GET /api/employees/:id`
returns a single employee object

`GET /api/employees`
returns an array of employee objects (does not need to be the full objects, just enough for HR summary view)

### Onboarding Application

`GET /api/onboarding-applications/:id`
returns an application object

`POST /api/onboarding-application/`
creates a new application object, also put application object's id in current user's application field

### Visa Status

`GET /api/visa-status/`
returns an array of visa-status objects
`GET /api/visa-status/`

### Housing

`GET /api/houses`
returns an array of house objects (does not need to be the full objects, just enough for HR summary view)

`GET /api/houses/:id`
returns single house object

`POST /api/houses`
add a new house DB record

`DELETE /api/houses/:id`
delete a house DB record
