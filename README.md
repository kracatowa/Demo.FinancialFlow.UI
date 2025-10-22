# Demo.FinancialFlow.UI

The frontend was developed with React to provide a smooth and responsive user experience. It allows users to upload financial files, track their processing, and visualize key insights through interactive dashboards — all seamlessly connected to the backend and cloud infrastructure on Azure.

## Authentication

This application now integrates authentication with **Azure Entra ID** (Microsoft Entra ID, formerly Azure AD) using [MSAL.js](https://github.com/AzureAD/microsoft-authentication-library-for-js) and [`@azure/msal-react`](https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/lib/msal-react).

- The authentication provider is set up in [`src/main.tsx`](demo.financialFlow.ui/src/main.tsx) using [`MsalProvider`](demo.financialFlow.ui/src/main.tsx) and a configured MSAL instance from [`src/components/login/AuthConfig.ts`](demo.financialFlow.ui/src/components/login/AuthConfig.ts).
- Users are required to sign in with their Azure Entra ID account to access protected routes.
- The [`RequireAuth`](demo.financialFlow.ui/src/components/login/RequiredAuth.tsx) component can be used to protect pages and redirect unauthenticated users to the login page.
- Environment variables (`VITE_TENANT_ID`, `VITE_CLIENT_ID`, `VITE_REDIRECT_URI`) are used for configuration.

## Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Configure environment variables:**

   Create a `.env.development` file in `demo.financialFlow.ui/` with:
   ```
   VITE_TENANT_ID=your-tenant-id
   VITE_CLIENT_ID=your-client-id
   VITE_REDIRECT_URI=http://localhost:5173
   ```

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
- [`src/components/login/AuthConfig.ts`](demo.financialFlow.ui/src/components/login/AuthConfig.ts): MSAL configuration.
- [`src/components/login/RequiredAuth.tsx`](demo.financialFlow.ui/src/components/login/RequiredAuth.tsx): Route protection.
- [`src/pages/Home.tsx`](demo.financialFlow.ui/src/pages/Home.tsx): Home page with login button.
- [`src/pages/About.tsx`](demo.financialFlow.ui/src/pages/About.tsx): About page.

## Features

- **Azure Entra ID authentication** for secure access.
- Modern React UI with routing and component-based structure.
- Ready for integration with backend APIs and Azure services.

---
