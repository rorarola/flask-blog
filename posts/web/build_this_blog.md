title: 熬夜寫出這個部落格
subtitle:
date: March 27, 2022
image: 
tags: flask, css, javascript, blog

### 起源

大一就開始希望能單純用markdown來撰寫部落格，並公開到網路上，同時也希望網頁完全可以修改，不用被wordpress之類的網站限制。
然就挺突然的...今天就想說寫一下

### 功能

將markdown文章放到posts資料夾裡，文章就可以顯示到頁面上。

markdown文件使用[marktext](https://github.com/marktext/marktext#download-and-installation)編輯，因為Typora現在似乎要付費。

### 使用技術

- Flask

- [highlight.js](https://highlightjs.org)
    花了一個多小時才研究出要加`<script>hljs.highlightAll();</script>`才會動...

- [Flask-FlatPages](https://flask-flatpages.readthedocs.io/en/latest/)
    讓flask可以讀.md檔並解析檔案開頭的設定，大概長這樣：
  
  ```markdown
  title: 熬夜寫出這個部落格
  subtitle:
  date: March 27, 2022
  image: 
  tags: flask, css, javascript, blog
  
  content
  ```

- [markdown-it-py](https://markdown-it-py.readthedocs.io/en/latest/index.html)
    需要認真看文件設定...不然和預期的差很多

- [heroku](https://dashboard.heroku.com/apps)
    可以讓你免費架站的東西
    順便把更新方式打在這，以防自己忘記（後來寫成script了）。
  
  ```shell
  git add .
  git commit -am "make it better"
  git push heroku main
  ```

- sass
  參考了Keven Powell的[模板](https://github.com/kevin-powell/demo-starter-template-with-sass/tree/de6f78e68ff1fd17899b91a4c8e148cd5ad06f9f)。
  這讓我的css架構更容易整理。

### 參考來源

- 整體架構 [Building A Lightweight Blogging CMS In 10 Lines of Code](https://www.oneword.domains/blog/lightweight-cms)
- RWD導覽列 [Responsive navbar tutorial by Kevin Powell](https://youtu.be/HbBMp6yUXO0)
- 標題欄位 [design milk](https://design-milk.com/) 
- 文章列表 [hugo template used by Brian Su](https://blog.brian.su/posts/)
- 某個很棒的網頁設計 [wokine](https://www.wokine.com/)

### Github連結

[https://github.com/rorarola/flask-blog](https://github.com/rorarola/flask-blog)
