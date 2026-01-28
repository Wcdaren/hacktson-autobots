# AWS 语义搜索配置指南（Hackathon 环境）

本指南将帮助你配置语义图像搜索功能，使用已有的 AWS 基础设施。

## 目录

1. [基础设施信息](#基础设施信息)
2. [连接方式](#连接方式)
3. [环境变量配置](#环境变量配置)
4. [本地开发配置](#本地开发配置)
5. [EC2 部署配置](#ec2-部署配置)
6. [启动和验证](#启动和验证)
7. [故障排除](#故障排除)

---

## 基础设施信息

### AWS 服务端点

| 服务 | 端点/信息 |
|------|----------|
| **OpenSearch** | `https://vpc-hackathon-autobots-apse1-fbn25iam65pez2wksf4jhojbne.ap-southeast-1.es.amazonaws.com` |
| **OpenSearch 用户** | `hackathon` |
| **OpenSearch 密码** | `01$sCyKeS!ZnTlh*Mf` |
| **RDS** | `hackathon-test-apse1.cluster-ch3fibrmi8ky.ap-southeast-1.rds.amazonaws.com` |
| **RDS 用户** | `hackathon_autobots` |
| **RDS 密码** | `GsJaLCLJWV%dFHeVrY` |
| **RDS 数据库名** | `autobots` |
| **S3 Bucket** | `cslr-hackathon-sg-test` |
| **EC2 IP** | `52.77.184.126` |
| **EC2 用户** | `autobots` |
| **AWS 区域** | `ap-southeast-1` |

### 架构图

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────────┐
│   Storefront    │────▶│  Medusa Backend  │────▶│  AWS Services       │
│   (React)       │     │  (EC2)           │     │  (ap-southeast-1)   │
└─────────────────┘     └──────────────────┘     │                     │
                                                  │  ┌───────────────┐ │
                                                  │  │ OpenSearch    │ │
                                                  │  │ (VPC 内部)    │ │
                                                  │  └───────────────┘ │
                                                  │  ┌───────────────┐ │
                                                  │  │ RDS PostgreSQL│ │
                                                  │  └───────────────┘ │
                                                  │  ┌───────────────┐ │
                                                  │  │ Bedrock       │ │
                                                  │  └───────────────┘ │
                                                  │  ┌───────────────┐ │
                                                  │  │ Rekognition   │ │
                                                  │  └───────────────┘ │
                                                  └─────────────────────┘
```

**⚠️ 重要：** OpenSearch 和 RDS 在 VPC 内部，本地开发需要通过 Jump Server 连接。

---

## 连接方式

### SSH 密钥设置

1. 下载私钥文件 `autobots-shared-ssh-key`（不是 .pub 文件）
2. 将密钥文件放到项目目录
3. 添加到 `.gitignore`：
   ```bash
   echo "autobots-shared-ssh-key" >> .gitignore
   echo "autobots-shared-ssh-key.pub" >> .gitignore
   ```
4. 设置密钥权限：
   ```bash
   chmod 400 autobots-shared-ssh-key
   ```

### 方式 1: 直接连接 EC2（推荐部署方式）

```bash
# 直接 SSH 到 EC2
ssh -i ./autobots-shared-ssh-key autobots@52.77.184.126
```

### 方式 2: 通过 Jump Server 连接（本地开发访问 VPC 资源）

```bash
# 1. 复制密钥到 Jump Server
scp -i autobots-shared-ssh-key autobots-shared-ssh-key autobots@jumphost-sg.castlery.com:/home/autobots/
scp -i autobots-shared-ssh-key autobots-shared-ssh-key.pub autobots@jumphost-sg.castlery.com:/home/autobots/

# 2. 连接到 Jump Server
ssh -i ./autobots-shared-ssh-key autobots@jumphost-sg.castlery.com

# 3. 在 Jump Server 中设置密钥权限
chmod 400 autobots-shared-ssh-key

# 4. 从 Jump Server 连接到 EC2
ssh -i autobots-shared-ssh-key autobots@52.77.184.126
```

### 方式 3: SSH 隧道（本地开发访问 OpenSearch/RDS）

```bash
# 创建 SSH 隧道转发 OpenSearch 端口
ssh -i ./autobots-shared-ssh-key -L 9200:vpc-hackathon-autobots-apse1-fbn25iam65pez2wksf4jhojbne.ap-southeast-1.es.amazonaws.com:443 autobots@jumphost-sg.castlery.com

# 创建 SSH 隧道转发 RDS 端口
ssh -i ./autobots-shared-ssh-key -L 5432:hackathon-test-apse1.cluster-ch3fibrmi8ky.ap-southeast-1.rds.amazonaws.com:5432 autobots@jumphost-sg.castlery.com
```

---

## 环境变量配置

### EC2 部署环境（推荐）

在 EC2 上的 `apps/medusa/.env` 文件：

```bash
# ===========================================
# 数据库配置 (RDS)
# ===========================================
DATABASE_URL=postgresql://hackathon_autobots:GsJaLCLJWV%25dFHeVrY@hackathon-test-apse1.cluster-ch3fibrmi8ky.ap-southeast-1.rds.amazonaws.com:5432/autobots

# ===========================================
# Redis 配置
# ===========================================
REDIS_URL=redis://localhost:6379

# ===========================================
# AWS 通用配置
# ===========================================
AWS_REGION=ap-southeast-1
# 注意：在 EC2 上可以使用 IAM Role，不需要显式配置 Access Key
# 如果需要显式配置，从 AWS Console 获取
# AWS_ACCESS_KEY_ID=<your-access-key>
# AWS_SECRET_ACCESS_KEY=<your-secret-key>

# ===========================================
# OpenSearch 配置
# ===========================================
OPENSEARCH_HOST=https://vpc-hackathon-autobots-apse1-fbn25iam65pez2wksf4jhojbne.ap-southeast-1.es.amazonaws.com
OPENSEARCH_PRODUCT_INDEX=products
# 使用基本认证（用户名密码）而不是 AWS IAM 认证
OPENSEARCH_USE_AWS_AUTH=false
OPENSEARCH_USERNAME=hackathon
OPENSEARCH_PASSWORD=01$sCyKeS!ZnTlh*Mf

# ===========================================
# Bedrock 配置
# ===========================================
BEDROCK_MODEL_ID=amazon.titan-embed-text-v2:0

# ===========================================
# Rekognition 配置
# ===========================================
REKOGNITION_ENABLED=true

# ===========================================
# CORS 配置
# ===========================================
STORE_CORS=http://localhost:3000,http://52.77.184.126:3000
ADMIN_CORS=http://localhost:7000,http://localhost:7001,http://52.77.184.126:7000
AUTH_CORS=http://localhost:7000,http://localhost:7001,http://52.77.184.126:7000

# ===========================================
# 其他配置
# ===========================================
JWT_SECRET=supersecret-change-in-production
COOKIE_SECRET=supersecret-change-in-production
ADMIN_BACKEND_URL=http://52.77.184.126:9000
```

### 本地开发环境（通过 SSH 隧道）

如果你想在本地开发并连接到 AWS 资源，需要先建立 SSH 隧道，然后使用以下配置：

```bash
# ===========================================
# 数据库配置 (通过 SSH 隧道)
# ===========================================
DATABASE_URL=postgresql://hackathon_autobots:GsJaLCLJWV%25dFHeVrY@localhost:5432/autobots

# ===========================================
# OpenSearch 配置 (通过 SSH 隧道)
# ===========================================
OPENSEARCH_HOST=https://localhost:9200
OPENSEARCH_PRODUCT_INDEX=products
OPENSEARCH_USE_AWS_AUTH=false
OPENSEARCH_USERNAME=hackathon
OPENSEARCH_PASSWORD=01$sCyKeS!ZnTlh*Mf

# ... 其他配置同上
```

---

## 本地开发配置

由于 OpenSearch 和 RDS 在 VPC 内部，本地开发有两个选择：

### 选项 1: 使用本地 Docker 服务（推荐）

```bash
# 启动本地 PostgreSQL 和 OpenSearch
cd apps/medusa
docker-compose up -d

# 使用本地配置
OPENSEARCH_HOST=http://localhost:9200
OPENSEARCH_USE_AWS_AUTH=false
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/hacktson-autobots
REKOGNITION_ENABLED=false  # 本地不使用 Rekognition
```

### 选项 2: SSH 隧道连接 AWS 资源

```bash
# 终端 1: 建立 OpenSearch 隧道
ssh -i ./autobots-shared-ssh-key -L 9200:vpc-hackathon-autobots-apse1-fbn25iam65pez2wksf4jhojbne.ap-southeast-1.es.amazonaws.com:443 -N autobots@jumphost-sg.castlery.com

# 终端 2: 建立 RDS 隧道
ssh -i ./autobots-shared-ssh-key -L 5432:hackathon-test-apse1.cluster-ch3fibrmi8ky.ap-southeast-1.rds.amazonaws.com:5432 -N autobots@jumphost-sg.castlery.com

# 终端 3: 启动开发服务器
cd apps/medusa
yarn dev
```

---

## EC2 部署配置

### 步骤 1: 连接到 EC2

```bash
ssh -i ./autobots-shared-ssh-key autobots@52.77.184.126
```

### 步骤 2: 克隆项目（如果还没有）

```bash
git clone <your-repo-url>
cd <project-directory>
```

### 步骤 3: 安装依赖

```bash
# 安装 Node.js 20+ (如果还没有)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# 启用 Corepack 和 Yarn
corepack enable
corepack prepare yarn@4.5.0 --activate

# 安装项目依赖
yarn install
```

### 步骤 4: 配置环境变量

```bash
cd apps/medusa
cp .env.template .env
# 编辑 .env 文件，填入上面的 EC2 部署环境配置
nano .env
```

### 步骤 5: 配置 AWS 凭证

```bash
# 配置 AWS CLI（用于 Bedrock 和 Rekognition）
aws configure
# AWS Access Key ID: <从 AWS Console 获取>
# AWS Secret Access Key: <从 AWS Console 获取>
# Default region name: ap-southeast-1
# Default output format: json
```

### 步骤 6: 初始化数据库

```bash
cd apps/medusa

# 运行数据库迁移
yarn migrate

# 同步模块链接
yarn sync

# 运行种子数据（可选）
yarn seed
```

### 步骤 7: 同步产品嵌入向量

```bash
# 为所有产品生成嵌入向量
yarn medusa exec ./src/scripts/sync-embeddings.ts
```

### 步骤 8: 启动服务

```bash
# 开发模式
yarn dev

# 或生产模式
yarn build
yarn start
```

---

## 启动和验证

### 验证 OpenSearch 连接

```bash
# 在 EC2 上测试 OpenSearch 连接
curl -u hackathon:'01$sCyKeS!ZnTlh*Mf' \
  https://vpc-hackathon-autobots-apse1-fbn25iam65pez2wksf4jhojbne.ap-southeast-1.es.amazonaws.com/_cluster/health

# 预期输出: {"cluster_name":"...","status":"green",...}
```

### 验证 Bedrock 连接

```bash
# 测试 Bedrock 模型访问
aws bedrock list-foundation-models --region ap-southeast-1 \
  --query 'modelSummaries[?contains(modelId, `titan-embed`)].modelId' \
  --output table
```

### 验证语义搜索 API

```bash
# 测试语义搜索端点
curl -X POST http://localhost:9000/store/search/semantic \
  -H "Content-Type: application/json" \
  -d '{"query": "comfortable sofa", "size": 5}'
```

### 验证图像搜索 API

```bash
# 测试图像搜索端点（需要 base64 编码的图片）
curl -X POST http://localhost:9000/store/search/image \
  -H "Content-Type: application/json" \
  -d '{"image": "<base64-encoded-image>", "size": 5}'
```

---

## 故障排除

### 1. OpenSearch 连接失败

**错误**: `ConnectionError` 或 `401 Unauthorized`

**解决方案**:
- 确认在 EC2 上运行（OpenSearch 在 VPC 内部）
- 检查用户名密码是否正确
- 确认 `OPENSEARCH_USE_AWS_AUTH=false`（使用基本认证）

### 2. RDS 连接失败

**错误**: `ECONNREFUSED` 或 `authentication failed`

**解决方案**:
- 确认在 EC2 上运行或已建立 SSH 隧道
- 检查 DATABASE_URL 中的密码是否正确 URL 编码（`%` 需要编码为 `%25`）

### 3. Bedrock 访问被拒绝

**错误**: `AccessDeniedException`

**解决方案**:
- 确认 AWS 凭证已配置（`aws configure`）
- 确认区域是 `ap-southeast-1`
- 确认 Bedrock 模型访问权限已授予

### 4. 嵌入同步失败

**解决方案**:
- 检查 AWS 凭证配置
- 确认 Bedrock 模型可访问
- 查看详细错误日志

### 5. 搜索无结果

**解决方案**:
- 确认已运行 `sync-embeddings.ts` 脚本
- 检查 OpenSearch 索引文档数量：
  ```bash
  curl -u hackathon:'01$sCyKeS!ZnTlh*Mf' \
    https://vpc-hackathon-autobots-apse1-fbn25iam65pez2wksf4jhojbne.ap-southeast-1.es.amazonaws.com/products/_count
  ```

---

## 快速检查清单

- [ ] SSH 密钥已下载并设置权限 (`chmod 400`)
- [ ] 可以 SSH 连接到 EC2
- [ ] AWS CLI 已配置（`aws configure`）
- [ ] `.env` 文件已配置
- [ ] 数据库迁移已运行 (`yarn migrate`)
- [ ] 产品嵌入已同步 (`yarn medusa exec ./src/scripts/sync-embeddings.ts`)
- [ ] Medusa 后端已启动
- [ ] 语义搜索 API 可正常响应
