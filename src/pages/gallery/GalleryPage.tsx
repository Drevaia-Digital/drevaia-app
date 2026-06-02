import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { supabase } from '@/lib/supabase';
import { SmartImage } from '@/components/ui/SmartImage';

interface Post {
  id: string;
  image_url: string;
  caption: string;
  platform: string;
  status: string;
  created_at: string;
}

export default function GalleryPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();

  async function loadPosts() {
    const { data, error } = await supabase
      .from('drevaia_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setPosts(data);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadPosts();

    const channel = supabase
      .channel('gallery-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'drevaia_posts',
        },
        () => {
          loadPosts();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-white/70">
          Loading gallery...
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen px-5 pb-20 pt-32">

      {/* Header */}
      <div className="mx-auto mb-16 max-w-6xl">

        <p
          className="
            mb-3
            text-sm
            uppercase
            tracking-[0.3em]

            text-primary/70
          "
        >
          Drevaia AI Gallery
        </p>

        <h1
          className="
            max-w-4xl

            text-4xl
            font-black
            leading-tight

            text-white/95
            drop-shadow-[0_0_30px_rgba(255,255,255,0.08)]

            sm:text-5xl
            md:text-6xl
          "
        >
          Cinematic emotional creations powered by AI.
        </h1>

      </div>

      {/* Masonry Grid */}
<div
  className="
    mx-auto
    max-w-7xl

    columns-1
    gap-6

    sm:columns-2
    lg:columns-3
  "
>

        {posts.map((post) => (
          <article
            key={post.id}
            onClick={() => navigate(`/gallery/${post.id}`)}
            className="
              mb-6
              break-inside-avoid  
              
              group
              cursor-pointer
              overflow-hidden

              rounded-3xl

              border
              border-white/10

              bg-white/[0.03]
              backdrop-blur-xl

              transition-all
              duration-500

              hover:-translate-y-1
              hover:border-primary/20
              hover:shadow-[0_0_60px_rgba(214,164,92,0.12)]
            "
          >

            {/* Image */}
            <div className="relative overflow-hidden">

              <SmartImage
  src={post.image_url}
  alt={post.caption}
  className="
    max-h-[620px]
    h-auto
    w-full
    object-cover

    transition-transform
    duration-700

    group-hover:scale-[1.03]
  "
/>

              {/* Overlay */}
              <div
                className="
                  absolute
                  inset-0

                  bg-gradient-to-t
                  from-black/80
                  via-black/10
                  to-transparent
                "
              />

            </div>

            {/* Content */}
            <div className="space-y-4 p-6">

              <div className="flex items-center justify-between">

                <span
                  className="
                    rounded-full

                    border
                    border-primary/20

                    bg-primary/10

                    px-3
                    py-1

                    text-xs
                    uppercase
                    tracking-[0.18em]

                    text-primary
                  "
                >
                  {post.platform}
                </span>

                <span className="text-xs text-white/40">
                  {post.status}
                </span>

              </div>

              <p
                className="
                  line-clamp-4

                  text-sm
                  leading-relaxed

                  text-white/80
                "
              >
                {post.caption}
              </p>

            </div>

          </article>
        ))}

      </div>

      </main>
  );
}