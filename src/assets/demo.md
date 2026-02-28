# Kreuzberg 正式发布 LangChain 集成

我们刚刚发布了 Kreuzberg 的 LangChain 集成插件，在此与大家分享。

GitHub 地址：https://github.com/kreuzberg-dev/langchain-kreuzberg

## Kreuzberg 是什么

Kreuzberg 是一个开源的文档智能框架，核心由 Rust 编写，提供 Python、Ruby、Java、Go、PHP、Elixir、C#、TypeScript（Node/Bun/Wasm/Deno）等多语言绑定。它专注于对 75+ 种文件格式的快速、结构化内容提取，涵盖 PDF、Office 文档、HTML、图片等主流格式。

## 这个集成做了什么

langchain-kreuzberg 是一个 LangChain Document Loader，封装了 Kreuzberg 的内容提取能力。它具备以下特性：

- **开箱即用**，支持 75+ 种文件格式
- **真正的异步提取**，底层由 Rust 的 tokio 运行时驱动
- **丰富的元数据输出**，生成的 LangChain Document 对象包含语言检测、质量评分、关键词提取等结构化信息

## 为什么这很重要

大多数 RAG 流水线的瓶颈出在数据摄入层——不一致的内容提取、缺失的元数据、各种格式的边界情况，这些都会直接降低下游检索的质量。

我们的思路是：**在数据进入 LangChain 之前，先把输入层做好**。通过这个集成，让下游的检索更可靠、更易于规模化。

## 了解更多

- **GitHub 仓库**：https://github.com/kreuzberg-dev/langchain-kreuzberg
- **深入阅读**：我们在 Medium 博客发表了第一篇文章，详细介绍了基于 Kreuzberg 和 LangChain 构建 RAG 流水线的工作原理：https://medium.com/@kreuzberg/how-a-rag-pipeline-works-with-kreuzberg-and-langchain-a91bd4695da7
- **Kreuzberg 主仓库**：https://github.com/kreuzberg-dev/kreuzberg

欢迎反馈与交流，也欢迎在 GitHub 上给我们一个 Star。

---