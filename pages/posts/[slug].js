// Final [slug].js Code...
import Head from 'next/head';
import Layout from '../../components/Layout';

const AdsterraBanner = ({ bannerCode }) => {
  if (!bannerCode) return null;
  return <div style={{ margin: '2rem auto', textAlign: 'center' }} dangerouslySetInnerHTML={{ __html: bannerCode }} />;
};

const SocialShare = ({ url, title }) => {
    return (
        <div style={{marginTop: '2rem'}}>
            <h4>Share this article:</h4>
            <a href={`https://twitter.com/intent/tweet?url=${url}&text=${title}`} target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${url}`} target="_blank" rel="noopener noreferrer" style={{marginLeft: '1rem'}}>Facebook</a>
        </div>
    )
}

export default function PostPage({ post, globalSettings }) {
  if (!post) return <p>Post not found!</p>;
  const siteUrl = 'https://your-domain.com'; // IMPORTANT: Isko baad mein badalna hai
  const postUrl = `${siteUrl}/posts/${post.attributes.slug}`;
  return (
    <Layout globalSettings={globalSettings}>
      <Head>
        <title>{post.attributes.meta_title || post.attributes.title}</title>
        <meta name="description" content={post.attributes.meta_description || ''} />
      </Head>
      <article style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1>{post.attributes.title}</h1>
        <div className="author-box" style={{ marginBottom: '1rem' }}>
          <p>By {post.attributes.author?.data?.attributes?.name || 'Staff'}</p>
          <p>Published: {new Date(post.attributes.publishedAt).toLocaleDateString()}</p>
        </div>
        {post.attributes.featured_image?.data && <img src={post.attributes.featured_image.data.attributes.url} alt={post.attributes.featured_image.data.attributes.alternativeText || ''} style={{ width: '100%', height: 'auto' }} />}
        <AdsterraBanner bannerCode={globalSettings?.adsterra?.inContentBanner1} />
        <div className="post-content" dangerouslySetInnerHTML={{ __html: post.attributes.content }} />
        <AdsterraBanner bannerCode={globalSettings?.adsterra?.inContentBanner2} />
        <SocialShare url={postUrl} title={post.attributes.title} />
        <div id="comment-section" style={{marginTop: '3rem'}}>
            <h3>Comments</h3>
            {/* Yahan Disqus ka code paste karna hai */}
        </div>
      </article>
    </Layout>
  );
}

export async function getStaticPaths() { return { paths: [], fallback: 'blocking' }; }
export async function getStaticProps({ params }) {
  const apiUrl = process.env.STRAPI_API_URL;
  const postRes = await fetch(`${apiUrl}/api/posts?filters[slug][$eq]=${params.slug}&populate=*`);
  const postData = await postRes.json();
  const globalRes = await fetch(`${apiUrl}/api/global-setting?populate[adsterra]=*&populate[popup]=*`);
  const globalData = await globalRes.json();
  return {
    props: {
      post: postData.data[0] || null,
      globalSettings: globalData.data?.attributes || null,
    },
    revalidate: 60,
  };
}
