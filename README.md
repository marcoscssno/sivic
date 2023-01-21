# sivic
Sistema de Videoconferência


## What is it?
A web application for scheduling videoconference calls.

## How to run it?

### With Docker

**Step 1:** Clone this repository

```bash
git clone https://github.com/marcoscssno/sivic.git
```

**Step 2:** Change directory to `sivic` folder

```bash
cd sivic
```

**Step 3:** Set up MONGODB_URI and TOKEN_SECRET within `.env.development` and `.env.production` files;

```
MONGODB_URI=mongodb://localhost:27017/sivic
TOKEN_SECRET= # 32 characters long secret
```

**Step 4:** Build Docker image

```bash
docker-compose -f ./docker/docker-compose.dev.yml build
```

or

```bash
docker-compose -f ./docker/docker-compose.prod.yml build
```

**Step 5:** Run Docker containers

```bash
docker-compose -f ./docker/docker-compose.dev.yml up -d
```

or

```bash
docker-compose -f ./docker/docker-compose.prod.yml up -d
```

---

### On your machine

**Important note:** MongoDB is needed in order to run this application.

**Step 1:** Clone this repository

```bash
git clone https://github.com/marcoscssno/sivic.git
```

**Step 2:** Change directory to `sivic` folder

```bash
cd sivic
```

**Step 3:** Set up MONGODB_URI and TOKEN_SECRET within `.env.development` and `.env.production` files;

```
MONGODB_URI=mongodb://localhost:27017/sivic
TOKEN_SECRET= # 32 characters long secret
```

**Step 4:** Run MongoDB server;

**Step 5:** Install the dependencies;

```bash
yarn install
```

**Step 6:** Run the application.

For development:

```bash
yarn dev
```

For production:

```bash
yarn start
yarn dev
```

---

Happy testing!
