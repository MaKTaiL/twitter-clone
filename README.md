# Basic Twitter Clone (WIP)

This is a web application built with Next.js, NextAuth.js, Prisma, Tailwind and Tanstack Query.

## Getting Started

To get started, clone this repository and install the dependencies:

``` cmd
git clone https://github.com/MaKTaiL/twitter-clone.git
cd twitter-clone
npm install
```

Next, copy the .env.example file in the root directory of the project and add the following environment variables:

``` .env
DATABASE_URL=""
SHADOW_DATABASE_URL=""

NEXTAUTH_SECRET=""
NEXTAUTH_URL="http://localhost:3000"

DISCORD_CLIENT_ID=""
DISCORD_CLIENT_SECRET=""
```

I used a PlanetScale database originally, so make sure you make the appropriate changes to the prisma.schema if you use a different database.
Replace the values with your own database URL, Discord client ID, and Discord client secret.

Then, run the database migrations:

``` cmd
npx prisma migrate dev
```

Finally, start the development server:

``` cmd
npm run dev
```

## Features

- Next.js for server-side rendering and client-side JavaScript
- NextAuth.js for authentication with Discord
- Prisma for database access and migrations
- Tailwind for styling
- Tanstack Query for asynchronous state management
