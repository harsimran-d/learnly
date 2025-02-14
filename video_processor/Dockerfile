FROM node:lts-alpine  AS build

WORKDIR /app

COPY ../pnpm-lock.yaml ../pnpm-workspace.yaml ./
COPY ../db ./db
COPY ../video_processor ./video_processor

RUN npm install -g pnpm && pnpm install --frozen-lockfile
WORKDIR /app/video_processor
RUN pnpm build

EXPOSE 4000

CMD ["node", "video_processor/dist/index.js"]
