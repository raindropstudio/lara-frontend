# 빌더 스테이지
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# 러너 스테이지
FROM node:20-alpine AS runner

WORKDIR /app

# 프로덕션 종속성만 설치
COPY package*.json ./
RUN npm ci --only=production

# 빌더에서 필요한 파일들만 복사
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/.nuxt ./.nuxt

EXPOSE 3000

CMD [ "npm", "run", "start" ]