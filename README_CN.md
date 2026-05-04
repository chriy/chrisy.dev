# [chrisy.dev](https://chrisy.dev)

这里是 Chrisy，一个写代码也爱拍照片的人。

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat&logo=nextdotjs)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-087ea4?style=flat&logo=react)](https://react.dev)
[![Tailwind](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com)
[![MDX](https://img.shields.io/badge/MDX-3-f9ac00?style=flat&logo=mdx)](https://mdxjs.com)
[![Cloudflare](https://img.shields.io/badge/Cloudflare-Pages-f38020?style=flat&logo=cloudflare)](https://pages.cloudflare.com)
[![License](https://img.shields.io/badge/license-MIT-green?style=flat)](./LICENSE)

![screenshot](./docs/chrisy.dev.png)

## 技术栈

| 类别   | 方案                                 |
|------|------------------------------------|
| 框架   | Next.js 16 (App Router)            |
| 内容   | MDX                                |
| 样式   | Tailwind CSS v4                    |
| 动效   | Framer Motion                      |
| 代码高亮 | Shiki                              |
| 字体   | Nunito + Noto Sans SC + Maple Mono |
| 部署   | Cloudflare Pages                   |

## 特性

- **MDX 驱动** — 所有文章以 `.mdx` 编写，可嵌入自定义 React 组件
- **暗色模式** — next-themes 实现，支持跟随系统
- **代码块** — Shiki 语法高亮，带行号、复制按钮、语言标签
- **响应式** — 全宽移动端，Pill 形状桌面端 Header，汉堡菜单自动切换
- **开屏动画** — 首次加载 Splash Screen
- **文章目录** — MDX 内自动提取标题生成 Catalog
- **Markdown 增强** — Callout 提示框、表格、高亮文本等自定义组件

## 目录结构

```
content/                  # MDX 文章，按目录组织
src/
├── app/                  # Next.js App Router 页面
│   ├── about/            # 关于页
│   ├── posts/            # 文章列表 & [...slug] 动态路由
│   └── layout.tsx        # 根布局 (Metadata, Theme, Header, Footer)
├── components/
│   ├── mdx/              # MDX 自定义组件 (code, callout, catalog, table...)
│   └── ui/               # 通用 UI 组件 (header, footer, hero, theme...)    
├── lib/                  # 工具函数 (posts 读取, shiki 配置, 字体加载)
├── images/               # 静态图片
└── styles/               # 全局样式
```

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm dev

# 构建
npm build
```

## 写文章

在 `content` 下创建 `.mdx` 文件，支持多级目录，必须 `export metadata` 否则构建失败：

```mdx
export const metadata = {
    title: '文章标题',
    date: '2026-01-01',
    summary: '简要描述',
    tags: ['Next.js', 'React'],
    address: 'Shanghai',
}

## 正文开始

内容...
```

| 字段        | 必填 | 说明                   |
|-----------|----|----------------------|
| `title`   | 是  | 文章标题                 |
| `date`    | 是  | 发布日期，格式 `YYYY-MM-DD` |
| `summary` | 否  | 简要描述                 |
| `tags`    | 否  | 标签数组                 |
| `address` | 否  | 写作地点                 |

支持的自定义组件：`<Callout>`、`<Catalog>`、`<Code>`、`<Highlight>`、`<Article>`、`<Table>` 等。

## 部署

本项目托管在 [Cloudflare Pages](https://pages.cloudflare.com)，通过 Git 连接自动部署。

## License

MIT
