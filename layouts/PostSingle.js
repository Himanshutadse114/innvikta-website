import config from "@config/config.json";
import dateFormat from "@lib/utils/dateFormat";
import readingTime from "@lib/utils/readingTime";
import { markdownify } from "@lib/utils/textConverter";
import MDXContent from "app/helper/MDXContent";
import Image from "next/image";
import Cta from "./components/Cta";
import ImageFallback from "./components/ImageFallback";
import Share from "./components/Share";
import TableOfContents from "./components/TableOfContents";
import Post from "./partials/Post";
import SeoMeta from "./partials/SeoMeta";

const PostSingle = ({ frontmatter, content, recentPosts, slug }) => {
  let { description, title, date, image, author } = frontmatter;
  description = description ? description : content.slice(0, 120);

  return (
    <>
      <SeoMeta title={title} description={description} image={image} />
      <section className="section pt-0">
        <div className="container">
          <article>
            <div className="row justify-center mt-10 mb-10">
              <div className="lg:col-10">
                {image && (
                  <Image
                    src={image}
                    height="700"
                    width="1120"
                    alt={title}
                    priority={true}
                    className="fade w-full rounded-lg "
                  />
                )}
              </div>
            </div>

            <div className="row justify-center">
              {/* Left Sidebar: TOC & Share */}
              <div className="hidden lg:block lg:col-3 pr-8">
                <div className="sticky top-36 self-start flex flex-col gap-10">
                  <TableOfContents content={content} />
                  
                  <div className="border-t border-slate-100 pt-6">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Share Article</h4>
                    <Share
                      title={title}
                      description={description}
                      slug={`blog/${slug}`}
                      className="flex gap-4 text-xl text-slate-400 [&_a]:transition-colors [&_a]:duration-200 [&_a:hover]:text-primary"
                    />
                  </div>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="col-12 lg:col-7">
                {markdownify(title, "h1", "h2")}
                <div className="mt-6 flex items-center mb-10">
                  <div className="overflow-hidden rounded-full border-2 border-white shadow-[0_0_0_2px] shadow-primary">
                    <ImageFallback
                      src={author.avatar}
                      width={50}
                      height={50}
                      alt="author"
                    />
                  </div>
                  <div className="pl-5">
                    <p className="font-medium text-dark">{author.name}</p>
                    <p className="text-sm text-slate-500">
                      {dateFormat(date)} - {readingTime(content)}
                    </p>
                  </div>
                </div>

                {/* Mobile Share */}
                <div className="block lg:hidden mb-10 border-y py-4 border-slate-100">
                  <Share
                    title={title}
                    description={description}
                    slug={`blog/${slug}`}
                    className="flex gap-5 text-2xl text-slate-400 justify-start"
                  />
                </div>

                <div className="content text-left">
                  <MDXContent content={content} />
                </div>
              </div>
            </div>
          </article>

          <div className="section mt-16">
            <h2 className="section-title text-center">Recent Articles</h2>
            <div className="row justify-center">
              {recentPosts.slice(0, 2).map((post, index) => (
                <div key={"post-" + index} className="animate mt-16 lg:col-5">
                  <Post post={post} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Cta />
    </>
  );
};

export default PostSingle;
