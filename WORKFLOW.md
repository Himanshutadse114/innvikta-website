# Innvikta Website - Team Workflow

## Roles & Repositories
* **Samruddhi (Frontend):** Develops the frontend UI/UX and pushes code to her repository.
* **Himanshu (Backend/Integration):** Pulls Samruddhi's frontend, integrates it with the PHP backend, fixes configuration/API issues, and pushes the production-ready code to his repository (`Himanshutadse114/innvikta-website`).
* **Live Server (`103.86.177.53`):** Hosts the production Next.js application and the Apache PHP backend. Pulls strictly from Himanshu's repository.

## Step-by-Step Flow

### 1. Frontend Development (Samruddhi)
1. Samruddhi works on the Next.js frontend code.
2. She commits and pushes her changes to her own Git repository.

### 2. Integration & Backend (Himanshu's Local Machine)
1. Himanshu pulls Samruddhi's latest changes into his local workspace.
   ```bash
   git pull <samruddhi_remote> <branch_name>
   ```
2. He resolves any merge conflicts (prioritizing backend/API configurations over raw frontend changes).
3. He tests the Next.js frontend to ensure it connects correctly to the PHP backend.
4. **CRITICAL:** Ensures that `NEXT_PUBLIC_PHP_BACKEND_URL` and other environment/API paths are correctly pointing to the production or local server as needed. (e.g., using absolute URLs instead of relative paths for PHP APIs).
5. Himanshu commits and pushes the fully integrated code to his repository:
   ```bash
   git add .
   git commit -m "Merged frontend updates and fixed backend integration"
   git push origin main
   ```

### 3. Deployment (Live Server)
1. Log into the live server (`103.86.177.53`).
2. Navigate to the project directory (e.g. `/home/platform/public_html/Innvikta-Website`).
3. Pull the latest integrated code from Himanshu's repository:
   ```bash
   git pull origin main
   ```
4. Install dependencies (if any were added) and rebuild the Next.js production app:
   ```bash
   npm install
   npm run build
   ```
5. Restart the PM2 process to apply changes instantly:
   ```bash
   pm2 restart innvikta
   ```

## Note for AI Assistants
If you are reading this in a new chat, be aware that the code in this workspace acts as the **Integration Layer**. Any changes made here are meant to bridge the gap between the frontend UI and the PHP backend before being deployed to the live server. When helping to resolve merge conflicts from Samruddhi's repo, ensure that API paths (like `API_BASE`) and environment variables are preserved as absolute URLs for the live server, rather than relative paths that break the Next.js server.
