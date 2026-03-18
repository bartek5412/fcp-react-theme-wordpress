import { useQuery } from '@tanstack/react-query';
import { fetchPosts, fetchPost, fetchPage, fetchCategories } from '../utils/api';
import { WordPressPost, WordPressPage, WordPressCategory } from '../types/wordpress';

export const usePosts = (options?: { per_page?: number; page?: number; search?: string }) => {
  return useQuery<WordPressPost[]>({
    queryKey: ['posts', options],
    queryFn: () => fetchPosts(options || {}),
  });
};

export const usePost = (slug: string) => {
  return useQuery<WordPressPost>({
    queryKey: ['post', slug],
    queryFn: () => fetchPost(slug),
    enabled: !!slug,
  });
};

export const usePage = (slug: string) => {
  return useQuery<WordPressPage>({
    queryKey: ['page', slug],
    queryFn: () => fetchPage(slug),
    enabled: !!slug,
  });
};

export const useCategories = () => {
  return useQuery<WordPressCategory[]>({
    queryKey: ['categories'],
    queryFn: () => fetchCategories(),
  });
};

