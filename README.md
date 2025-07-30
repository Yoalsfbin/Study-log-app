# learning-log-app
学習記録を管理するアプリケーションです。（開発中）

バックエンドに Laravel、フロントエンドに React（TypeScript + Vite）を使用し、PostgreSQL を DB としています。

## 🔧 使用技術

### ✅ バックエンド（`backend/`）

- Laravel 12.x
- Laravel Sail（Docker ベース開発環境）

### ✅ フロントエンド（`frontend/`）

- React 19
- TypeScript 5
- Vite 7

### ✅ データベース（Docker コンテナ）

- PostgreSQL 15  
  （`docker-compose.yml` にて Laravel Sail 経由で構築）
