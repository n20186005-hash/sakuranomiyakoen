# SakuranomiyaKoen.com

毛馬桜之宮公園を歩く人のための、日本語・単一言語の非公式観光ガイドです。

- Astro + TypeScript
- Tailwind CSS 4（Vite plugin）
- pnpm
- Cloudflare Workers Static Assets
- データベース、ログイン、CMSなし
- Google Analytics 4: `G-HXM22WWPKP`
- 独自ドメイン: `SakuranomiyaKoen.com`

## ページ

- `/` ホーム、基本情報、ルート診断、駅選択
- `/sakura/` 桜の見頃・花見マナー
- `/course/` 30分／60分／90分／半日コース
- `/access/` 最寄り駅・主要駅からの交通・駐車場
- `/gourmet/` 周辺ランチとブラウザ内フィルター
- `/nearby/` 桜ノ宮ビーチ、歴史建築、庭園、美術館
- `/photo/` 撮影時間、構図、撮影マナー
- `/rules/` 公園利用ルール
- `/faq/` FAQ + FAQPage構造化データ
- `/credits/` 写真ライセンス、情報方針
- `/privacy/` プライバシーポリシー

## ローカル開発

Node.js 20.11以上を推奨します。

```bash
corepack enable
pnpm install
pnpm dev
```

ブラウザで `http://localhost:4321` を開きます。

## 型チェックとビルド

```bash
pnpm check
pnpm build
```

静的ファイルは `dist/` に生成されます。

## Cloudflare Workersへデプロイ

初回のみ認証します。

```bash
pnpm exec wrangler login
```

その後、以下でビルドとデプロイを実行します。

```bash
pnpm deploy
```

`wrangler.jsonc` は、`dist/` をWorkers Static Assetsとして配信し、`src/worker.ts` でキャッシュ・セキュリティヘッダーを付与します。

### 独自ドメイン

Cloudflare Dashboardで対象Workerを開き、**Settings → Domains & Routes → Add Custom Domain** から次を追加します。

```text
sakuranomiyakoen.com
```

`www.sakuranomiyakoen.com` を利用する場合は、別途Custom Domainとして追加し、Cloudflare Redirect Rulesで非wwwへ301転送してください。

## 更新箇所

主要コンテンツは次のファイルにまとめています。

```text
src/data/site.ts
```

ここで以下を更新できます。

- 基本情報
- 時間別コース
- 見どころ
- 飲食店
- FAQ
- 写真クレジット

桜の開花状況や飲食店営業時間は変動するため、リアルタイム表示を装わず、最終確認日と注意書きを維持してください。

## 写真

写真はすべてローカル配信です。元画像はWikimedia Commonsから、商用利用可能なCC0 / CC BY-SAライセンスのものを使用し、WebPへ変換しています。

著作者、作品名、ライセンス、出典URLは以下に掲載しています。

- サイト内: `/credits/`
- データ: `src/data/site.ts` の `photoCredits`

CC BY-SA画像を差し替え・再加工する場合は、各ライセンスの表示・継承条件を確認してください。

## 外部通信

通常ページでの外部通信は、次に限定しています。

- Google Analytics 4
- アクセスページのGoogle Mapsリンク（ユーザー操作時のみ）
- クレジットページのWikimedia Commonsリンク（ユーザー操作時のみ）

地図iframe、外部Webフォント、外部画像CDNは使用していません。

## SEO

- ページ別title / description / canonical
- Open Graph / Twitter Card
- `TouristAttraction` 構造化データ
- `FAQPage` 構造化データ
- `BreadcrumbList` 構造化データ
- `robots.txt`
- `sitemap.xml`
- カスタム404

## ディレクトリ

```text
src/
├── components/
├── data/site.ts
├── layouts/BaseLayout.astro
├── pages/
├── styles/global.css
└── worker.ts
public/
├── images/
├── icon.svg
├── robots.txt
├── sitemap.xml
└── site.webmanifest
```
