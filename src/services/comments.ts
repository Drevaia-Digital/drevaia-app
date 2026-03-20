import { supabase } from '@/lib/supabase';
import type { Comment } from '@/lib/supabase';

export interface CreateCommentData {
  postId: string;
  content: string;
  authorName: string;
  authorEmail?: string;
  parentId?: string;
}

export interface UpdateCommentData {
  content: string;
}

class CommentService {
  async getComments(postId: string): Promise<Comment[]> {
    const { data, error } = await supabase
      .from('comments')
      .select(`
        *,
        profiles:user_id (id, full_name, avatar_url)
      `)
      .eq('post_id', postId)
      .is('parent_id', null)
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Fetch replies for each comment
    const commentsWithReplies = await Promise.all(
      (data || []).map(async (comment) => {
        const replies = await this.getReplies(comment.id);
        return { ...comment, replies };
      })
    );

    return commentsWithReplies;
  }

  async getReplies(parentId: string): Promise<Comment[]> {
    const { data, error } = await supabase
      .from('comments')
      .select(`
        *,
        profiles:user_id (id, full_name, avatar_url)
      `)
      .eq('parent_id', parentId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  async createComment(data: CreateCommentData): Promise<Comment> {
    const { data: comment, error } = await supabase
      .from('comments')
      .insert({
        post_id: data.postId,
        content: data.content,
        author_name: data.authorName,
        author_email: data.authorEmail,
        parent_id: data.parentId || null,
        likes: 0,
      })
      .select()
      .single();

    if (error) throw error;
    return comment;
  }

  async updateComment(commentId: string, data: UpdateCommentData): Promise<Comment> {
    const { data: comment, error } = await supabase
      .from('comments')
      .update({
        content: data.content,
        updated_at: new Date().toISOString(),
      })
      .eq('id', commentId)
      .select()
      .single();

    if (error) throw error;
    return comment;
  }

  async deleteComment(commentId: string): Promise<void> {
    // Delete replies first
    await supabase
      .from('comments')
      .delete()
      .eq('parent_id', commentId);

    // Delete comment
    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', commentId);

    if (error) throw error;
  }

  async likeComment(commentId: string): Promise<number> {
    // Get current likes
    const { data: comment, error: fetchError } = await supabase
      .from('comments')
      .select('likes')
      .eq('id', commentId)
      .single();

    if (fetchError) throw fetchError;

    // Update likes
    const { data: updated, error: updateError } = await supabase
      .from('comments')
      .update({ likes: (comment?.likes || 0) + 1 })
      .eq('id', commentId)
      .select('likes')
      .single();

    if (updateError) throw updateError;
    return updated?.likes || 0;
  }

  async unlikeComment(commentId: string): Promise<number> {
    // Get current likes
    const { data: comment, error: fetchError } = await supabase
      .from('comments')
      .select('likes')
      .eq('id', commentId)
      .single();

    if (fetchError) throw fetchError;

    const newLikes = Math.max(0, (comment?.likes || 0) - 1);

    // Update likes
    const { data: updated, error: updateError } = await supabase
      .from('comments')
      .update({ likes: newLikes })
      .eq('id', commentId)
      .select('likes')
      .single();

    if (updateError) throw updateError;
    return updated?.likes || 0;
  }

  async getCommentCount(postId: string): Promise<number> {
    const { count, error } = await supabase
      .from('comments')
      .select('*', { count: 'exact', head: true })
      .eq('post_id', postId);

    if (error) throw error;
    return count || 0;
  }
}

export const commentService = new CommentService();
export default commentService;
