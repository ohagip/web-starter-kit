
# α ver.1

## 概要
- gulp4 + webpack4 の構成で作成。
- タスクの内容は、よく使われているものをベースに最小単位で作成。<br>
（追加されてないタスクで、追加してほしいものは各自MTGで提案してください。）


## タスク内容
- gulp: sassコンパイル、webpack実行、ローカルサーバー
- webpack: jsのコンパイル


## タスクファイル構成
- タスクファイル一式は、gulpfile.babel.jsフォルダで管理。
- 各タスクは、tasksフォルダで管理。（taskファイルは直接編集しない想定）
- 追加するタスクがある場合は、tasksフォルダにファイル追加し、index.jsにタスク設定・実行する。
- タスク実行、コマンド設定は、index.jsで行う。
- コマンドは2種。開発コマンド(gulp)とリリースコマンド(gulp build)。
- 開発に応じて、任意でindex.jsファイルにコマンド追加。（タスク単位や開発者で分ける等）


### 開発環境の管轄外（コーディング規約て決める内容）
- ディレクトリ名やファイル名等の構成（サンプルは仮でディレクトリ、ファイル置いています）
- コーディングベースファイル（html, css, js等）
- README.mdフォーマット
- .gitignoreフォーマット


---


## 開発環境

### バージョン
```
node: 10.16.0
npm: 6.9.0
gulp: 4.0.2
webpack: 4.32.2
```

### ファイル構成
```
web-starter-kit/
│
├ gulpfile.babel.js/
│ ├ gulp.config.js [gulp task config設定]
│ ├ index.js [gulp task実行、コマンド設定]
│ ├ webpack.config.js [webpack config設定]
│ └ tasks/ [taskファイル置き場]
│   └ task files...
│
├ htdocs/ [(仮)公開コード]
├ src/ [(仮)開発コード]
├ .gitignore (仮)
├ package-look.json
├ package.json
└ README.md (仮)
```

### コマンド
```
# 開発
gulp

# リリース
gulp build
```


---
