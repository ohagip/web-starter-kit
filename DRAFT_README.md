
# アップデート
- Node.jsバージョンアップ v12.17.0(安定版)
- README.md レギュレーションテンプレ追加（案件単位で調整してください）（藤原）
- uglifyjs-webpack-plugin非推奨のため、terser-webpack-pluginに変更（萩原）
- server起動コマンド変更 `npm run server` → `npm run srv`
- distコマンド追加 distフォルダにファイル生成オプション追加（藤原・中村）
- tasksにejsを追加（タスク登録は案件単位で設定）
- @jsのエイリアス追加（src/assets/js）
https://kitak.hatenablog.jp/entry/2017/09/04/192010



# 草案
- css-mqpacker


-----

## MEMO
- issues: gulp-connect-phpでphpが動かせない
- api切替（build時）

npm install webpack-dev-middleware --save-dev
- severからwebpack-devserverへ変更
- sassフォルダ、commonとresetを別フォルダに変更（意味別に分離）
