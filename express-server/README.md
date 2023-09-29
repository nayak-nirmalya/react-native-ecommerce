# Node.js Express API for Shop System with SQL Database & TypeScript

This is a simple dummy API that connects to a SQL database and provides a REST API for a shop system. Plug in your [Neon Database](https://neon.tech/) and get started!

Credits for the fake product data to [Fake Store API](https://fakestoreapi.com/).

## Installation

Add your database credentials to the .env file, then run:

```bash
npm install
```

## Usage

To start the server, run:

```bash
npm run dev
```

## Available commands

Running commands with npm `npm run [command]`

| command      | description                                |
| :----------- | :----------------------------------------- |
| `build`      | start building final version               |
| `dev`        | start dev server                           |
| `start`      | start build server                         |
| `start:prod` | start build server with production Neon DB |
| `generate`   | generate .sql with defined schema          |
| `migrate`    | sync generated .sql to Neon DB             |
