# Music App with Module Federation

A music application built with React and Module Federation, consisting of a main app and a music library micro-frontend.

## Local Development

1. Install dependencies:
   ```bash
   npm run install:all
   ```

2. Start both applications in development mode:
   ```bash
   npm start
   ```
   - Main App: http://localhost:3000
   - Music Library: http://localhost:3003

## Deployment Guide

### Option 1: Deploy to Vercel, Netlify, or similar platforms

1. **Deploy Music Library First**:
   - Create a new project pointing to your repository
   - Set the build command to: `cd music-library && npm install && npm run build`
   - Set the output directory to: `music-library/dist`
   - Set environment variables:
     - `PUBLIC_PATH`: Your production URL with trailing slash (e.g., `https://music-library.yourdomain.com/`)

2. **Deploy Main App**:
   - Create a new project pointing to your repository
   - Set the build command to: `cd main-app && npm install && npm run build`
   - Set the output directory to: `main-app/dist`
   - Set environment variables:
     - `MUSIC_LIBRARY_URL`: URL to the remote entry file (e.g., `https://music-library.yourdomain.com/remoteEntry.js`)

### Option 2: Deploy to a Traditional Host (e.g., AWS S3, DigitalOcean, etc.)

1. Build both applications:
   ```bash
   npm run build
   ```

2. Upload the contents of `main-app/dist` and `music-library/dist` to separate directories or subdomains on your hosting provider.

3. Ensure CORS is properly configured to allow the main app to load resources from the music library.

### Option 3: Docker Deployment

1. Create Docker files for each application
2. Build and deploy the containers
3. Ensure proper networking between containers

## Important Notes for Module Federation in Production

1. **CORS Configuration**: Ensure your hosting provider allows cross-origin requests between your applications.

2. **Environment Variables**: Always set the correct URLs for production environments:
   - `MUSIC_LIBRARY_URL` for the main app
   - `PUBLIC_PATH` for the music library

3. **Order of Deployment**: Always deploy the remote (music-library) first, then the host (main-app).

4. **Cache Invalidation**: When updating the remote, ensure proper cache invalidation strategies are in place.

5. **Error Handling**: Implement fallback mechanisms in case the remote fails to load.
