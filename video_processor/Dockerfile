FROM node:lts-alpine
RUN apk add --no-cache ffmpeg
WORKDIR /app

COPY ../pnpm-lock.yaml ../pnpm-workspace.yaml ./
COPY ../db ./db
COPY ../video_processor ./video_processor

RUN npm install -g pnpm && pnpm install --frozen-lockfile
WORKDIR /app/db
RUN  pnpm prisma generate && pnpm build
WORKDIR /app/video_processor
RUN pnpm build

EXPOSE 4000

CMD ["node", "dist/index.js"]
