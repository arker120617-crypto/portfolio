# AR KER Portfolio

HTML / CSS / JavaScript のみの静的ポートフォリオです。ビルド不要です。

## フォルダ構成
```
index.html          ページ本体(文章はここ)
css/style.css       デザイン(色は先頭の --accent など)
js/main.js          設定: CONFIG / WEB_PROJECTS / PHOTOS / VIDEOS
images/profile/     プロフィール写真 (profile.jpg)
images/projects/    作品サムネイル
images/photography/ 写真作品
videos/  assets/(favicon)  resume/(resume.pdf)
```
`ADD YOUR ...` / `CHANGE YOUR ...` のコメントが変更箇所です。

## 1. GitHubへアップロード
1. GitHubで新規リポジトリ(例: `portfolio`)を作成
2. このフォルダで実行:
```
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/ユーザー名/portfolio.git
git push -u origin main
```

## 2. GitHub Pagesで公開
Settings → Pages → Source: `Deploy from a branch` → Branch: `main` / `(root)` → Save。
数分後 `https://ユーザー名.github.io/portfolio/` で公開されます。公開URLを `index.html` のOpen Graph設定にも反映してください。

## 3. プロフィール写真
`images/profile/profile.jpg` を置き換えます(縦長4:5推奨、500KB以下)。

## 4. Projectsを追加
- Web: `js/main.js` の `WEB_PROJECTS` に1件コピーして編集(GitHub/DemoのURLもここ)
- 写真: 画像を `images/photography/` に入れ、`PHOTOS` に1行追加。削除は行を消すだけ
- 映像: `VIDEOS` に追加。`url` はYouTube埋め込みURL(`https://www.youtube.com/embed/動画ID`)か `videos/xxx.mp4`

## 5. 履歴書PDF
`resume/resume.pdf` として保存します(名前を変える場合は `index.html` のhrefも変更)。

## 6. Email・電話・SNS
`js/main.js` 先頭の `CONFIG` に入力します。空欄は「未設定」表示、SNSボタンは非表示になります。

## 7. Contact Formを使えるようにする
1. https://formspree.io に登録し、New Formを作成(通知先メールを設定)
2. 発行された `https://formspree.io/f/xxxxxxxx` を `CONFIG.formEndpoint` に貼り付け
3. 公開後、自分宛てにテスト送信

未設定の間は送信せず「設定が必要」と表示します。

## 補足
スキルは正直に「Learning」表記です。身についたら `index.html` の `tag` 表示を削除してください。
