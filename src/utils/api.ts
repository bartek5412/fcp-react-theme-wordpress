interface FetchOptions {
  per_page?: number;
  page?: number;
  search?: string;
  categories?: number[];
}

const API_URL = window.wpReactTheme?.apiUrl || '/wp-json/wp/v2/';

export const fetchPosts = async (options: FetchOptions = {}) => {
  const params = new URLSearchParams();
  
  if (options.per_page) params.append('per_page', options.per_page.toString());
  if (options.page) params.append('page', options.page.toString());
  if (options.search) params.append('search', options.search);
  if (options.categories) {
    options.categories.forEach((cat) => {
      params.append('categories[]', cat.toString());
    });
  }

  const response = await fetch(`${API_URL}posts?${params.toString()}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }

  return response.json();
};

export const fetchPost = async (slug: string) => {
  const response = await fetch(`${API_URL}posts?slug=${encodeURIComponent(slug)}&_embed`);

  if (!response.ok) {
    throw new Error('Failed to fetch post');
  }

  const data = await response.json();
  if (data.length === 0) {
    throw new Error('Post not found');
  }
  return data[0];
};

export const fetchPage = async (slug: string) => {
  const response = await fetch(`${API_URL}pages?slug=${encodeURIComponent(slug)}&_embed`);

  if (!response.ok) {
    throw new Error('Failed to fetch page');
  }

  const data = await response.json();
  if (data.length === 0) {
    throw new Error('Page not found');
  }
  return data[0];
};

export const fetchCategories = async () => {
  const response = await fetch(`${API_URL}categories`);

  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }

  return response.json();
};

