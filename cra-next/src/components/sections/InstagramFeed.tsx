"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import SectionHeading from "@/components/ui/SectionHeading";

interface Post {
  id: string;
  imageUrl: string | null;
  caption: string;
  permalink: string;
  timestamp: string;
}

export default function InstagramFeed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isPlaceholder, setIsPlaceholder] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/instagram")
      .then((r) => r.json())
      .then((data) => {
        setPosts(data.posts);
        setIsPlaceholder(data.isPlaceholder);
      })
      .catch(() => {
        setPosts(
          Array.from({ length: 9 }, (_, i) => ({
            id: `fallback-${i}`,
            imageUrl: null,
            caption: "",
            permalink: "https://instagram.com/claimremedyadjusters",
            timestamp: new Date().toISOString(),
          }))
        );
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="bg-[#111118] py-24 lg:py-32 border-t border-white/8">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUp}
          className="text-center mb-14"
        >
          <SectionHeading
            label="Follow our work"
            heading="@claimremedyadjusters"
            className="text-center"
          />
        </motion.div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-xl bg-[#0a0a0f] animate-pulse"
              />
            ))}
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {posts.map((post) => (
              <motion.a
                key={post.id}
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeInUp}
                className="group relative aspect-square rounded-xl overflow-hidden border border-white/8 bg-[#0a0a0f] hover:scale-[1.02] hover:border-[#3b82f6]/20 transition-transform duration-300"
              >
                {post.imageUrl && !isPlaceholder ? (
                  <>
                    <img
                      src={post.imageUrl}
                      alt={post.caption.slice(0, 80)}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors duration-300 flex items-end p-4">
                      <p className="text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-3">
                        {post.caption.slice(0, 100)}
                        {post.caption.length > 100 ? "..." : ""}
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-center px-4">
                    {/* Instagram icon */}
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#9999aa"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <circle cx="12" cy="12" r="5" />
                      <circle cx="17.5" cy="6.5" r="1.5" fill="#9999aa" stroke="none" />
                    </svg>
                    <span className="text-xs font-semibold uppercase tracking-widest text-[#666677]">
                      Coming Soon
                    </span>
                  </div>
                )}
              </motion.a>
            ))}
          </motion.div>
        )}

        {/* Follow button */}
        <div className="mt-10 text-center">
          <a
            href="https://instagram.com/claimremedyadjusters"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#0a0a0f] border border-white/8 text-[#f0f0f5] font-semibold px-7 py-3.5 rounded-full hover:border-[#3b82f6]/30 hover:shadow-[0_0_24px_rgba(59,130,246,0.08)] transition-[border-color,box-shadow] duration-300"
          >
            Follow Us on Instagram
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Social icons */}
        <div className="mt-6 flex items-center justify-center gap-5">
          {/* Instagram */}
          <a
            href="https://instagram.com/claimremedyadjusters"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#666677] hover:text-[#3b82f6] transition-colors"
            aria-label="Instagram"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="5" />
              <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
            </svg>
          </a>
          {/* Facebook */}
          <a
            href="#"
            className="text-[#666677] hover:text-[#3b82f6] transition-colors"
            aria-label="Facebook"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
            </svg>
          </a>
          {/* Google Business */}
          <a
            href="https://search.google.com/local/reviews?placeid=ChIJy6vXSOEIMK8RJvzhZzwTlxI"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#666677] hover:text-[#3b82f6] transition-colors"
            aria-label="Google Business"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
