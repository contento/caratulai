# Deploying the site to Cloudflare Pages

The landing site in this folder is deployed by the GitHub Actions workflow
[`.github/workflows/deploy-site.yml`](../.github/workflows/deploy-site.yml).
It runs on every push to `main` that touches `site/**` (or the workflow file
itself) and uploads the folder with Wrangler:

```
pages deploy site --project-name=caratulai --branch=main
```

The workflow only works once the Cloudflare project and repo secrets below
exist. This is one-time setup.

## 1. Create the Cloudflare Pages project

The project name must be exactly `caratulai` (it's hardcoded in the workflow).

```bash
npx wrangler login
npx wrangler pages project create caratulai --production-branch=main
```

Alternatively, in the Cloudflare dashboard: **Workers & Pages → Create →
Pages → Direct Upload**, named `caratulai`.

## 2. Get your Account ID

```bash
npx wrangler whoami
```

Also shown in the right sidebar of any zone's overview page in the dashboard.

## 3. Create an API token

Dashboard → **My Profile → API Tokens → Create Token**. Either use the
"Edit Cloudflare Workers" template or create a custom token with:

- Permission: **Account → Cloudflare Pages → Edit**
- Scoped to your account

Copy the token — it is shown only once.

## 4. Add the GitHub Actions secrets

```bash
gh secret set CLOUDFLARE_API_TOKEN   # paste the token from step 3
gh secret set CLOUDFLARE_ACCOUNT_ID  # paste the account ID from step 2
```

The workflow's deploy job uses `environment: production`. If a "production"
environment with its own secrets is configured under the repo's Settings →
Environments, set the secrets there instead:

```bash
gh secret set CLOUDFLARE_API_TOKEN --env production
gh secret set CLOUDFLARE_ACCOUNT_ID --env production
```

If no such environment exists, GitHub creates it implicitly and repo-level
secrets are picked up fine.

## 5. Attach the custom domain

In the Pages project → **Custom domains**, add `caratul.ai` (and `www` if
wanted). If the `caratul.ai` zone is already on Cloudflare, the DNS record is
wired automatically; otherwise point the domain's nameservers at Cloudflare
first.

## 6. Trigger a deploy

Push a change under `site/`, or run the workflow manually (it has
`workflow_dispatch`):

```bash
gh workflow run deploy-site.yml
```

The first deploy lands at `caratulai.pages.dev`; once the custom domain is
attached, https://caratul.ai serves it.
