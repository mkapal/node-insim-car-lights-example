# Node InSim Demo - Car Lights

A simple demo application using [Node InSim](https://github.com/simbroadcasts/node-insim) to connect to [Live for Speed](https://www.lfs.net/) (LFS) and control car lights.

## Requirements

- [Node.js](https://nodejs.org)
- [Live for Speed](https://www.lfs.net/)

## Installation

```shell
npm install
```

## Connecting to LFS

If you want to connect to LFS locally, start LFS and enable InSim by typing `/insim 29999` (or any other port of your choice).

Open the command line and run `npm start`.

This application connects to `127.0.0.1:29999` by default. You can change the host or port by editing [index.ts](./index.ts).

If you want to connect to a remote LFS host, use the InSim port that is assigned to your LFS host.

## Usage

Once the application is connected, type `!lights on` or `!lights off` into the chat to toggle the car's high beam.
