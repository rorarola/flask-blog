title: 熬夜寫出這個部落格
subtitle:
date: March 27, 2022
image: 
tags: flask, css, javascript, blog

### 起源
就挺突然的...

### 使用技術
- Flask
- [highlight.js](https://highlightjs.org)

    花了一個多小時才研究出要加`<script>hljs.highlightAll();</script>`才會動...
- [Flask-FlatPages](https://flask-flatpages.readthedocs.io/en/latest/)

    讓flask可以讀.md檔並解析檔案開頭的設定，大概長這樣：
    ``` markdown
    title: 熬夜寫出這個部落格
    subtitle:
    date: March 27, 2022
    image: 
    tags: flask, css, javascript, blog

    content
    ```
- [heroku](https://dashboard.heroku.com/apps)

    可以讓你免費架站的東西
    順便把更新方式打在這，以免自己忘記。
    ``` shell
    git add .
    git commit -am "make it better"
    git push heroku master
    ```


### 參考來源
- RWD導覽列 [Responsive navbar tutorial by Kevin Powell](https://youtu.be/HbBMp6yUXO0)
- 標題欄位 [design milk](https://design-milk.com/) 
- 文章列表 [hugo template use by Brian Su](https://blog.brian.su/posts/)

