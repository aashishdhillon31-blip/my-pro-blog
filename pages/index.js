// Final Homepage Code...
import Layout from '../components/Layout';
import Link from 'next/link';

export default function HomePage({ posts, globalSettings }) {
  return (
    <Layout globalSettings={globalSettings}>
      <h1 style={{textAlign: 'center', fontSize: '2.5rem', marginBottom: '2rem'}}>Latest Articles</h1>
      <div className="post-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {posts.map(post => (
          <div key={post.id} style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
            <h2>
              <Link href={`/posts/${post.attributes.slug}`}>
                {post.attributes.title}
              </Link>
            </h2>
            <p>{post.attributes.excerpt}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const apiUrl = process.env.STRAPI_API_URL;
  const postsRes = await fetch(`${apiUrl}/api/posts`);
  const postsData = await postsRes.json();
  const globalRes = await fetch(`${apiUrl}/api/global-setting?populate[adsterra]=*&populate[popup]=*`);
  const globalData = await globalRes.json();

  return {
    props: {
      posts: postsData.data || [],
      globalSettings: globalData.data?.attributes || null,
    },
    revalidate: 60,
  };
}
