import { useParams } from "react-router-dom";
import { posts } from "@/data/posts";

export default function BlogPost() {
  const { lang, slug } = useParams();

  const language = lang || "es";

  const post = posts.find(p =>
    Object.values(p.slug).includes(slug || "")
  );

  if (!post) {
    return <div className="text-white p-10">Artículo no encontrado</div>;
  }

  const title = post.title[language as keyof typeof post.title];
  const content = post.content[language as keyof typeof post.content];

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white px-6 py-10 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">{title}</h1>

      <p className="text-gray-300 whitespace-pre-line">
        {content}
      </p>
    </div>
  );
}