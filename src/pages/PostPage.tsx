import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { fetchPost } from '../utils/api';
import './PostPage.css';

interface Post {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  featured_media: number;
  date: string;
}

const PostPage = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: post, isLoading, error } = useQuery({
    queryKey: ['post', slug],
    queryFn: () => fetchPost(slug!),
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Ładowanie...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="error">
        <p>Post nie został znaleziony.</p>
      </div>
    );
  }

  const postData = post as Post;

  return (
    <article className="post-page">
      <div className="container">
        {postData.featured_media > 0 && (
          <img
            src={`${window.wpReactTheme?.apiUrl || ''}media/${postData.featured_media}`}
            alt={postData.title.rendered}
            className="post-featured-image"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        )}
        <header className="post-header">
          <h1>{postData.title.rendered}</h1>
          <time dateTime={postData.date}>
            {new Date(postData.date).toLocaleDateString('pl-PL', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </header>
        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: postData.content.rendered }}
        />
      </div>
    </article>
  );
};

export default PostPage;

