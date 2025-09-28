# --- build stage ---
FROM node:20-alpine AS build
WORKDIR /app

# 1) Install deps first
COPY package*.json ./
ENV NG_CLI_ANALYTICS=ci
RUN npm ci --legacy-peer-deps

# 2) Copy the rest of the source
COPY . .

# 3) Build without prerender/SSR (avoids localStorage server-side errors)
#    You can also use: RUN npx ng build --configuration production --prerender=false
RUN npm run build -- --configuration production --prerender=false

# --- runtime stage ---
FROM nginx:1.27-alpine
# Angular outputs "browser" when SSR is enabled in the workspace; if not using SSR
# the path may be /app/dist/finance-tracker-frontend. Keep this path that matches your repo.
COPY --from=build /app/dist/finance-tracker-frontend/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
