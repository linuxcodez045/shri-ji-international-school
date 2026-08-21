# Shriji International School — Vercel deployment

This folder contains the complete Next.js website and every optimized image required for deployment.

## Deploy with the Vercel dashboard

1. Extract the ZIP file.
2. Upload this folder to a new GitHub, GitLab, or Bitbucket repository.
3. In Vercel, choose **Add New → Project** and import that repository.
4. Leave **Framework Preset** as **Next.js** and keep the default build settings.
5. Select **Deploy**.

No environment variables, database, or backend service are required.

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Verify before deploying

```bash
npm run lint
npm run build
```

The admission enquiry is intentionally a frontend-only demonstration: it does not transmit or store information. School management should confirm all content and contact details before public release, including the final postal PIN.
