# Step 1
installed: npm i drizzle-orm pg dotenv
          npm i -D drizzle-kit tsx @types/pg

# Step 2:
  /lib/db.ts file created --> It triggers the db creation

# Step 3: Setup schema and config related files

1/ created schema folder to keep all the schema files, then a schema files to call them at one single place
2/ created drizzle.config.ts:
  import { defineConfig } from "drizzle-kit";

  export default defineConfig({
    dialect: "postgresql",
    schema: "./src/schema.ts",
    out: "./drizzle", //where is the migration
    dbCredentials: {
      // database: "database",
      // resourceArn: "resourceArn",
      // secretArn: "secretArn",
      url: process.env.DATABASE_URL!,
    },
  });
3/updated package.json scripts with this:
      "db:generate": "drizzle-kit generate",
      "db:migrate": "drizzle-kit migrate",
      "db:studio": "drizzle-kit studio",
      "db:push": "drizzle-kit push",
      

# Step 4: Better auth installation: https://better-auth.com/docs/installation

1/ install better auth and set up env files
2/ create lib/auth.ts
3/ run `npx auth@latest generate` to get migraion/schema files in the root directory. then move it to lib/schemas/

# Step 5: what types of login do you want
1/ edit auth.ts
2/ add mount handler --> add routes.ts at app/api/auth/[...all]/routes.ts
3/ create a client instance
4/ setup session, plugin in auth.ts


# Step 6: Form page creation 
- creating the login & signup tsx page at /app/auth/login/page:
- No signin form yet
-  signin and signup pages in /app/auth/login/_components/sign-up-tab.tsx and app/auth/login/_components/sign-in-tab.tsx
-  then we will call them in app/auth/login/page.tsx
  
# Step 7: 