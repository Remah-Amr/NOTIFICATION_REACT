FROM node:20.5.1-alpine3.17 AS BUILD_IMAGE

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build


FROM node:20.5.1-alpine3.17 AS create-build

WORKDIR /app
COPY --from=BUILD_IMAGE /app/package*.json ./
COPY --from=BUILD_IMAGE /app/.next ./.next
COPY --from=BUILD_IMAGE /app/public ./public
COPY --from=BUILD_IMAGE /app/node_modules ./node_modules
ENV NODE_ENV=production
CMD ["npm", "start"]