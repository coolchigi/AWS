import React from "react";
import { Link } from "react-router-dom";
import type { PostMeta } from "../../types/blog";
import { strandsVsAdk, type Series } from "../../data/series";
import { formatPostDate } from "../../utils/date";
import {
  blogLinkClass,
  cardClass,
  cardDescClass,
  cardHeadClass,
  cardLinksClass,
  cardMetaClass,
  cardTitleClass,
} from "../ui";

const SeriesCard: React.FC<{ series: Series }> = ({ series }) => {
  const firstPublished = series.parts.find((part) => part.slug);

  return (
    <article className={`${cardClass} sm:col-span-2`}>
      <div className={cardHeadClass}>
        <h3 className={cardTitleClass}>
          {firstPublished ? (
            <Link to={`/blog/${firstPublished.slug}`} className={blogLinkClass}>
              {series.name}
            </Link>
          ) : (
            series.name
          )}
        </h3>
        <time className={cardMetaClass} dateTime={series.date}>
          {formatPostDate(series.date)}
        </time>
      </div>
      <p className={cardDescClass}>{series.description}</p>
      <ol className="mt-1 grid gap-2.5 text-[0.9375rem] sm:grid-cols-[max-content_minmax(0,1fr)] sm:gap-x-5">
        {series.parts.map((part) => (
          <li key={part.label} className="grid gap-0.5 sm:contents">
            {part.slug ? (
              <Link to={`/blog/${part.slug}`} className={`${blogLinkClass} font-medium`}>
                {part.label}
              </Link>
            ) : (
              <span className="font-medium">{part.label}</span>
            )}
            <span className="text-muted">
              {part.summary}
              {part.coming && ` Coming ${part.coming}.`}
            </span>
          </li>
        ))}
      </ol>
      <p className={cardLinksClass}>
        <a
          href={series.source}
          target="_blank"
          rel="noopener noreferrer"
          className={`${blogLinkClass} font-medium`}
        >
          Source
        </a>
      </p>
    </article>
  );
};

const PostCard: React.FC<{ post: PostMeta }> = ({ post }) => (
  <article className={cardClass}>
    <div className={cardHeadClass}>
      <h3 className={cardTitleClass}>
        <Link to={`/blog/${post.slug}`} className={blogLinkClass}>
          {post.title}
        </Link>
      </h3>
      <time className={cardMetaClass} dateTime={post.date}>
        {formatPostDate(post.date)}
      </time>
    </div>
    <p className={cardDescClass}>{post.description}</p>
  </article>
);

// The Strands vs ADK series card on top, then posts that aren't part of a series.
// Used on the homepage and the Blogs page so both look the same.
const BlogCards: React.FC<{ posts: PostMeta[] }> = ({ posts }) => (
  <div className="grid gap-4 sm:grid-cols-2">
    <SeriesCard series={strandsVsAdk} />
    {posts.map((post) => (
      <PostCard key={post.slug} post={post} />
    ))}
  </div>
);

export default BlogCards;
