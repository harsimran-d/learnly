FROM node:lts-alpine

WORKDIR /app

COPY ../pnpm-lock.yaml ../pnpm-workspace.yaml ./
COPY ../db ./db
COPY ../next_app ./next_app

RUN npm install -g pnpm && pnpm install --frozen-lockfile

WORKDIR /app/db
RUN  pnpm prisma generate && pnpm build

WORKDIR /app/next_app

RUN pnpm install --frozen-lockfile

RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]
