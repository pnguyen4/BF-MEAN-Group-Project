# Server

## Seed Database
Run `npm run seed`  to populate database with example emails and users.

## Development Server
Run `npm run dev` for host dev server at http://localhost:3000/. The application will automatically reload if you change any of the source files.

## Server API

### Auth

| Method, Endpoint | Description |
|-|-|
|`POST /api/registration`| create a new employee user in database|
|`POST /api/login` | return a signed JWT token|

### Employee Information

| Method, Endpoint | Description |
|-|-|
|`GET /api/employees/:id`|returns a single employee object|
|`PUT /api/employees/:id`|updates one or more field in employee record|
|`GET /api/employees`|returns an array of employee objects (does not need to be the full objects, just enough for HR summary view)|

### Onboarding Application

| Method, Endpoint | Description |
|-|-|
|`GET /api/onboarding-applications/:id`|returns an application object|
|`GET /api/onboarding-applications`|returns an array of applications objects (does not need to be the full objects, just enough for HR summary view)|
|`POST /api/onboarding-applications`|creates a new application object, also put application object's id in current user's application field|
|`PUT /api/onboarding-applications/:id`|updates one or more fields in application record, also reset application status field to "pending"|

### Visa Status

| Method, Endpoint | Description |
|-|-|
|`GET /api/visa-status/:id`|returns a visa status object|
|`GET /api/visa-status`|returns an array of visa-status objects (does not need to be the full objects, just enough for HR summary view)|

### Housing

| Method, Endpoint | Description |
|-|-|
|`GET /api/housing`|returns an array of house objects (does not need to be the full objects, just enough for HR summary view)|
|`GET /api/housing/:id`|returns single house object|
|`POST /api/housing`|add a new house DB record|
|`DELETE /api/housing/:id`|delete a house DB record|

### Housing: Facility Reports

| Method, Endpoint | Description |
|-|-|
|`POST /api/housing/:id/reports/`|create a new facility report DB record|
|`GET /api/housing/:id/reports/`|returns an array of facility reports objects for that house|
|`PUT /api/housing/:houseid/reports/:reportid`|updates an existing facility report object (i.e. status field)|
|`GET /api/housing/:houseid/reports/:reportid`|returns a facility report objects (with the messages array field populated)|
|`POST /api/housing/:houseid/reports/:reportid/msg`|create a new comment for that report|
|`PUT /api/housing/:houseid/reports/:reportid/msg/:id`|update an existing comment|
