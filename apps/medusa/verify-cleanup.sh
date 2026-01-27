#!/bin/bash

echo "🔍 验证清理工作..."
echo ""

# 检查旧函数名
echo "1. 检查是否还有旧函数名 (seedProductsFromES)..."
if grep -r "seedProductsFromES" src/ 2>/dev/null; then
    echo "❌ 发现旧函数名！"
    exit 1
else
    echo "✅ 没有旧函数名"
fi

echo ""

# 检查新函数名
echo "2. 检查新函数名 (seedProductsFromAPI) 是否存在..."
count=$(grep -r "seedProductsFromAPI" src/ 2>/dev/null | wc -l)
if [ "$count" -ge 3 ]; then
    echo "✅ 找到 $count 处新函数名引用"
else
    echo "❌ 新函数名引用不足（应该至少 3 处）"
    exit 1
fi

echo ""

# 检查是否还有 ES 相关文件
echo "3. 检查是否还有 ES 相关文件..."
es_files=$(find src/ -name "*es*" -o -name "*ES*" 2>/dev/null | grep -v "node_modules" | wc -l)
if [ "$es_files" -eq 0 ]; then
    echo "✅ 没有 ES 相关文件"
else
    echo "⚠️  发现 $es_files 个可能的 ES 相关文件"
    find src/ -name "*es*" -o -name "*ES*" 2>/dev/null | grep -v "node_modules"
fi

echo ""

# 检查 seed 目录
echo "4. 检查 seed 目录..."
if [ -f "src/scripts/seed/products-from-api.ts" ]; then
    echo "✅ products-from-api.ts 存在"
else
    echo "❌ products-from-api.ts 不存在！"
    exit 1
fi

if [ -f "src/scripts/seed/products.ts" ]; then
    echo "❌ 旧的 products.ts 仍然存在！"
    exit 1
else
    echo "✅ 旧的 products.ts 已删除"
fi

if [ -f "src/scripts/seed/reviews.ts" ]; then
    echo "❌ 旧的 reviews.ts 仍然存在！"
    exit 1
else
    echo "✅ 旧的 reviews.ts 已删除"
fi

echo ""

# 检查 import 目录
echo "5. 检查新的 import 基础设施..."
for file in types.ts validator.ts logger.ts config.ts; do
    if [ -f "src/scripts/import/$file" ]; then
        echo "✅ import/$file 存在"
    else
        echo "⚠️  import/$file 不存在"
    fi
done

echo ""
echo "🎉 验证完成！"
