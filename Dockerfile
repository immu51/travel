# Backend only. Railway will use this if present.
FROM node:20-alpine
WORKDIR /app
COPY backend/package.json backend/package-lock.json ./
RUN npm ci --omit=dev
COPY backend/ .
EXPOSE 5000
ENV NODE_ENV=production
CMD ["node", "index.js"]
