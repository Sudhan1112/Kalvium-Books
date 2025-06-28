# 🛠️ 1. Base image for building (Node + Alpine = light + fast)
FROM node:18-alpine AS build

# 📂 2. Set working directory in container
WORKDIR /app

# 📦 3. Copy only dependency files (for layer cache boost)
COPY package.json package-lock.json ./

# 📥 4. Install Node modules (Build-time step)
RUN npm install

# 💾 5. Copy rest of the source code
COPY . .

# 🏗️ 6. Build the production files (Vite → /dist)
RUN npm run build

# 🚀 7. Use NGINX to serve the static build
FROM nginx:alpine

# 🗂️ 8. Copy built files into NGINX's root directory
COPY --from=build /app/dist /usr/share/nginx/html

# 🧠 9. Start NGINX in foreground (Docker needs 1 active process)
CMD ["nginx", "-g", "daemon off;"]

