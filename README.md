# chaussette-moto-esgi

Vous faites partie d’un grand groupe moto qui souhaite moderniser sa plateforme avec la mise en
place d’un système d'échange instantané afin de renforcer sa communication auprès de ses clients.


## Project install

```sh
git clone git@github.com:pboitelle/chaussette-moto-esgi.git
```

## Setup Client

```sh
cd client/
npm install
```

### Launch Development Client

```sh
npm run start:client
```

## Setup Server

```sh
cd server/
docker-compose up -d
docker-compose exec node npm install
```

### Launch Development Server

```sh
docker-compose exec node npm run start:server
```