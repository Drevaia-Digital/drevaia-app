import { useState, useEffect } from 'react';
import { MessageCircle, Send, ThumbsUp, User, Clock, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import type { Language } from '@/i18n';

interface Comment {
  id: string;
  author: string;
  avatar?: string;
  content: string;
  createdAt: string;
  likes: number;
  replies: Comment[];
  isLiked?: boolean;
  isEditing?: boolean;
}

interface CommentSystemProps {
  postId: string;
  language: Language;
}

export function CommentSystem({ postId, language }: CommentSystemProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');

  const labels = {
    title: language === 'es' ? 'Comentarios' : language === 'en' ? 'Comments' : language === 'fr' ? 'Commentaires' : 'Comentários',
    placeholder: language === 'es' ? 'Escribe tu comentario...' : language === 'en' ? 'Write your comment...' : language === 'fr' ? 'Écrivez votre commentaire...' : 'Escreva seu comentário...',
    namePlaceholder: language === 'es' ? 'Tu nombre' : language === 'en' ? 'Your name' : language === 'fr' ? 'Votre nom' : 'Seu nome',
    submit: language === 'es' ? 'Publicar' : language === 'en' ? 'Post' : language === 'fr' ? 'Publier' : 'Publicar',
    reply: language === 'es' ? 'Responder' : language === 'en' ? 'Reply' : language === 'fr' ? 'Répondre' : 'Responder',
    cancel: language === 'es' ? 'Cancelar' : language === 'en' ? 'Cancel' : language === 'fr' ? 'Annuler' : 'Cancelar',
    like: language === 'es' ? 'Me gusta' : language === 'en' ? 'Like' : language === 'fr' ? 'J\'aime' : 'Gostar',
    edit: language === 'es' ? 'Editar' : language === 'en' ? 'Edit' : language === 'fr' ? 'Modifier' : 'Editar',
    delete: language === 'es' ? 'Eliminar' : language === 'en' ? 'Delete' : language === 'fr' ? 'Supprimer' : 'Excluir',
    noComments: language === 'es' ? 'Sé el primero en comentar' : language === 'en' ? 'Be the first to comment' : language === 'fr' ? 'Soyez le premier à commenter' : 'Seja o primeiro a comentar',
    replies: language === 'es' ? 'respuestas' : language === 'en' ? 'replies' : language === 'fr' ? 'réponses' : 'respostas',
  };

  // Load comments from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`drevaia-comments-${postId}`);
    if (saved) {
      setComments(JSON.parse(saved));
    }
  }, [postId]);

  // Save comments to localStorage
  const saveComments = (updatedComments: Comment[]) => {
    localStorage.setItem(`drevaia-comments-${postId}`, JSON.stringify(updatedComments));
    setComments(updatedComments);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !authorName.trim()) return;

    setIsSubmitting(true);

    const comment: Comment = {
      id: Date.now().toString(),
      author: authorName,
      content: newComment,
      createdAt: new Date().toISOString(),
      likes: 0,
      replies: [],
    };

    saveComments([comment, ...comments]);
    setNewComment('');
    setIsSubmitting(false);
  };

  const handleReply = (parentId: string) => {
    if (!replyContent.trim() || !authorName.trim()) return;

    const reply: Comment = {
      id: Date.now().toString(),
      author: authorName,
      content: replyContent,
      createdAt: new Date().toISOString(),
      likes: 0,
      replies: [],
    };

    const updatedComments = comments.map(c => {
      if (c.id === parentId) {
        return { ...c, replies: [...c.replies, reply] };
      }
      return c;
    });

    saveComments(updatedComments);
    setReplyContent('');
    setReplyingTo(null);
  };

  const handleLike = (commentId: string, isReply = false, parentId?: string) => {
    if (isReply && parentId) {
      const updatedComments = comments.map(c => {
        if (c.id === parentId) {
          return {
            ...c,
            replies: c.replies.map(r => 
              r.id === commentId 
                ? { ...r, likes: r.isLiked ? r.likes - 1 : r.likes + 1, isLiked: !r.isLiked }
                : r
            )
          };
        }
        return c;
      });
      saveComments(updatedComments);
    } else {
      const updatedComments = comments.map(c => 
        c.id === commentId 
          ? { ...c, likes: c.isLiked ? c.likes - 1 : c.likes + 1, isLiked: !c.isLiked }
          : c
      );
      saveComments(updatedComments);
    }
  };

  const handleDelete = (commentId: string, isReply = false, parentId?: string) => {
    if (isReply && parentId) {
      const updatedComments = comments.map(c => {
        if (c.id === parentId) {
          return { ...c, replies: c.replies.filter(r => r.id !== commentId) };
        }
        return c;
      });
      saveComments(updatedComments);
    } else {
      const updatedComments = comments.filter(c => c.id !== commentId);
      saveComments(updatedComments);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return language === 'es' ? 'Ahora' : 'Just now';
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    if (days < 30) return `${days}d`;
    
    return date.toLocaleDateString();
  };

  return (
    <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <MessageCircle className="w-5 h-5" />
        {labels.title}
        <span className="text-sm font-normal text-gray-500">
          ({comments.reduce((acc, c) => acc + 1 + c.replies.length, 0)})
        </span>
      </h3>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex gap-4 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
            <User className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 space-y-3">
            <Input
              placeholder={labels.namePlaceholder}
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="max-w-xs"
            />
            <Textarea
              placeholder={labels.placeholder}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={3}
            />
            <div className="flex justify-end">
              <Button 
                type="submit" 
                disabled={!newComment.trim() || !authorName.trim() || isSubmitting}
              >
                <Send className="w-4 h-4 mr-2" />
                {labels.submit}
              </Button>
            </div>
          </div>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>{labels.noComments}</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="space-y-4">
              {/* Main Comment */}
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">
                    {comment.author.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {comment.author}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatDate(comment.createdAt)}
                      </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{comment.content}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-4 mt-2 ml-2">
                    <button
                      onClick={() => handleLike(comment.id)}
                      className={`flex items-center gap-1 text-sm transition-colors ${
                        comment.isLiked 
                          ? 'text-purple-600 dark:text-purple-400' 
                          : 'text-gray-500 hover:text-purple-600'
                      }`}
                    >
                      <ThumbsUp className={`w-4 h-4 ${comment.isLiked ? 'fill-current' : ''}`} />
                      {comment.likes > 0 && comment.likes}
                    </button>
                    <button
                      onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                      className="text-sm text-gray-500 hover:text-purple-600 transition-colors"
                    >
                      {labels.reply}
                    </button>
                    <button
                      onClick={() => handleDelete(comment.id)}
                      className="text-sm text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Reply Form */}
                  {replyingTo === comment.id && (
                    <div className="mt-4 ml-4">
                      <div className="flex gap-3">
                        <Textarea
                          placeholder={labels.placeholder}
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                          rows={2}
                          className="flex-1"
                        />
                      </div>
                      <div className="flex gap-2 mt-2 justify-end">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setReplyingTo(null)}
                        >
                          {labels.cancel}
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => handleReply(comment.id)}
                          disabled={!replyContent.trim()}
                        >
                          <Send className="w-4 h-4 mr-2" />
                          {labels.submit}
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Replies */}
                  {comment.replies.length > 0 && (
                    <div className="mt-4 ml-4 space-y-4">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="flex gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-bold text-xs">
                              {reply.author.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-3">
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-medium text-sm text-gray-900 dark:text-white">
                                  {reply.author}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {formatDate(reply.createdAt)}
                                </span>
                              </div>
                              <p className="text-sm text-gray-700 dark:text-gray-300">
                                {reply.content}
                              </p>
                            </div>
                            <div className="flex items-center gap-3 mt-1 ml-2">
                              <button
                                onClick={() => handleLike(reply.id, true, comment.id)}
                                className={`flex items-center gap-1 text-xs transition-colors ${
                                  reply.isLiked 
                                    ? 'text-purple-600 dark:text-purple-400' 
                                    : 'text-gray-500 hover:text-purple-600'
                                }`}
                              >
                                <ThumbsUp className={`w-3 h-3 ${reply.isLiked ? 'fill-current' : ''}`} />
                                {reply.likes > 0 && reply.likes}
                              </button>
                              <button
                                onClick={() => handleDelete(reply.id, true, comment.id)}
                                className="text-xs text-gray-400 hover:text-red-500 transition-colors"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
