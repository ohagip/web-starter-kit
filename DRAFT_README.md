


▼issues
・promise/async/awaitコンパイル処理標準装備
	追加しました

・単体でgulp taskを実行できるようにしたい
	下記コマンド追加
	npm run sass
	npm run webpack

・sassのgulp taskが動かない
	gulp-autoprefixer削除
	→ autoprefixer, gulp-postcssに変更
		package.jsonにbrowserslistを記述







▼予定
・Node.jsバージョンアップ v12.17.0(安定版) https://nodejs.org/en/
・npmコマンド推奨、gulpコマンド非推奨
・sassフォルダ、commonとresetを別フォルダに
・dev, stg, prd 設定ファイルの外部化（個別設定しやすくするため）
・dev, stg, prd書き出し時に外部API URL切替機能

・README.md 対応ブラウザリストテンプレ（案件単位で調整してください）
```
Desktop
	Mac: OS 10.14以降
			Chrome, Safari, FireFox 最新
	Win: 10
			Chrome, Edege, FireFox 最新
SP
	iPhone: ios 12以上 safari
	Android: Android os6以上 chrome
Tablet:
	iPad: iPad OS 12以上 safari
	Android: Android os6以上 chrome
```

▼issues
・gulp-connect-phpでphpが動かせない



