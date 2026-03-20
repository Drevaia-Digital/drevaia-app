import { useState, useEffect } from 'react';
import { MessageCircle, Send, ThumbsUp, User, Clock, Trash2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { commentService } from '@/services/comments';
import { useAuth } from '@/hooks/useAuth';
import type { Comment } from '@/lib/supabase';
import type { Language } from '@/i18n';

interface CommentSystemProps {
  postId: string;
  language: Language;
}

export function CommentSystemSupabase({ postId, language }: CommentSystemProps) {
  const { user, profile, isAuthenticated } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [error, setError] = useState('');

  const labels = {
    title: language === 'es' ? 'Comentarios' : language === 'en' ? 'Comments' : language === 'fr' ? 'Commentaires' : 'Comentários',
    placeholder: language === 'es' ? 'Escribe tu comentario...' : language === 'en' ? 'Write your comment...' : language === 'fr' ? 'Écrivez votre commentaire...' : 'Escreva seu comentário...',
    namePlaceholder: language === 'es' ? 'Tu nombre' : language === 'en' ? 'Your name' : language === 'fr' ? 'Votre nom' : 'Seu nome',
    submit: language === 'es' ? 'Publicar' : language === 'en' ? 'Post' : language === 'fr' ? 'Publier' : 'Publicar',
    reply: language === 'es' ? 'Responder' : language === 'en' ? 'Reply' : language === 'fr' ? 'Répondre' : 'Responder',
    cancel: language === 'es' ? 'Cancelar' : language === 'en' ? 'Cancel' : language === 'fr' ? 'Annuler' : 'Cancelar',
    like: language === 'es' ? 'Me gusta' : language === 'en' ? 'Like' : language === 'fr' ? 'J\'aime' : 'Gostar',
    delete: language === 'es' ? 'Eliminar' : language === 'en' ? 'Delete' : language === 'fr' ? 'Supprimer' : 'Excluir',
    noComments: language === 'es' ? 'Sé el primero en comentar' : language === 'en' ? 'Be the first to comment' : language === 'fr' ? 'Soyez le premier à commenter' : 'Seja o primeiro a comentar',
    loginToComment: language === 'es' ? 'Inicia sesión para comentar' : language === 'en' ? 'Sign in to comment' : language === 'fr' ? 'Connectez-vous pour commenter' : 'Entre para comentar',
  };

  useEffect(() => {
    loadComments();
  }, [postId]);

  const loadComments = async () => {
    try {
      setIsLoading(true);
      const data = await commentService.getComments(postId);
      setComments(data);
    } catch (err) {
      console.error('Error loading comments:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    setError('');

    try {
      await commentService.createComment({
        postId,
        content: newComment,
        authorName: isAuthenticated ? profile?.full_name || user?.email || 'Usuario' : authorName || 'Anónimo',
        authorEmail: user?.email,
      });
      setNewComment('');
      await loadComments();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReply = async (parentId: string) => {
    if (!replyContent.trim()) return;

    try {
      await commentService.createComment({
        postId,
        content: replyContent,
        authorName: isAuthenticated ? profile?.full_name || user?.email || 'Usuario' : authorName || 'Anónimo',
        authorEmail: user?.email,
        parentId,
      });
      setReplyContent('');
      setReplyingTo(null);
      await loadComments();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleLike = async (commentId: string) => {
    try {
      await commentService.likeComment(commentId);
      await loadComments();
    } catch (err) {
      console.error('Error liking comment:', err);
    }
  };

  const handleDelete = async (commentId: string) => {
    if (!confirm(language === 'es' ? '¿Eliminar comentario?' : 'Delete comment?')) return;

    try {
      await commentService.deleteComment(commentId);
      await loadComments();
    } catch (err) {
      console.error('Error deleting comment:', err);
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

  const totalComments = comments.reduce((acc, c) => acc + 1 + (c.replies?.length || 0), 0);

  return (
    <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <MessageCircle className="w-5 h-5" />
        {labels.title}
        <span className="text-sm font-normal text-gray-500">
          ({totalComments})
        </span>
      </h3>

      {/* Comment Form */}
      {!isAuthenticated && (
        <div className="mb-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl text-center">
          <p className="text-purple-700 dark:text-purple-300">
            {labels.loginToComment}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex gap-4">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
            {isAuthenticated && profile?.avatar_url ? (
              <img src={profile.avatar_url} alt="" className="w-full h-full rounded-full object-cover" />
            ) : (
              <User className="w-5 h-5 text-white" />
            )}
          </div>
          <div className="flex-1 space-y-3">
            {!isAuthenticated && (
              <Input
                placeholder={labels.namePlaceholder}
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="max-w-xs"
              />
            )}
            <Textarea
              placeholder={labels.placeholder}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={3}
              disabled={!isAuthenticated && !authorName}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <div className="flex justify-end">
              <Button 
                type="submit" 
                disabled={!newComment.trim() || isSubmitting || (!isAuthenticated && !authorName)}
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Send className="w-4 h-4 mr-2" />
                )}
                {labels.submit}
              </Button>
            </div>
          </div>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-6">
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
          </div>
        ) : comments.length === 0 ? (
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
                  {comment.profiles?.avatar_url ? (
                    <img src={comment.profiles.avatar_url} alt="" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <span className="text-white font-bold text-sm">
                      {comment.author_name.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {comment.author_name}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatDate(comment.created_at)}
                      </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{comment.content}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-4 mt-2 ml-2">
                    <button
                      onClick={() => handleLike(comment.id)}
                      className="flex items-center gap-1 text-sm text-gray-500 hover:text-purple-600 transition-colors"
                    >
                      <ThumbsUp className="w-4 h-4" />
                      {comment.likes > 0 && comment.likes}
                    </button>
                    <button
                      onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                      className="text-sm text-gray-500 hover:text-purple-600 transition-colors"
                    >
                      {labels.reply}
                    </button>
                    {(user?.id === comment.user_id || !comment.user_id) && (
                      <button
                        onClick={() => handleDelete(comment.id)}
                        className="text-sm text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Reply Form */}
                  {replyingTo === comment.id && (
                    <div className="mt-4 ml-4">
                      <Textarea
                        placeholder={labels.placeholder}
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        rows={2}
                      />
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
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-4 ml-4 space-y-4">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="flex gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-bold text-xs">
                              {reply.author_name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-3">
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-medium text-sm text-gray-900 dark:text-white">
                                  {reply.author_name}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {formatDate(reply.created_at)}
                                </span>
                              </div>
                              <p className="text-sm text-gray-700 dark:text-gray-300">
                                {reply.content}
                              </p>
                            </div>
                            <div className="flex items-center gap-3 mt-1 ml-2">
                              <button
                                onClick={() => handleLike(reply.id)}
                                className="flex items-center gap-1 text-xs text-gray-500 hover:text-purple-600 transition-colors"
                              >
                                <ThumbsUp className="w-3 h-3" />
                                {reply.likes > 0 && reply.likes}
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
