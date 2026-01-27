# Product Import Refinement - Requirements

## Overview

改进 Castlery 产品导入系统，从依赖 Elasticsearch 的方案迁移到基于 Sitemap + Production API 的方案，并确保数据在导入过程中正确对齐到 Medusa 数据结构。

## Background

当前系统已经实现了基于 Sitemap + API 的导入逻辑（`import-from-api-only.ts`），但存在以下问题：
- 文件命名不准确（`products-from-es.ts` 实际来自 API）
- 缺少数据验证和对齐检查
- 错误处理可以改进
- 需要更好的日志和进度反馈

## User Stories

### 1. 作为开发者，我希望文件命名能准确反映数据源
**验收标准：**
- 1.1 将 `products-from-es.ts` 重命名为 `products-from-api.ts`
- 1.2 更新所有引用该文件的地方（seed.ts, README 等）
- 1.3 更新导入脚本中的注释和文档字符串
- 1.4 README 文件名从 `README-ES-IMPORT.md` 改为 `README-API-IMPORT.md`

### 2. 作为开发者，我希望在导入过程中验证数据完整性
**验收标准：**
- 2.1 验证每个产品必须有 title, handle, 至少一个 variant
- 2.2 验证价格必须大于 0
- 2.3 验证图片 URL 格式正确
- 2.4 验证 category 层级结构正确（parent-child 关系）
- 2.5 对无效数据生成警告日志，但不中断导入
- 2.6 在导入结束时生成验证报告

### 3. 作为开发者，我希望看到详细的导入进度和统计
**验收标准：**
- 3.1 显示每个阶段的进度（sitemap 获取、API 调用、数据转换）
- 3.2 显示成功/失败/跳过的产品数量
- 3.3 显示数据统计（categories, tags, collections, variants 数量）
- 3.4 在控制台输出彩色的状态指示器（✓ 成功，⚠ 警告，✗ 错误）
- 3.5 生成导入摘要报告

### 4. 作为开发者，我希望能够配置导入行为
**验收标准：**
- 4.1 通过环境变量配置 maxProducts, concurrency, region
- 4.2 支持 `--dry-run` 模式，只验证不生成文件
- 4.3 支持 `--verbose` 模式，显示详细的 API 响应
- 4.4 支持指定特定的产品 slugs 进行导入（用于测试）

### 5. 作为开发者，我希望导入的数据能正确对齐到 Medusa 结构
**验收标准：**
- 5.1 Product options 的 presentation 名称正确映射
- 5.2 Variant options 使用正确的 presentation 值
- 5.3 Category 层级关系正确建立
- 5.4 Collection 关联正确
- 5.5 Tags 包含 badges（如 `badge:sale`）
- 5.6 图片 URL 可访问且格式正确
- 5.7 价格转换为 cents（乘以 100）

### 6. 作为开发者，我希望改进错误处理
**验收标准：**
- 6.1 API 请求失败时自动重试（最多 3 次）
- 6.2 单个产品失败不影响其他产品导入
- 6.3 记录所有错误到日志文件
- 6.4 提供清晰的错误消息和修复建议
- 6.5 Sitemap 获取失败时提供备用方案

### 7. 作为开发者，我希望能够增量更新产品数据
**验收标准：**
- 7.1 支持 `--incremental` 模式，只更新变化的产品
- 7.2 比较现有 seed 文件和新数据，只更新差异
- 7.3 保留手动修改的产品数据
- 7.4 生成变更报告（新增、更新、删除）

## Technical Requirements

### Data Validation Schema

使用 Zod 定义验证 schema：

```typescript
const ProductSchema = z.object({
  title: z.string().min(1),
  handle: z.string().min(1),
  description: z.string(),
  thumbnail: z.string().url(),
  images: z.array(z.string().url()).min(1),
  variants: z.array(z.object({
    title: z.string(),
    sku: z.string(),
    price: z.number().positive(),
    options: z.record(z.string())
  })).min(1),
  productOptions: z.array(z.object({
    title: z.string(),
    values: z.array(z.object({
      value: z.string(),
      presentation: z.string(),
      image: z.string().url().optional()
    }))
  })),
  categories: z.array(z.object({
    name: z.string(),
    level: z.number(),
    parent: z.string().optional()
  })),
  tags: z.array(z.string()),
  collection: z.string().nullable()
})
```

### Performance Requirements

- 导入 100 个产品应在 2 分钟内完成
- 并发请求数可配置（默认 5）
- 内存使用不超过 500MB

### Compatibility Requirements

- 兼容 Medusa v2.7.0+
- 支持 Node.js 20+
- 生成的 seed 文件与现有 seed.ts 兼容

## Out of Scope

以下功能不在本次改进范围内：
- 实时同步（仍然是批量导入）
- 图片下载和本地存储
- 产品数据的 AI 增强
- 多语言支持
- 自定义字段映射 UI

## Success Metrics

- ✅ 所有文件重命名完成，无遗漏引用
- ✅ 数据验证覆盖率 100%
- ✅ 导入成功率 > 95%
- ✅ 错误日志清晰可操作
- ✅ 文档更新完整

## Dependencies

- Zod (已安装) - 数据验证
- chalk (需安装) - 彩色控制台输出
- ora (需安装) - 进度指示器

## Timeline

预计开发时间：4-6 小时
- Phase 1: 文件重命名和引用更新 (1h)
- Phase 2: 数据验证实现 (2h)
- Phase 3: 改进日志和错误处理 (1.5h)
- Phase 4: 配置选项和文档更新 (1.5h)
