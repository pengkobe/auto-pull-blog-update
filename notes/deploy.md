# 部署
> 这里主要讨论部署自动化

## 本项目
本项目支持一键发布到 github page
```bash
"github-deploy:dev": "webpack --config config/webpack.github-deploy.js --progress --profile --env.githubDev",
"github-deploy:prod": "webpack --config config/webpack.github-deploy.js --progress --profile --env.githubProd",
"github-deploy": "npm run github-deploy:dev",
```

## 部署到本机服务器
可以使用 scp 命令。