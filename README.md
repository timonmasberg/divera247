# Divera 24/7 API Wrapper

An unofficial Node package to interface with Divera 24/7 by wrapping the mess the API is into a usable library. This project is
not in any way affiliated with divera247.com / DIVERA GmbH.<br>
Official Divera API Documentation can be found here: https://api.divera247.com/

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=timonmasberg_divera247&metric=alert_status)](https://sonarcloud.io/dashboard?id=timonmasberg_divera247)

## Current features finished and planned

Below are all the request types the package supports currently (ticked) and the ones that are currently not implemented
but planned to be. Contributions are welcome!

- [ ] Alarm
  - [x] Create Alarm
  - [x] Read all Alarms
  - [x] Read Alarm
  - [x] Delete Alarm
  - [x] Close Alarm
  - [ ] Alarm User Responses
  - [x] Archive Alarm
- [ ] Pull all
  - [x] Read Groups
  - [x] Read specific value by key
  - [x] Read all vehicles
- [ ] Messages
  - [ ] Write Messages
  - [ ] Read Messages
- [ ] Vehicle
  - [x] Set status
  - [x] Get status

## Getting Started

These instructions will show you how to use this package in your project. If you want to contribute, check
_Contributing_.

### Prerequisites

If you, for whatever reason, want to use this package fronted wise, it is possible since `axios` supports browsers. We also export CJS and ESM.

### Installing

```shell
npm i divera247-api-unofficial
```

## Usage

_this is currently in the making!_<br>
After installing the package you can use it as shown below.

### Authorize

Retrieve the access token with user credentials (e.g. with a system user).

```ts
import {DiveraClient} from 'divera247-api-unofficial';
// CJS: const {DiveraClient} = require('divera247-api-unofficial');
try {
    const token = await DiveraClient.getAccessToken('username', 'password');
} catch (e) {
    // failed to retreive token
}
```

### Declare the client

```ts
import {DiveraClient} from 'divera247-api-unofficial';
// CJS: const {DiveraClient} = require('divera247-api-unofficial');

const diveraClient = new DiveraClient(token);
```

### Pull All (`/v2/pull/all`)

The pull all endpoint pretty much delivers everything there is for a tenant. This package includes some helpers to extract the data you need.

<b>Read specific data</b><br>
Provide the path of the specific property you want to extract from the `/pull/all` response.

```ts
const {data: {user}} = await diveraClient.getAllByPath<{
  firstname: string;
  lastname: string;
}>('cluster', 'user');
```

<b>Groups</b>

```ts
import {
  DiveraResponse
} from "./divera-response.model";

const groups: DiveraResponse<Group[]> = await diveraClient.getGroups();

// Get Groups sorted by Divera provided `groupsorting`
const sortedGroups = await diveraClient.getGroups(true);
```

### Alarm (`/v2/alarms`)

<b>Create Alarm</b>

The CreateAlarm model represents the payload to the Divera API. `Alarm` for the alarm details, `Instructions` to tell if the groups, vehicles etc are passed as id or name.

```ts
const alarm: CreateAlarm = {
    Alarm: {
        title: "This is an alarm!!!",
        group: [1234],
        ...
    },
    Instructions: {
        group: "id",
        ...
    }
}
```

A more convenient way is to use the builder:

```ts
const alarm = new AlarmBuilder()
  // set address of the scene
  .address('Foostreet 1337')
  // set coordinates (lat, lng) of the scene
  .coordinates(50.321, 10.123)
  // set units mapped by their ids
  .groups([1, 2, 3], 'id')
  .vehicles([1, 2, 3], 'id')
  // set a title, text and a type
  .details('title', 'description')
  // set prioity flag to true
  .isPriority()
  // send as push alarm
  .sendPush()
  // set foreign operation id (e.g. from external software)
  .foreignId('external id 123')
  // ...
  .build();
```

<b>Retrieve alarms</b>

```ts
const alarms = await diveraClient.getAlarms();
const alarm = await diveraClient.getAlarm("alarm id");
```

<b>Create, Close, Archive and Delete an Alarm</b>

```ts
// Create an alarm
const resp = await diveraClient.createAlarm(alarm);
// Close an alarm with an optional report
await diveraClient.closeAlarm(resp.data.id, 'some report');
// Archive an alarm
await diveraClient.archiveAlarm(resp.data.id);
// Delete the alarm
await diveraClient.deleteAlarm(resp.data.id);
```

### Vehicles (`/v2/using-vehicles`)

<b>Set Vehicle Status</b>

```ts
const vehicleId = 1;
const vehicleStatus = 3;
const optionalPosition = {
  lat: 53.551086,
  lng: 9.993682,
};
await diveraClient.setVehicleStatus(
  vehicleId,
  vehicleStatus,
  'optional status note',
  optionalPosition,
);
```

### Error handling

The package is non throwing for requests (except for `getAccessToken`). Every error will be represented as a `DiveraResponse`. The success is indicated with the `success` property.
An error response is equivalent to the response from Divera. If the errors origin is the package, the `error` property will contain the error message.

## Contributing

If you have a feature request, or you caught an error please create an issue.

If you want to create a new endpoint create a new folder under ./src/endpoints with the name of the root path of the
endpoint and extend the `BaseClient`. Register the Endpoint Class in the `index.ts` file.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Shameless Plug

We are using the package over at [Kordis](https://github.com/kordis-leitstelle/kordis), an open-source software for rescue operations control centres. Come check it out and contribute if you like!
Also, if you are looking for Geospatial Tools such as Geocoding, Address Autocompletion and general Location Intelligence check out [Cartesius](https://cartesius.io/).
