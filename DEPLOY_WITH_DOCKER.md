# 使用 Docker 部署

这个项目是纯静态站点，已经内置 `Dockerfile`、`nginx.conf`、`docker-compose.yml` 和 `Makefile`。只要机器上安装了 Docker，就可以直接部署。

## 最简部署

```bash
cp .env.example .env
make docker-up
```

访问：

```text
http://localhost:8080
```

停止服务：

```bash
make docker-down
```

## 环境变量

如果需要自定义镜像名、容器名、项目名或端口，先复制环境变量示例：

```bash
cp .env.example .env
```

默认内容如下：

```text
COMPOSE_PROJECT_NAME=academic-homepage
IMAGE_NAME=academic-homepage
IMAGE_TAG=latest
CONTAINER_NAME=academic-homepage
HOST_PORT=8080
```

常见修改示例：

- 将 `HOST_PORT=8080` 改成 `HOST_PORT=3000`
- 将 `IMAGE_TAG=latest` 改成 `IMAGE_TAG=v1`
- 将 `CONTAINER_NAME=academic-homepage` 改成你自己的容器名

## 常用命令

### 通过 Makefile

```bash
make docker-build
make docker-up
make docker-logs
make docker-check
make docker-down
```

### 直接使用 Docker Compose

```bash
docker compose up -d --build
docker compose logs -f
docker compose down
```

### 直接使用 Docker

构建镜像：

```bash
docker build -t academic-homepage:latest .
```

运行容器：

```bash
docker run --rm --name academic-homepage -p 8080:80 academic-homepage:latest
```

## 健康检查

项目已配置容器健康检查。启动后可通过以下命令确认状态：

```bash
docker ps
```

也可以直接请求本地地址：

```bash
curl -I http://127.0.0.1:8080
```

## 适合谁使用

- 想在本地快速预览主页的人
- 想在服务器或 NAS 上长期运行静态主页的人
- 想把这个仓库作为模板后，直接容器化部署的人
