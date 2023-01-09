# Server

## Seed Database
Run `npm run seed`  to populate database with example emails and users.

## Development Server
Run `npm run dev` for host dev server at http://localhost:3000/. The application will automatically reload if you change any of the source files.

## Server API

### Auth

| Method, Endpoint | Controller Method | Description |
|-|-|-|
|`POST /api/regtokens`| Registration.createRegToken | create a new token, create a new registration record, and email link to new employee|
|`GET /api/regtokens` | Registration.getRegTokens | returns an array of registration objects|
|`POST /api/regtokens/:email`| Registration.statusReport | helper function to approve visa status|
|`POST /api/users/`|User.createUser|creates a new employee object, used for signup|
|`POST /api/users/:account`|User.checkUserByPassword|check user's password, used for signin, returns status|

### Employee Information

| Method, Endpoint | Controller Method | Description |
|-|-|-|
|`GET /api/users/:account`|User.getUserByAccount|returns a single employee object|
|`PUT /api/users/:email`|User.editUserWithPassword|updates one or more field in employee record|
|`GET /api/users`|User.getUserAll|returns an array of employee objects (does not need to be the full objects, just enough for HR summary view)|
|`POST /api/users/:keyword/:keywordCopy`|User.getUserByKeyword|Helper route to fetch with filter, returns an array of employee objects|

### Onboarding Application

| Method, Endpoint | Controller Method | Description |
|-|-|-|
|`GET /api/applications/:id`|Application.getApplicationById|returns an application object|
|`GET /api/applications`|Application.getApplicationAll|returns an array of applications objects (does not need to be the full objects, just enough for HR summary view)|
|`POST /api/applications`|Application.createApplication|creates a new application object, also put application object's id in current user's application field|
|`PUT /api/applications/:id`|Application.updateApplication|updates one or more fields in application record, also reset application status field to "pending"|

### Visa Status

| Method, Endpoint | Controller Method | Description |
|-|-|-|
|`GET /api/visaStatus`|VisaStatus.getVisaAll|returns an array of visa-status objects (does not need to be the full objects, just enough for HR summary view)|
|`POST /api/visaStatus/:id`|VisaStatus.editVisaById| edits one or more fields in visa |
|`PUT /api/visaStatus/:id`|VisaStatus.editVisaApprove| sets a visa status object's status to 'done' |
|`PUT /api/visaStatus/:id/:id`|VisaStatus.editVisaReject| sets visa status object's status to 'rejected' |
<!---|`GET /api/visaStatus/:id`|returns a visa status object| --->

### Housing

| Method, Endpoint | Controller Method | Description |
|-|-|-|
|`GET /api/housing`|Housing.getHousingSummary|returns an array of house objects (does not need to be the full objects, just enough for HR summary view)|
|`GET /api/housing/:id`|Housing.getHousingDetails|returns single house object|
|`POST /api/housing`|Housing.createHousing|add a new house DB record|
|`DELETE /api/housing/:id`|Housing.deleteHousing|delete a house DB record|

### Housing: Facility Reports

| Method, Endpoint | Controller Method | Description |
|-|-|-|
|`POST /api/housing/:id/reports/`|Housing.createFacilityReport|create a new facility report DB record|
|`GET /api/housing/:id/reports/`|Housing.getHouseFacilityReports|returns an array of facility reports objects for that house|
|`PUT /api/housing/:houseid/reports/:reportid`||updates an existing facility report object (i.e. status field)|
|`GET /api/housing/:houseid/reports/:reportid`||returns a facility report objects (with the messages array field populated)|
|`POST /api/housing/:houseid/reports/:reportid/msg`||create a new comment for that report|
|`PUT /api/housing/:houseid/reports/:reportid/msg/:id`||update an existing comment|
