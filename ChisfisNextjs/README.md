This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


## Requirements & Status is here 
https://docs.google.com/spreadsheets/d/1rllTFHqNx_EiLeSAazd7cplOtwJdYf5YNfs5Y8qZieQ/edit?pli=1&gid=0#gid=0

## Setup & run code
1. Import the DB from the sql file
2. 
    run this command in mysql:
    SET PERSIST sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));
3. Update lib/db.js with your db login
4. View .env file; ensure the port is correct; 3000 is standard for react
5. Start mamp, wamp or xampp server (which ever one you use) - localhost:8888 ususally
    (to see the mysql db use the webstart option and navigate to the db)
6. Npm install
7. Npm run dev
8. Search repo for saquitab@gmail.com and replace with your mail to use forgot password
9. Test Users: 
    Property Manager - Toni@email.com, password: 12345
    Tenant - Sarah@email.com, password: 12345



## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
#   c h i s f i s - n e x t j s 
 
 
