# Divera 24/7 API Wrapper

An unofficial Node package to interface with Divera 24/7 by wrapping the mess the API is into a usable library. This is
not in any way affiliated with divera247.com / DIVERA GmbH.<br>
Official Divera API Documentation can be found here: https://api.divera247.com/

## Current features finished and planned

Below are all the request types the package supports currently (ticked) and the ones that are currently not implemented
but planned to be.

- [ ] Alarm
  - [ ] Create Alarm
  - [ ] Read Alarm
  - [ ] Delete Alarm
  - [ ] Alarm User Responses
- [ ] Pull all
  - [ ] Read Groups

## Getting Started

These instructions will show you how to use this package in your project. If you want to contribute, check
_Contributing_.

### Prerequisites

If you, for whatever reason, want to use this package fronted wise, it is possible since `axios` supports browsers.

### Installing

_not published yet_

```shell
npm i divera247-api-unofficial
```

## Usage

_this is currently in the making!_<br>
After installing the package you can use it as shown below.

### Authorize

If you want to Authorize by user credentials (e.g. with a system user) you can get an access token with the `Auth`
class.

```js
const auth = DiveraClient.factorAuthEndpoint();
const accessToken = await auth.getAccessToken("username", "password");
```

### Declare the client

```js
const diveraClient = new DiveraClient(accessToken);
```

### Pull All (`/v2/pull/all`)

The Divera API is (imo) kind of badly designed in many aspects. E.g. there is an endpoint that returns all the data
related to an organization. If you want to retrieve specific data, such as groups, you always need to query `/pull/all`
which returns pretty much everything. The `PullAll` class wraps this mess and lets you choose and extract specific data.

```js
const pullAllEndpoint = diveraClient.factorPullAllEndpoint();
```

<b>Groups</b>

```js
const groups = await pullAllEndpoint.getGroups();

// Get Groups sorted by Divera provided `groupsorting`
const sortedGroups = await pullAllEndpoint.getGroups(true);
```

### Alarm (`/v2/alarms`)

```js
const alarmsEndpoint = diveraClient.factorAlarmsEndpoint();
```

<b>Create Alarm</b>

```ts
const alarm: CreateAlarm = {}
```

Or use the builder:

```js
const alarm = new AlarmBuilder()
  // set address of the scene
  .address("Foostreet 1337")
  // set coordinates (lat, lng) of the scene
  .coordinates(50, 40)
  // set unit ids that should receive the alarm
  .groups([1, 2, 3])
  .vehicles([1, 2, 3])
  // set a title, text and a type
  .details("title", "description", "type")
  // set prioity flag to true
  .isPriority()
  // set foreign operation id (e.g. from external software)
  .foreignId()
  .build()
```

Call the Divera API

```js
await alarmsEndpoint.createAlarm(alarm);
```

## Contributing

If you have a feature request, or you caught an error please create an issue.

If you want to create a new endpoint create a new folder under ./src/endpoints with the name of the root path of the
endpoint and extend the class (should be named the same) with `DiveraEndpoint`. Create interfaces (put it in models
folder) for every external use-case.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
