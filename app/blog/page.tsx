import {getClient} from "@/config/apolloClient";

import {gql} from "@apollo/client";
import Link from "next/link";

const query = gql`
query {
  blogPostCollection { 
  total
    items {
      slug
      sys {
        id
      }
      title
    }
  }
}
`
;

export const revalidate = 0;

const BlogPage = async () => {
    const client = getClient();
    const {data: {blogPostCollection}} = await client.query({
        query
    });

    return (
        <div>
            <div className="grid grid-cols-3 gap-5">
                {blogPostCollection.items.map((item: any) => (
                    <Link key={item.slug} href={`/blog/${item.slug}`}>
                        <div className="border-2 border-slate-200 hover:bg-slate-200 p-4">
                            <p>{item.title}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default BlogPage;