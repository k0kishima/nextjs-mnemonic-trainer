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

## Production

### Deployment

This project is deployed on Vercel and uses Neon as the managed PostgreSQL database. Follow these steps to deploy your application to production:

1. **Set up the database on Neon:**

   - Create a new PostgreSQL database on Neon.
   - Note down the connection details provided by Neon.

2. **Set up environment variables on Vercel:**

   - Go to your project settings on Vercel.
   - Add the required environment variables, including the database connection details from Neon, under the "Environment Variables" section.

3. **Deploy your application:**

   - Push your code to the main branch of your repository.
   - Vercel will automatically detect the push and start the deployment process.

4. **Access your application:**

   - Once the deployment is complete, you can access your application at the provided URL.

### Database Migration and Seeding

Database migrations and seeding are automatically handled during the build process. Ensure that the build command in your `package.json` includes the necessary scripts:

```json
"scripts": {
  "build": "prisma migrate deploy && prisma db seed && next build"
}
```
