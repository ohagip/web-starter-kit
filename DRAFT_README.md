
# アップデート
- Node.jsバージョンアップ v12.17.0(安定版)
- README.md レギュレーションテンプレ追加（案件単位で調整してください）
- uglifyjs-webpack-plugin非推奨のため、terser-webpack-pluginに変更
- npmコマンドに統一、gulpコマンド廃止
- server起動コマンド変更 `npm run srv`
- distコマンド追加 distフォルダにファイル生成オプション追加



# 草案




-----
## MEMO
- ejs追加
- issues: gulp-connect-phpでphpが動かせない
- api切替（build時）

- dev, stg, prd 設定ファイルの外部化（開発環境に合わせて個別設定）
npm install webpack-dev-middleware --save-dev
- severからwebpack-devserverへ変更
- sassフォルダ、commonとresetを別フォルダに変更（意味別に分離）







npm run dev
npm run stg
npm run prd

----------
		"build:dev": "cross-env NODE_ENV=\"dev\" gulp",
		"build:stg": "cross-env NODE_ENV=\"stg\" gulp",
		"build:prd": "cross-env NODE_ENV=\"prd\" gulp",

dist/
	dev/
	stg/
	prd/

npm run build:dev
npm run build:stg
npm run build:prd


