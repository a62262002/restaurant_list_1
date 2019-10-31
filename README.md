# 我的餐廳清單

運用 node.js 和 express 進行開發，呈現 8 家餐廳清單，並具有餐廳詳細選單、CRUD 及搜尋餐廳之功能。

## 功能

- 使用者可以在首頁看到所有餐廳簡介。
- 使用者可以店及餐廳後查看餐廳的詳細介紹。
- 使用者可以透過搜尋功能查詢餐廳。
- 使用者可以新增餐廳資料。
- 使用者可以編輯餐廳資料。
- 使用者可以刪除餐廳資料。

## 安裝環境

- Windows 10
- Node.js v10.16.3
- mongoDB v4.0.12
- Express v4.17.1
- express-handlebars v3.1.0
- body-parser v1.19.0
- mongoose v5.7.1

## 安裝

1. 下載 restaurant_list 資料夾，並輸入以下指令下載

```
$ git clone https://github.com/a62262002/restaurant_list1.git
```

2. 從終端機安裝 npm 套件，輸入以下指令

```
$ npm install
```

3. 執行專案

```
$ npm run dev
```

4. 輸入網址並呈現我的餐廳清單介面

```
http://localhost:3000
```

## 功能說明

- 顯示餐廳所有清單：http://localhost:3000
- 顯示個別餐廳詳細介紹：http://localhost:3000/restuaurants/id
- 搜尋餐廳：http://localhost:3000/search?keyword=搜尋輸入內容
- 創建餐廳：http://localhost:3000/restuaurants/new
- 編輯餐廳：http://localhost:3000/restuaurants/id/edit

## 專案內容

- 顯示餐廳所有清單
  ![image](https://github.com/a62262002/restaurant_list_1/blob/master/restaurant_all.png)
- 創建餐廳
  ![image](https://github.com/a62262002/restaurant_list_1/blob/master/restaurant_create.png)
- 餐廳詳細內容
  ![image](https://github.com/a62262002/restaurant_list_1/blob/master/restaurant_detail.png)
- 編輯餐廳內容
  ![image](https://github.com/a62262002/restaurant_list_1/blob/master/restaurant_edit.png)

## 作者

[Emily Liu](https://github.com/a62262002)
