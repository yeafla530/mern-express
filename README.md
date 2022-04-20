# MERN & MSA 과제 - Server

## 💻개요

Node.js 기반으로 만든 서버입니다. Node.js의 프레임워크인 express.js 환경에서 개발을 진행합니다

과제의 최종목표는 Docker위에서 서버를 만들어 클라이언트와 API연동할 수 있도록 하는 것입니다.

1주차에서는 서버연동없이 클라이언트 측만 작업을 진행했습니다.



## 📁프로젝트 시작

### yarn 설치

```bash
$ npm install -g yarn
```

### dependencies 설치

```bash
$ yarn
```

### package 설치

```bash
$ yarn add [package name]
```

### 로컬 테스트

```bash
$ cd server
$ node app
# 로컬 경로 | http://localhost:5000 
```



## 🛠이슈

### 1주차

* `npm install express-generator -g`시  server 폴더에 framework가 설치되지 않아서 찾다가  `express --view=ejs server` 코드를 쳐서 문제를 해결할 수 있었습니다

  

