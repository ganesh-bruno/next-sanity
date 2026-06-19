# Bruno Blog — Next.js + Sanity

A single Next.js project that includes:

- **Blog frontend** — public site at `/`
- **Sanity Studio** — content management at `/studio`

Both run from one codebase and deploy together.

## Prerequisites

- Node.js 20+
- npm (or pnpm / yarn)
- A [Sanity project](https://www.sanity.io/manage) with a dataset

## 1. Install dependencies

```bash
cd next-sanity
npm install
```

## 2. Environment variables

Copy the example file and fill in your values:

```bash
cp .env.local.example .env.local
```

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | Dataset name (e.g. `production`) |
| `SANITY_API_READ_TOKEN` | Viewer API token for draft mode & live preview |
| `NEXT_PUBLIC_SANITY_STUDIO_URL` | Studio URL (`http://localhost:3000/studio` locally) |
| `NEXT_PUBLIC_SITE_URL` | Blog URL (`http://localhost:3000` locally) |

Create a **Viewer** token at [sanity.io/manage](https://www.sanity.io/manage) → **API** → **Tokens**.

Add your local URL to **CORS origins** (with credentials enabled):

```bash
npx sanity cors add http://localhost:3000 --credentials
```

## 3. Run the project

Start the dev server once — it serves both the blog and Studio:

```bash
npm run dev
```

Then open them separately in your browser:

| App | URL | Purpose |
| --- | --- | --- |
| **Next.js blog (UI)** | [http://localhost:3000](http://localhost:3000) | Public blog homepage, posts, search |
| **Sanity Studio** | [http://localhost:3000/studio](http://localhost:3000/studio) | Create & edit posts, authors, preview content |

You can also reach Studio from the **Studio** link in the blog navbar.

### Visual editing (Presentation Tool)

1. Open Studio at `/studio`
2. Go to the **Presentation** tool
3. Select a post — the blog preview loads in the iframe with live editing overlays

Draft mode is enabled automatically via `/api/draft-mode/enable`.

## 4. Production build

```bash
npm run build
npm start
```

- Blog: `http://localhost:3000`
- Studio: `http://localhost:3000/studio`

## Project structure

```
next-sanity/
├── sanity.config.ts          # Sanity Studio config
├── sanity.cli.ts             # Sanity CLI config
├── src/
│   ├── app/
│   │   ├── (site)/           # Blog routes (navbar + footer)
│   │   │   ├── page.tsx      # Homepage
│   │   │   ├── [slug]/       # Individual post pages
│   │   │   └── search/       # Search results
│   │   ├── studio/           # Embedded Sanity Studio
│   │   └── api/              # Draft mode & search API routes
│   ├── components/           # Blog UI components
│   └── sanity/
│       ├── schemaTypes/      # Post & author schemas
│       ├── presentation/     # Visual editing URL mapping
│       └── lib/              # Sanity client, live fetch, images
└── .env.local                # Local environment variables
```

## Useful scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start blog + Studio in development |
| `npm run build` | Build for production |
| `npm start` | Run production server |
| `npm run lint` | Run ESLint |
| `npm run typegen` | Generate TypeScript types from GROQ queries |

## Deploy

Deploy this folder as a single Next.js app (e.g. Vercel, Netlify).

Set all environment variables on your host. For production, update:

```bash
NEXT_PUBLIC_SANITY_STUDIO_URL=https://your-domain.com/studio
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

Also add your production URL to Sanity CORS origins:

```bash
npx sanity cors add https://your-domain.com --credentials
```

## Content model

| Document type | Fields |
| --- | --- |
| **Post** | title, slug, publishedAt, image, body, author |
| **Author** | name, image, bio |

Edit schemas in `src/sanity/schemaTypes/`.

## Learn more

- [Next.js docs](https://nextjs.org/docs)
- [Sanity docs](https://www.sanity.io/docs)
- [Visual editing with Next.js App Router](https://www.sanity.io/docs/visual-editing/visual-editing-with-next-js-app-router)
