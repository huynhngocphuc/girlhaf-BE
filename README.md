# girlhaf-BE

Backend API dùng chung cho customer và admin, xây dựng với Express, TypeScript và MongoDB.

## Yêu cầu

- Node.js 20+
- pnpm 11+
- MongoDB đang chạy cục bộ hoặc một MongoDB URI hợp lệ

## Chạy local

```bash
pnpm install
Copy-Item .env.example .env
pnpm dev
```

API mặc định chạy tại `http://localhost:3000`.

- Health check: `GET /api/v1/health`
- Swagger UI: `GET /api/v1/docs`

## Scripts

- `pnpm dev`: chạy development với watch mode
- `pnpm build`: build vào thư mục `dist`
- `pnpm typecheck`: kiểm tra TypeScript
- `pnpm db:migrate`: chạy migration lên
- `pnpm db:rollback`: rollback migration gần nhất
- `pnpm db:seed`: tạo dữ liệu mẫu idempotent
- `pnpm db:reset`: xóa database, chạy migration và seed lại

## Cấu trúc

```text
src/
	common/       # Error handling và response contract dùng chung
	config/       # Environment và MongoDB connection
	docs/         # OpenAPI document
	modules/      # auth, user, product, category, cart, order, payment, admin
```