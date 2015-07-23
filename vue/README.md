# Vue

## Demo1
### 基本
Vueインスタンス生成
``` js
var vm = new Vue({
    el: '#js-hoge',
    data: {
        abc: 'abc'
    }
}
});
```

### ディレクティブ
htmlタグにつける`v-hoge`みたいなやつ

### フィルター
`v-hoge`や`{{}}`の値に対して特定の処理をかける.値のあとに`|`をつけてかく.
``` html
<!-- 小文字に変換する（‘ABC’ => ‘abc’） -->
<div v-text="str | lowercase"></div>
  
<!-- 大文字に変換する（‘abc’ => ‘ABC’） -->
<div>{{str | uppercase}}</div>
```