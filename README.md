

---

# α ver.2

## 残タスク
### <strong style="color:#3D978D">次回までに個々にアイデアまとめてください。</strong>

- ローカル、ステージング、公開時に、og, 画像パス情報が切り替え・変更が必要な案件の場合どうするか？エンプレートエンジンを使うか？
<br>　→ 例）EJS, Handlebars, html-webpack-plugin etc...
- 基本的なコマンド名とタスク内容を決める。
<br>　→ コマンド例) 開発: dev, ステージング: stg, プロダクト: prod
- コマンドは、package.jsonで管理し、README.mdにコマンド内容を記載する。
<br>　→ コマンドが決まり次第反映 (仮で追加：npm run dev, npm run prod)


## 対応済
- jsの圧縮うまくできていないので確認する
<br>　→ 解決済み
- sassのコンパイルエラーの確認
<br>　→ インストールコマンド問題で解決
- webpack.config.jsonは、gulp.configに統合
<br>　→ config.jsonにファイル名も変更
- 開発用ビルドではソースマップを追加する
<br>　→ 対応済み
- webpackサーバーを導入する。
<br>　→ browserSync設定で行けるので導入見送り


<br>
<br>

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
│ ├ config.js [taskのパラメーター設定]
│ ├ index.js [gulp task設定]
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

### コマンドリスト
#### インストール
開発環境インストールコマンド。package-lock.jsonのモジュールのバージョンを揃えるため`npm ci`を使用。
```
npm ci
```

#### htdocsフォルダ一式生成
 <a href="https://github.com/1-10/1906_id_programming-style" target="_blank">1-10/1906_id_programming-style</a>のフォルダ構成一式ダウンロードします。※必要な時のみ使用。
```
npm run mkhtdocs
```

#### 開発
コマンドの説明
```
npm run dev
```

#### プロダクト
コマンドの説明
```
npm run prod
```

#### xxxコマンド名
コマンドの説明
```
npm run xxx
```

<br>
<br>
---
---

# Log


# α ver.1
2019-6-17

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
