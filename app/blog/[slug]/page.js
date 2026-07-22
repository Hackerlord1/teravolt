"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useTranslation } from "react-i18next";
import BlogSidebar from "@/components/blog/BlogSidebar";
import useLocalizedBlogPosts from '@/hooks/useLocalizedBlogPosts'

export default function BlogPostPage({ params }) {
  const { t } = useTranslation("blog");
  const blogPosts = useLocalizedBlogPosts()
  const { slug } = use(params);

  const post = blogPosts.find(
    (item) => item.slug === slug
  );

  const [readProgress, setReadProgress] =
    useState(0);

  // Reading progress
  useEffect(() => {
    const handleScroll = () => {
      const article = document.querySelector(
        ".blog-post-body"
      );

      if (!article) {
        return;
      }

      const { top, height } =
        article.getBoundingClientRect();

      const windowHeight = window.innerHeight;
      const scrolled = Math.max(0, -top);
      const total = height - windowHeight;

      if (total <= 0) {
        setReadProgress(100);
        return;
      }

      const progress = Math.min(
        100,
        Math.max(0, (scrolled / total) * 100)
      );

      setReadProgress(progress);
    };

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      handleScroll
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );

      window.removeEventListener(
        "resize",
        handleScroll
      );
    };
  }, []);

  // Post not found
  if (!post) {
    return (
      <div className="blog-notfound">
        <h1>{t("post.not_found_title")}</h1>

        <p>
          {t("post.not_found_description")}
        </p>

        <Link href="/blog">
          ← {t("post.back_to_blog")}
        </Link>
      </div>
    );
  }

  // Related posts
  const relatedPosts = blogPosts
    .filter(
      (item) =>
        item.category === post.category &&
        item.id !== post.id
    )
    .slice(0, 3);

  return (
    <>
      {/* Reading Progress Bar */}
      <div
        className="blog-progress-bar"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(readProgress)}
      >
        <div
          className="blog-progress-fill"
          style={{
            width: `${readProgress}%`,
          }}
        />
      </div>

      <div className="blog-post-page">
        {/* Sidebar */}
        <BlogSidebar posts={blogPosts} />

        {/* Article Content */}
        <main className="blog-post-main">
          <Link href="/blog">
            ← {t("post.back_to_blog")}
          </Link>

          <article className="blog-post-article">
            <header className="blog-post-header">
              <div className="blog-post-meta-row">
                <span className="blog-post-category">
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path
                      d={
                        "M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 " +
                        "0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"
                      }
                    />
                    <line
                      x1="7"
                      y1="7"
                      x2="7.01"
                      y2="7"
                    />
                  </svg>
                  {post.category}
                </span>

                <span className="blog-meta-date">
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <rect
                      x="3"
                      y="4"
                      width="18"
                      height="18"
                      rx="2"
                      ry="2"
                    />
                    <line
                      x1="16"
                      y1="2"
                      x2="16"
                      y2="6"
                    />
                    <line
                      x1="8"
                      y1="2"
                      x2="8"
                      y2="6"
                    />
                    <line
                      x1="3"
                      y1="10"
                      x2="21"
                      y2="10"
                    />
                  </svg>
                  {post.date}
                </span>

                <span className="blog-meta-read">
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                    />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  {post.readTime}
                </span>
              </div>

              <h1 className="blog-post-title">
                {post.title}
              </h1>

              <p className="blog-post-excerpt">
                {post.excerpt}
              </p>

              <div className="blog-card-tags">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="blog-tag"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </header>

            <hr className="blog-post-divider" />

            {/* Markdown Article Body */}
            <div className="blog-post-body">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  a: ({ href, children }) => {
                    const isExternal =
                      href?.startsWith("http");

                    if (isExternal) {
                      return (
                        <a href={href} target="_blank" rel="noopener noreferrer">
                          {children}
                        </a>
                      );
                    }

                    return (
                      <Link href={href}>
                        {children}
                      </Link>
                    );
                  },

                  table: ({ children }) => (
                    <div className="blog-table-wrap">
                      <table>{children}</table>
                    </div>
                  ),

                  code: ({
                    inline,
                    className,
                    children,
                  }) => {
                    if (inline) {
                      return (
                        <code>{children}</code>
                      );
                    }

                    return (
                      <pre className="blog-code-block">
                        <code className={className}>
                          {children}
                        </code>
                      </pre>
                    );
                  },
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </article>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section className="blog-related">
              <h3 className="blog-related-title">
                {t("post.related_articles")}
              </h3>

              <div className="blog-related-grid">
                {relatedPosts.map(
                  (relatedPost) => (
                    <Link
                      key={relatedPost.id}
                      href={`/blog/${relatedPost.slug}`}
                      className="blog-related-card"
                    >
                      <span className="blog-related-category">
                        {relatedPost.category}
                      </span>

                      <h4 className="blog-related-card-title">
                        {relatedPost.title}
                      </h4>

                      <span className="blog-related-date">
                        {relatedPost.date}
                      </span>
                    </Link>
                  )
                )}
              </div>
            </section>
          )}
        </main>
      </div>
    </>
  );
}