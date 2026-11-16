# 屋宇署結構工程師（合約）面試溫習

本儲存庫是一份個人溫習彙編，用來準備屋宇署結構工程師（合約）（職位編號 50460）面試。它不是屋宇署、公務員事務局或任何政府部門的官方網站或出版物。

網站內的題目、模範答案和進度記錄只供私人溫習。條文、守則和作業備考的權威現行版本，永遠以 [屋宇署](https://www.bd.gov.hk) 及 [香港電子法例](https://www.elegislation.gov.hk) 為準。

## 官方文件

官方文件收在 [`docs/`](docs/README.md)。目錄以繁體中文說明每份文件是甚麼、為何與這個職位有關、版本和官方來源。版權說明見 [`docs/COPYRIGHT.md`](docs/COPYRIGHT.md)。

《小型工程監管制度技術指引》因檔案超過 GitHub 單檔上限，以 Git LFS 存放。複製後請執行 `git lfs pull`。

## 溫習程式

同目錄有一個 Next.js 溫習程式。題庫、作答草稿、書籤和「仍未熟悉」只存在瀏覽器的 `localStorage`，沒有資料庫，也不需要環境變數。

```bash
npm install
npm run dev
```

瀏覽器會打開本機位址。正式建置：

```bash
npm run build
npm start
```

## 題庫

| 檔案 | 作用 |
| --- | --- |
| `data/topics.json` | 十二個課題的 id、名稱、簡介和排序 |
| `data/questions.json` | 全部情境題和選擇題 |

`src/lib/bank.ts` 在建置時讀入這兩份 JSON。每題包含：

- `id`：唯一，例如 `pq61`
- `topicId`：對應 `topics.json` 的 id
- `kind`：`scenario` 或 `mcq`
- `title`、`prompt`：題幹
- `modelAnswer`：模範答案撮要
- `legalBasis`：法例或官方出處，每項有 `label`、`note`、`url`
- `pitfalls`：常見陷阱
- 選擇題另有 `options`（`id` 由 A 至 D，加上 `text`）和 `answerKey`

判詞只可寫入已標明香港法例或屋宇署綱領的條文。稱不到判詞時，答案會標明名稱和事實差距，不會當成一宗判詞。

## 強制驗樓

驗樓計劃和強制驗樓有獨立說明，頁面在 `/mbis`，課題 id 是 `mbis`。驗窗部分只整理法例上的時間表，以及強制驗樓和強制驗窗的分別。

## 部署

1. 把這個儲存庫推送到 GitHub。
2. 在 Vercel 匯入 Git 儲存庫，加入這個目錄。
3. Framework Preset 用 Next.js。Build Command 維持 `npm run build`，Output 不用改。
4. 不需要環境變數，然後 Deploy。
5. 之後每次推送到所選分支，Vercel 會重新建置。題庫改動後要重新部署，因為 JSON 在建置時讀入。
