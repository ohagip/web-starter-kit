
# アップデート
- <a href="https://nodejs.org/ja/">Node.jsバージョンアップ</a> v12.18.0(安定版)
- README.md <a href="https://github.com/1-10/web-starter-kit/blob/v2020/README.md">レギュレーションテンプレ追加</a>（案件単位で調整してください）
- uglifyjs-webpack-plugin非推奨のため、<a href="https://webpack.js.org/plugins/terser-webpack-plugin/">terser-webpack-plugin</a>に変更
- issues3: <a href="https://github.com/1-10/web-starter-kit/issues/3">gulp-connect-php修正対応</a>
- src/assets/jsの`@js`のエイリアス追加 <a href="https://webpack.js.org/configuration/resolve/#resolvealias">[webpack configuration]</a>
- server起動コマンド変更 `npm run server` → `npm run srv`
- build時のAPIの書き換え処理（dev, stg, prd等環境に合わせたAPIのURLに書き換え等）
- tasksに<a href="https://github.com/1-10/web-starter-kit/blob/v2020/gulpfile.babel.js/tasks/ejs.js">ejs追加</a>（タスク登録は案件単位で設定）
- distコマンド追加 distフォルダにファイル生成オプション追加
