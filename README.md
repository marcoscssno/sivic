# sivic
Sistema de Videoconferência


## What is it?
A web application for scheduling videoconference calls.

## How to run it?

### With Docker

**Step 1:** Clone this repository

`git clone https://github.com/marcoscssno/sivic.git`

**Step 2:** Change directory to `sivic` folder

`cd sivic`

**Step 3:** Set up MONGODB_URI and TOKEN_SECRET within `.env.development` and `.env.production` files;

**Step 4:** Build Docker image

`docker-compose -f docker-compose.dev.yml build`

or

`docker-compose -f docker-compose.prod.yml build`

**Step 5:** Run Docker containers

`docker-compose -f docker-compose.dev.yml up -d`

or

`docker-compose -f docker-compose.prod.yml up -d`

---

### On your machine

**Important note:** MongoDB is needed in order to run this application.

**Step 1:** Clone this repository

`git clone https://github.com/marcoscssno/sivic.git`

**Step 2:** Change directory to `sivic` folder

`cd sivic`

**Step 3:** Set up MONGODB_URI and TOKEN_SECRET within `.env.development` and `.env.production` files;

**Step 4:** Run MongoDB server;

**Step 5:** Run the commands below;

```bash
yarn install
yarn dev
```

---

Happy testing!
