FROM node:24-alpine AS deps
RUN apk add --no-cache libc6-compat curl
WORKDIR /app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
    if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm i; \
    elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
    else echo "Lockfile not found." && exit 1; \
    fi



FROM node:24-alpine AS builder
WORKDIR /app
COPY . .
RUN apk add --no-cache curl
RUN npm i
RUN npm install --unsafe-perm -g sharp

ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build



FROM node:24-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# COPY --from=builder /app/styles ./styles
COPY --from=builder /app/public ./public

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000

CMD ["npm", "start"]
