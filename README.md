# Tarot Diary Backend Project(Express.js)

An Express.js backend API service designed for tarot card drawing and diary logging. This project features user authentication, Google OAuth integration, JWT-based API protection, email verification, and Docker-based development.

## Installation

### Prerequisite

1. Make sure to install [Docker Desktop](https://docs.docker.com/desktop/) or [OrbStack](https://orbstack.dev/) first
2. Ensure that port 3000 is not already in use on your local machine

### Installation and Startup Steps

1. Clone the repository
2. Copy the environment configuration file
```
cp .env.example .env
```
3. Edit the .env file
```
# PostgreSQL username、password、DB name and URL
DATABASE_URL=postgres://<your_user_name>:<your_password>@postgres:5432/<your_DB_name>
POSTGRES_USER=your_user_name
POSTGRES_PASSWORD=your_password
POSTGRES_DB=your_DB_name

# Mailer setting
MAIL_MAILER=smtp
MAIL_SCHEME=your_mailer_encryption_protocol
MAIL_HOST=your_mailer_host
MAIL_PORT=your_mailer_port
MAIL_USERNAME=your_mailer_username
MAIL_PASSWORD=your_mailer_password

# JWT setting
JWT_SECRET=your_jwt_secret
```
4. Launch environment
```
docker compose -f docker-compose.db.yaml -f docker-compose.dev.yaml up -d --build
```
5. Enter the container
```
docker exec -it tarot_diary_expressjs-app-1 bash
```
6. Run the script to generate Drizzle migrations, applies them to the database, and seeds the tarot and tarot specification data using TypeScript scripts.
```
./scripts/init.sh
```
7. Open [http://localhost:3000](http://localhost:3000) to verify that the environment has been set up successfully.