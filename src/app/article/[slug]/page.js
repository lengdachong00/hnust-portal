import fs from "fs";
import path from "path";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ChevronLeft, Share2, Calendar, Folder, FileText } from "lucide-react";
import { getArticleData } from "@/lib/data";

export default async function ArticlePage({ params }) {
    const { slug } = await params;
    const article = getArticleData(slug);

    if (!article) return <div className="container"><h1>Article not found</h1><Link href="/">返回首页</Link></div>;

    const articleSlug = article.slug;
    const isForm = article.is_form;
    const previewImage = article.preview_image;
    const images = article.local_images || [];

    return (
        <div className="container" style={{ paddingBottom: "100px" }}>
            <header style={{ marginTop: "1rem", marginBottom: "2rem" }}>
                <Link href="/" style={{ color: "var(--primary)", display: "flex", alignItems: "center", marginBottom: "1.5rem", textDecoration: "none" }}>
                    <ChevronLeft size={20} style={{ marginRight: "0.25rem" }} /> 返回首页
                </Link>

                <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>{article.title}</h1>

                <div style={{ display: "flex", gap: "1rem", color: "var(--text-muted)", fontSize: "0.85rem" }}>
                    <span style={{ display: "flex", alignItems: "center" }}><Folder size={14} style={{ marginRight: "0.3rem" }} /> {article.category}</span>
                    <span style={{ display: "flex", alignItems: "center" }}><Calendar size={14} style={{ marginRight: "0.3rem" }} /> 2026-03-04</span>
                </div>

                {isForm && article.attachment && (
                    <a
                        href={`/downloads/${article.attachment}`}
                        download
                        className="glass-card"
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            padding: "0.75rem 1.25rem",
                            marginTop: "1.5rem",
                            color: "white",
                            background: "var(--primary)",
                            textDecoration: "none",
                            fontWeight: "600",
                            fontSize: "1rem",
                            gap: "0.5rem",
                            boxShadow: "0 10px 20px -5px rgba(99, 102, 241, 0.4)"
                        }}
                    >
                        <Share2 size={18} style={{ transform: "rotate(90deg)" }} /> 下载原始文件 (Docx)
                    </a>
                )}
            </header>

            {isForm ? (
                <div className="animate-in" style={{ marginBottom: "2rem" }}>
                    <div className="glass-card" style={{
                        padding: "1rem",
                        background: "white",
                        border: "1px solid #e2e8f0",
                        borderRadius: "var(--radius-lg)",
                        overflow: "hidden"
                    }}>
                        {previewImage ? (
                            <img
                                src={`/images/${previewImage}`}
                                alt="预览"
                                style={{ width: "100%", height: "auto", display: "block", borderRadius: "var(--radius-md)" }}
                            />
                        ) : (
                            <div style={{
                                padding: "4rem 2rem",
                                background: "#f8fafc",
                                textAlign: "center",
                                color: "#94a3b8",
                                borderRadius: "var(--radius-md)",
                                border: "2px dashed #e2e8f0"
                            }}>
                                <FileText size={48} style={{ margin: "0 auto 1rem", opacity: 0.5 }} />
                                <p>文档快速预览生成中...</p>
                                <p style={{ fontSize: "0.8rem", marginTop: "0.5rem" }}>提示：放入一张与文档同名的图片即可显示预览</p>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <>
                    <div className="glass-card animate-in" style={{ padding: "1.5rem", lineHeight: "1.8", marginBottom: "2rem" }}>
                        <div className="markdown-body">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {article.content}
                            </ReactMarkdown>
                        </div>
                    </div>

                    {images.length > 0 && (
                        <div className="animate-in" style={{ animationDelay: "0.2s" }}>
                            <h2 style={{ fontSize: "1.25rem", marginBottom: "1rem" }}>相关流程图/例图</h2>
                            <div style={{ display: "grid", gap: "1.5rem" }}>
                                {images.map(img => (
                                    <div key={img} className="glass-card" style={{ padding: "0.5rem", overflow: "hidden" }}>
                                        <img
                                            src={`/images/${img}`}
                                            alt={img}
                                            style={{ width: "100%", borderRadius: "calc(var(--radius-lg) - 0.5rem)", display: "block" }}
                                            loading="lazy"
                                        />
                                        <p style={{ textAlign: "center", fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.75rem", padding: "0 0.5rem 0.5rem" }}>{img}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </>
            )}

            <div style={{ position: "fixed", bottom: "100px", right: "1.5rem" }}>
                <button className="glass-card" style={{
                    width: "50px", height: "50px", borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    border: "none", color: "var(--primary)", cursor: "pointer",
                    boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.3)"
                }}>
                    <Share2 size={24} />
                </button>
            </div>
        </div>
    );
}
