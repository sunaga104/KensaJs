やること

・ run()を改造して、getRunnerを呼ばなくてもrunできるようにする
・ stubの処理を見直す
・ テストファイルの修正
・ ReadMeの修正
・ docsの修正
・ リリース


const ks = Kensa()

ks.mainTitle('test')

ks.subTitle('test',1)

ks.subTitle('test',2)

ks.test()
ks.test()
ks.test()
ks.test()

ks.subTitle('test',2)

ks.test()
ks.test()
ks.test()
ks.test()

ks.subTitle('test',2)

ks.test()
ks.test()
ks.test()
ks.test()

ks.subTitle('test',1)

ks.run()


メインタイトル

1, 〇〇
 1,〇〇の確認
   〇　テスト
   〇　テスト
   〇　テスト
 2,〇〇の確認


// run メソッドはファイルの最後に一度呼ぶ
