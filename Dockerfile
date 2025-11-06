# --- Builder Stage ---
  FROM node:20 AS builder

  WORKDIR /app
  
  ENV NEXT_TELEMETRY_DISABLED=1
  
  COPY package*.json ./
  RUN npm install --force
  
  COPY . .
  RUN npm run build
  
  # --- Production Stage ---
  FROM node:20 AS production
  
  WORKDIR /app
  
  ENV NODE_ENV=production
  ENV NEXT_TELEMETRY_DISABLED=1
  
  # Only copy necessary files from builder
  COPY --from=builder /app/public ./public
  COPY --from=builder /app/.next ./.next
  COPY --from=builder /app/node_modules ./node_modules
  COPY --from=builder /app/package.json ./package.json
  COPY --from=builder /app/next.config.ts ./next.config.ts
  COPY --from=builder /app/tsconfig.json ./tsconfig.json
  
  EXPOSE 3001
  
  CMD ["npm", "start"]
