import { getClient } from "@/config/apolloClient";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { gql } from "@apollo/client";
import { notFound } from "next/navigation";

const query = gql`
  query blogPostEntryQuery($slug: String!) {
    blogPostCollection(where: { slug: $slug }) {
      total
      items {
        title
        text {
          json
        }
      }
    }
  }
`;

const querySlugs = gql`
  query {
    blogPostCollection {
      items {
        slug
      }
    }
  }
`;

const getAllSlugs = async () => {
  const client = getClient();

  const {
    data: { blogPostCollection },
  } = await client.query({
    query: querySlugs,
    context: {
      fetchOptions: {
        next: {
          revalidate: 0,
        },
      },
    },
  });

  return blogPostCollection.items;
};

// generateStaticParams can be used to statically generate routes at build time
export async function generateStaticParams() {
  const allSlugs = await getAllSlugs();
  return allSlugs.map((blog: any) => ({
    slug: blog.slug,
  }));
}

const getBlogBySlug = async (slug: string) => {
  const client = getClient();

  const {
    data: { blogPostCollection },
  } = await client.query({
    query,
    context: {
      fetchOptions: {
        next: {
          revalidate: 0,
        },
      },
    },
    variables: {
      slug: slug,
    },
  });

  return blogPostCollection.items[0];
};

// dynamically generate metadata from blog post
export async function generateMetadata({ params }: any) {
  const allBlogs = await getBlogBySlug(params.slug);

  return {
    title: allBlogs.title,
  };
}

// export const revalidate = 0;

const BlogPage = async ({ params }: any) => {
  const blogPost = await getBlogBySlug(params.slug);

  if (!blogPost) {
    notFound(); // Render 404 Page from not-found.tsx component
  }

  return (
    <div>
      <div>
        <p key={blogPost.title}>{blogPost.title}</p>
        <div className="prose">
          {documentToReactComponents(blogPost.text.json)}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
