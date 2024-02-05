import InfoPost from "@components/InfoPost";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";
import { db } from "config/firebase";
import { useEffect, useState } from "react";

export default function FeaturedPost() {
  const [latestPost, setLatestPost] = useState(null);

  useEffect(() => {
    const getLatestPost = async () => {
      try {
        const postsCollectionRef = collection(db, "posts");
        const data = await getDocs(postsCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        // Sort the data by date in descending order
        filteredData.sort((a, b) => new Date(b.date) - new Date(a.date));
        // Set only the latest post
        setLatestPost(filteredData[0]);
      } catch (err) {
        console.log(err);
      }
    };

    getLatestPost();
  }, []);

  return (
    <article>
      {latestPost && (
        <div className="flex  -mx-4 lg:items-center items-start flex-wrap">
          <div className="px-4 lg:w-8/12 md:w-7/12 w-full">
            <Link href={`/post/${latestPost.id}`}>
              <img
                src={latestPost.images[0]} // Assuming the first image is the featured image
                className="rounded-xl w-full mb-4 md:mb-0"
              />
            </Link>
          </div>
          <div className="lg:w-4/12 md:w-5/12 w-full px-4">
            <InfoPost
              category="Latest Posted"
              date={latestPost.date}
              title={latestPost.title}
              shortDescription={latestPost.description}
              // Assuming you have author information in the post data
              authorAvatar={latestPost.authorAvatar}
              authorName={latestPost.authorName}
              authorJob={latestPost.authorJob}
            />
          </div>
        </div>
      )}
      <hr className="border-white/10 mt-10  md:hidden" />
    </article>
  );
}
