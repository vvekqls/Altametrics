# Altametrics

## Setup

- Install dependencies on client folder & server folder
  - ```sh
    npm install
    ```
### Environment variables

- Copy and paste .env.example variables into a .env file or create your own variables.

### Run Docker
- Setup the database - make sure Docker is running first
- Run database migrations and seed data:
  - ```sh
    docker compose up --build
    docker-compose exec server npx prisma migrate dev --name init
    docker-compose exec server npm run seed
    ```

### Starting Server

```sh
npm run dev
# go to http://localhost:3000
```

### Starting Client
- Use the Prisma CLI to generate the Prisma Client:
```sh
npm run start
```






