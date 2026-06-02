import { useEffect, useState } from 'react';

import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';

import { supabase } from '@/lib/supabase';

interface Post {
  id: string;
  image_url: string;
  caption: string;
  platform: string;
  status: string;
  created_at: string;
}

export default function GalleryDetailPage() {
  const { id } = useParams();

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadPost() {
    const { data, error } = await supabase
      .from('drevaia_posts')
      .select('*')
      .eq('id', id)
      .single();

    if (!error && data) {
      setPost(data);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadPost();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-white/70">
          Loading creation...
        </p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-white/60">
          Creation not found.
        </p>
      </div>
    );
  }

  return (
    <>
      <Helmet>

        <title>
  {post.caption.slice(0, 60)} | Drevaia AI Gallery
</title>

<meta
  name="description"
  content={post.caption.slice(0, 155)}
/>

<link
  rel="canonical"
  href={`https://drevaia.com/gallery/${post.id}`}
/>

<meta
  property="og:type"
  content="website"
/>

<meta
  property="og:title"
  content="Drevaia AI Creation"
/>

<meta
  property="og:description"
  content={post.caption.slice(0, 155)}
/>

<meta
  property="og:image"
  content={post.image_url}
/>

<meta
  property="og:url"
  content={`https://drevaia.com/gallery/${post.id}`}
/>

<meta
  name="twitter:card"
  content="summary_large_image"
/>

<meta
  name="twitter:title"
  content="Drevaia AI Creation"
/>

<meta
  name="twitter:description"
  content={post.caption.slice(0, 155)}
/>

<meta
  name="twitter:image"
  content={post.image_url}
/>

        <meta
          name="description"
          content={post.caption}
        />

        <meta
          property="og:image"
          content={post.image_url}
        />

      </Helmet>

      <main
        className="
          min-h-screen
          px-5
          pb-24
          pt-32
        "
      >

        <div
          className="
            mx-auto
            max-w-6xl
          "
        >

          {/* Back */}
          <Link
            to="/gallery"
            className="
              mb-10
              inline-flex

              text-sm
              uppercase
              tracking-[0.18em]

              text-primary/70

              transition-all
              duration-300

              hover:text-primary
            "
          >
            ← Back to Gallery
          </Link>

          {/* Image */}
          <div
            className="
              overflow-hidden
              rounded-[2rem]

              border
              border-white/10

              bg-white/[0.03]

              shadow-[0_0_100px_rgba(214,164,92,0.08)]
            "
          >

            <img
              src={post.image_url}
              alt={post.caption}
              className="
                max-h-[82vh]
                w-full
                object-cover
              "
            />

          </div>

          {/* Content */}
          <div
            className="
              mt-10
              max-w-4xl
            "
          >

            <div className="mb-6 flex items-center gap-4">

              <span
                className="
                  rounded-full

                  border
                  border-primary/20

                  bg-primary/10

                  px-4
                  py-2

                  text-xs
                  uppercase
                  tracking-[0.18em]

                  text-primary
                "
              >
                {post.platform}
              </span>

              <span className="text-sm text-white/40">
                {post.status}
              </span>

            </div>

            <p
              className="
                text-lg
                leading-relaxed
                text-white/80
              "
            >
              {post.caption}
            </p>

          </div>

        </div>

      </main>
    </>
  );
}