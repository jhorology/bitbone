{
    /*
     * Enforcing options
     * これらにtrueを設定することで、JSHintはより厳しく警告を出すようになる。
     */

    // ビット演算子^、|等を禁ずる。
    // JavaScriptにおいてビット演算子が必要になることは稀なので、&は&&のタイポだったりする。
    "bitwise": false,

    // 変数名をキャメルケース、または大文字のアンダースコア区切りのみとする。
    // (ex) camelCase、UPPER_CASE
    "camelcase": true,

    // ループや条件分岐のブロックをブレイス{}で囲うことを強制する。
    "curly": true,

    // ==、!=を禁止して===、!==を強制する。
    // 前者の等価演算子は、予期せぬ振る舞いをするため。
    "eqeqeq": true,

    // ECMAScript 3の仕様に乗っ取ることを強いられる。
    // 旧IE等のレガシーな環境対策用。
    "es3": true,

    // for-inループでオブジェクトのプロパティの探査をする際、hasOwnPropertyによるプロパティのチェックを強制する。
    // for-inループでは予期せぬプロパティが含まれる場合があるため。
    "forin": true,

    // Array等ネイティブオブジェクトのプロトタイプの変更を禁止する。
    "freeze": true,

    // パーレン()で囲わない即時関数を禁止する。
    // コードを読む際、関数ではなく関数の実行結果であることが明示されるため。
    "immed": true,

    // インデント幅を強制する。以下の例ではスペース4つでないと警告が出る。
    "indent": 4,

    // 変数を定義前に使うことを禁止する。
    // JavaScriptは関数スコープであり、ホイスティングによって変数は関数トップで宣言されたことになるため、これがバグの元になる得る。
    // 安全にコードを書くためには (C言語的に) 関数のトップで明示的に宣言するべきである。
    // このオプションをnofuncにすると、関数宣言は警告の対象に含めないようになる。
    "latedef": true,

    // コンストラクタ関数の名前は大文字で始めることを強制する。
    // これにより、new演算子で呼び出す関数であることを明示する。
    // コンストラクタ関数をnewなしで呼び出すと、呼び出し自体はできて、thisがグローバルオブジェクトを指してバグが起きるため。
    "newcap": true,

    // arguments.caller、arguments.calleeを禁止する。
    // 変態チックで実は個人的に好きだが、プロダクトのコードで使うのはアレだ。
    // 恐らくトリッキーさゆえに、そもそもECMAScript 5で禁じられた (なのでStrict Modeでは使えない)。
    "noarg": true,

    // 空のブロックがあると警告を発する。
    "noempty": true,

    // コンストラクタ関数をnewで呼び出した値を変数に格納することを強制する。
    // 生成されたオブジェクトを再利用しないのであれば、newの利点を享受できないため。
    "nonew": true,

    // ++、--の使用を禁止する。
    // これらの演算子がコードクオリティを下げるという主張もあるため (Python文化圏とか) 。
    "plusplus": false,

    // クオーテーションマークの一貫性を強制する。
    // true、single、doubleのいずれかを指定する。
    // true: シングルクオーテーションでもダブルクオーテーションでもいいがどちらかに統一することを強制
    // single: シングルクオーテーションを強制
    // double: ダブルクオーテーションを強制
    "quotmark": "single",

    // var宣言されていない変数を使用することを禁止する。
    // 変数のタイポだったり、うっかりvar忘れの検知に便利（var忘れはglobal変数へのアクセスになって危険）。
    // 別ファイルで宣言している変数を利用したい場合、/*global ... */によってJSHintに宣言してない変数だけど怒らないでね、と伝えることができる。
    // (ex)
    // /*global hoge */
    // console.log(hoge); // 宣言していない変数hogeを使ってもOK
    "undef": true,

    // 宣言しても使っていない変数があったら警告する。
    // 未使用コードの掃除に便利。
    // 加えてこのオプションは、/*global ... */で宣言しているが使っていないグローバル変数も警告してくれる。
    // なお、var宣言した変数については警告するものの、関数の引数で未使用のものについては警告しない。
    "unused": false,

    // 全ての関数に対して、ECMAScript 5のstrict modeを求めるようになる。
    // strict modeは、標準でないJavaScriptを禁止する。
    // やばいんだけどエラーにはならない記述があった場合に、エラーを発するようになる。
    // 加えてJavaScriptエンジンが最適化をしにくくなる記述も修正できる。
    // ※このオプションはstrict modeを関数スコープにのみ強いる。グローバルスコープには強制しない。
    // グローバルスコープに強制してしまうと、サードパーティ製のものがエラーを吐く可能性があるからだ。
    // もしグローバルスコープのstrict modeを強制したい場合はglobalstrictオプションを用いること。
    "strict": true,

    // 行末のホワイトスペースを許さない。
    // 複数行の文字列があったりすると、事故が起きるので。
    "trailing": true,

    // 関数に指定できる引数の数を制限する。
    //"maxparams": 5,

    // ブロックのネスト数を制限する。
    //"maxdepth": 5,

    // 1つの関数に含められるステートメントの数を制限する。
    //"maxstatements": 10,

    // 循環的複雑度（cyclomatic complexity）を制限する。
    // 循環的複雑度っていうのはコードの複雑さの指標で、詳しくはWikipedia参照。
    //"maxcomplexity": 10,

    // 1行あたりの最大文字数を制限する。
    "maxlen": 100,


    /*
     * Relaxing options
     * trueをセットした項目について、JSHintが警告を出さなくなる。
     */

    // セミコロンなしの警告を出さなくなる。
    "asi": false,

    // 条件式を入れる場所で変数への代入をしていても警告を出さなくなる。
    // たとえばif (a = 10) {}はタイポなわけだが、便利なケースもあるので。
    // for (var i = 0, person; person = people[i]; i++) {}
    // 上記は()で囲うことでJSHintを黙らせることができる。
    // for (var i = 0, person; (person = people[i]); i++) {}
    // Ruby文化だとショートに書くのが好まれて、こうした書き方は割とあるかな？
    // C言語系は、逆に==のタイポと紛らわしいので嫌われる印象。
    "boss": false,

    // debugger宣言していても警告を出さなくなる。
    "debug" : true,

    // 比較に===ではなく==を使っても警告を出さなくなる。
    // ==による比較はnull、undefinedのチェックが楽なので（両者がよくも悪くも厳密にチェックされなくなる）
    "eqnull": false,

    // ECMAScript 6独自のシンタックスの使用にお許しが出る。
    // ここでお許しが出る機能はまだ固まってないし、未対応ブラウザもあるので覚悟して使いましょう。
    "esnext": false,

    // evalを利用しても警告が出なくなる。
    // これをevalをevilと呼ぶこのセンス。
    // インジェクションの危険に晒される上、JavaScriptインタプリタが最適化するのが困難になるので、激しくオススメしない。
    "evil": false,

    // x || (x = 1); とかができるようにする
    "expr": true,

    // ifやfor等のブロック内で宣言した変数を、ブロックの外に出てから使った場合の警告を出ないようにする。
    // JavaScriptはのスコープは、グローバルスコープと関数スコープしかないのだが、if等のブロックがスコープを作っちゃうような気がして紛らわしいので、デフォルトではこの警告が出るようになっている。
    "funcscope": true,

    // グローバルスコープにuse strictすることを強いる。
    // グローバルスコープでこれをやるとサードパーティ製のコードが動かなくなるので、オススメしない。
    // strictオプションの記述も参照。
    "globalstrict": true,

    // __iterator__プロパティを使った場合に警告が出ないようにする。
    // このプロパティはサポートされていないブラウザがあるから気を付けてね。
    "iterator": false,

    // セミコロン忘れの警告を出ないようにする。
    // ※ただし1行のコードブロックの最後のステートメントに限る
    // var name = (function() { return "Anton" }());
    // これは非常にニッチな需要だが、JavaScriptのコードを自動生成する場合には便利だ
    "lastsemic": false,

    // 安全でない改行があっても警告が出ないようにする。
    "laxbreak": false,

    // カンマを行頭に持ってくるコードディングスタイルに文句を言わなくなる。
    "laxcomma": false,

    // ループ内での関数定義に文句を言わなくなる。
    // ループ内での関数定義はバグを誘発しやすい。
    "loopfunc": false,

    // MozillaのJavaScript拡張を利用しているよー、とJSHintに教えてあげる。
    // Firefoxに特化した開発をしているわけでないのなら、このオプションは必要ないっす。
    "moz": false,

    // 複数行の文字列に警告を出さなくなる。
    // 複数行の文字列は、エスケープ文字\と次の行の先頭との間にホワイトスペースが入ると、マジ事故って危ない。
    // それでも正しく複数行の文字列を使うから許しとくれよー、とこのオプションを有効にした勇者には、エスケープ文字の付近が妙なことになっていないかのチェックだけはやってくれるという優しさを見せる。
    "multistr": false,

    // typeof演算子と比較する値がアレだった場合でも警告を出さなくなる。
    // 絶対の自信がない限り、このオプションを有効にするのはやめましょう。
    // ってか、完璧なコードが書けるつもりだったとしてもやめておきましょう、と思う。人間は間違いを犯すもの。
    "notypeof": false,

    // __proto__プロパティにアクセスしても警告をしなくなる。
    "proto": false,

    // こんな感じの、スクリプト実行系のURLを生成した時に怒らなくなる。
    // var x = "javascript: foo()";
    "scripturl": false,

    // タブとスペースが混在しても警告しなくなる。
    "smarttabs": false,

    // 変数名のシャドーイングに文句を言わなくなる。
    "shadow": false,

    // obj["name"]じゃなくてobj.nameって書けよ！という文句を言ってこなくなる。
    "sub": false,

    // "weird"コンストラクション、つまりは new function () { ... }みたいなやつを受け入れてくれる。シングルトンで使うかも知れないしね。
    "supernew": false,

    // This option suppresses warnings about possible strict violations
    // when the code is running in strict mode and you use this in a 
    // non-constructor function. You should use this option—in a 
    // function scope only—when you are positive that your use of 
    // this is valid in the strict mode (for example, if you call 
    // your function using Function.call).
    // ※このオプションは関数スコープ内でのみ使える。グローバルにこのオプションを指定するとJSHintはエラーで失敗する
    "validthis": false,


    /*
     * Environments
     * JSHintに元々用意されているグローバル変数を教えるためのオプションたち。
     */

    // navigatorとかHTML5 FileReaderのオブジェクトとか、
    // 今どきブラウザが用意しているオブジェクトがグローバル宣言されていることになる。
    "browser": false,

    // consoleとかalertとか、デバッグに使うオブジェクトがグローバル宣言されていることになる。
    // プロダクションではこの設定を外した方がいい。console.logと書いてあると、古いIEが爆発するエラーを吐くので。
    "devel" : true,

    // Dojo Toolkitの用意しているオブジェクトがグローバル宣言されていることになる。
    "dojo": false,

    // jQueryの用意しているオブジェクトがグローバル宣言されていることになる。
    "jquery": false,

    // MooToolsの用意しているオブジェクトがグローバル宣言されていることになる。
    "mootools": false,

    // Node.jsの用意しているオブジェクトがグローバル宣言されていることになる。
    // 加えて、ブラウザ環境であれば警告とみなす記述に目をつぶってくれる。
    // ファイル毎のuse strict宣言とか、console.logとか。
    "node": false,

    // 標準で用意されていないがよく使われるグローバル変数をグローバル宣言していることにする。
    // escapeとかunescapeとか。
    // （んー、個人的にこれは危険な香りがする…）
    "nonstandard": false,

    // PhantomJSの用意しているオブジェクトがグローバル宣言されていることになる。
    "phantom": false,

    // Protytype.jsの用意しているオブジェクトがグローバル宣言されていることになる。
    "prototypejs": false,

    // Rhinoの用意しているオブジェクトがグローバル宣言されていることになる。
    "rhino": false,

    // Web Workerの用意しているオブジェクトがグローバル宣言されていることになる。
    "worker": false,

    // Windows Script Hostの用意しているオブジェクトがグローバル宣言されていることになる。
    "wsh": false,

    // YUIの用意しているオブジェクトがグローバル宣言されていることになる。
    "yui": false,


    /*
     * カスタムグローバルキーワードの設定
     */
    "globals": {
        "Backbone":true,
        "_":true,
        "host":true,
    }
//    "predef": ["Backbone","host", "_" ]
}