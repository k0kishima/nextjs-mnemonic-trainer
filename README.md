## Local Development

### Installation

#### 1. Start the MySQL database container:

```bash
$ docker-compose up -d
```

#### 2. Configure environment variables:

```bash
$ cp .env.example .env
$ vim .env
```

#### 3. Install dependencies:

```bash
$ npm install
```

#### 4. Apply database migrations:

```bash
$ npx prisma migrate dev
```

#### 5. Database seeding:

```bash
$ npx prisma db seed
```

#### 6. Start the development server:

```bash
$ npm run dev
```
