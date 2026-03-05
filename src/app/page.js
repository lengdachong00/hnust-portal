"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ChevronRight, FileText, LayoutDashboard, Compass } from "lucide-react";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("/api/articles")
      .then((res) => res.json())
      .then((data) => setArticles(data));
  }, []);

  const filtered = articles.filter(
    (a) =>
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.category.toLowerCase().includes(query.toLowerCase())
  );

  const categories = [...new Set(articles.map((a) => a.category))].sort((a, b) => {
    if (a === "常用审批单下载") return 1;
    if (b === "常用审批单下载") return -1;
    return a.localeCompare(b);
  });

  return (
    <div className="container" style={{ paddingBottom: "3rem" }}>
      <header style={{ marginTop: "2rem", marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>
          <span style={{ color: "var(--primary)" }}>跑材料</span> 手册
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "1rem" }}>
          陈锦老师课题组维护，湖南科技大学信息学院专属办事指南。
        </p>
      </header>

      <div className="glass-card animate-in" style={{
        padding: "1rem",
        marginBottom: "2rem",
        borderLeft: "4px solid var(--primary)",
        background: "rgba(99, 102, 241, 0.05)"
      }}>
        <p style={{ fontSize: "0.85rem", color: "var(--text-main)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Compass size={16} color="var(--primary)" />
          <strong>更多表单下载：</strong>
          <a
            href="https://science.hnust.edu.cn/zlxz/index.htm"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--primary)", textDecoration: "underline" }}
          >
            湖南科技大学科技工作网
          </a>
        </p>
      </div>

      <div className="glass-card" style={{ padding: "0.75rem 1rem", marginBottom: "2rem", display: "flex", alignItems: "center" }}>
        <Search size={20} color="var(--text-muted)" style={{ marginRight: "0.75rem" }} />
        <input
          type="text"
          placeholder="搜索流程、材料名称..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            border: "none",
            background: "transparent",
            width: "100%",
            fontSize: "1rem",
            outline: "none",
            color: "var(--text-main)",
          }}
        />
      </div>

      {query ? (
        <div className="animate-in">
          <h2 style={{ fontSize: "1.25rem", marginBottom: "1rem" }}>搜索结果</h2>
          <div style={{ display: "grid", gap: "1rem" }}>
            {filtered.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </div>
      ) : (
        <div className="animate-in">
          {categories.map((cat) => (
            <div key={cat} style={{ marginBottom: "2.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <h2 style={{ fontSize: "1.3rem" }}>{cat}</h2>
                <span className="badge">{articles.filter((a) => a.category === cat).length}</span>
              </div>
              <div style={{ display: "grid", gap: "1rem" }}>
                {articles
                  .filter((a) => a.category === cat)
                  .map((a) => (
                    <ArticleCard key={a.slug} article={a} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <footer style={{
        marginTop: "4rem",
        paddingBottom: "2rem",
        textAlign: "center",
        color: "var(--text-muted)",
        fontSize: "0.85rem",
        opacity: 0.8
      }}>
        <p>© 2026 Made with ❤️ by Tang</p>
        <p style={{ marginTop: "0.25rem", fontSize: "0.75rem" }}>为科大同学提供便利</p>
      </footer>
    </div>
  );
}

function ArticleCard({ article }) {
  return (
    <Link href={`/article/${article.slug}`} style={{ textDecoration: "none" }}>
      <div className="glass-card" style={{ padding: "1.25rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h3 style={{ fontSize: "1.1rem", color: "var(--text-main)", marginBottom: "0.25rem" }}>{article.title}</h3>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>{article.category}</p>
        </div>
        <ChevronRight size={20} color="#cbd5e1" />
      </div>
    </Link>
  );
}
