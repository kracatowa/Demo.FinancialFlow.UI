# Demo.FinancialFlow.UI

The frontend is built with React to provide a smooth and responsive user experience. It allows users to upload financial files, track their processing, and visualize key insights through interactive dashboards — all seamlessly connected to the backend and cloud infrastructure.

## Authentication

This application now supports **cloud-agnostic authentication**. You can configure it to use various identity providers (such as Azure Entra ID, Auth0, Okta, etc.) by updating environment variables and the authentication configuration.

- The authentication provider is set up in [`src/main.tsx`](demo.financialFlow.ui/src/main.tsx) using a generic `AuthProvider` component and a configuration file at [`src/components/login/AuthConfig.ts`](demo.financialFlow.ui/src/components/login/AuthConfig.ts).
- Users are required to sign in with their chosen identity provider to access protected routes.
- The [`RequireAuth`](demo.financialFlow.ui/src/components/login/RequiredAuth.tsx) component protects pages and redirects unauthenticated users to the login page.
- Environment variables (such as `VITE_AUTH_PROVIDER`, `VITE_CLIENT_ID`, `VITE_TENANT_ID`, `VITE_REDIRECT_URI`, etc.) are used for configuration depending on the provider.

### Switching Providers

To change the authentication provider, update the relevant environment variables in your `.env.development` file. For example:

```
VITE_AUTH_PROVIDER=azure
VITE_TENANT_ID=your-tenant-id
VITE_CLIENT_ID=your-client-id
VITE_REDIRECT_URI=http://localhost:5173
```

Or for Auth0:

```
VITE_AUTH_PROVIDER=auth0
VITE_AUTH0_DOMAIN=your-auth0-domain
VITE_CLIENT_ID=your-client-id
VITE_REDIRECT_URI=http://localhost:5173
```

Refer to [`src/components/login/AuthConfig.ts`](demo.financialFlow.ui/src/components/login/AuthConfig.ts) for supported providers and configuration details.

## Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Configure environment variables:**

   Create a `.env.development` file in `demo.financialFlow.ui/` with the settings for your chosen provider.

3. **Run the development server:**
   ```sh
   npm run dev
   ```

4. **Build for production:**
   ```sh
   npm run build
   ```

## Project Structure

- [`src/main.tsx`](demo.financialFlow.ui/src/main.tsx): App entry point, routing, and authentication provider setup.
- [`src/components/login/AuthConfig.ts`](demo.financialFlow.ui/src/components/login/AuthConfig.ts): Authentication configuration for multiple providers.
- [`src/components/login/RequiredAuth.tsx`](demo.financialFlow.ui/src/components/login/RequiredAuth.tsx): Route protection.
- [`src/pages/Home.tsx`](demo.financialFlow.ui/src/pages/Home.tsx): Home page with login button.
- [`src/pages/About.tsx`](demo.financialFlow.ui/src/pages/About.tsx): About page.

## Features

- **Cloud-agnostic authentication** for secure access with multiple providers.
- Modern React UI with routing and component-based structure.
- Ready for integration with backend APIs and cloud services.

---