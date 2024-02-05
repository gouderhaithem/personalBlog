import PostsMetaTitle from "@components/PostsMetaTitle";
import PostsAuthor from "@components/PostsAuthor";
import moment from "moment/moment";

export default function InfoPost({
  category,
  date,
  title,
  description,
  authorAvatar,
  authorName,
  authorJob,
}) {
  return (
    <>
      <PostsMetaTitle
        category={category}
        title={title}
        date={moment(date).fromNow()}
      />
      <p
        className="text-white/60 mt-5 w-10/12"
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
        }}
      >
        {description}
      </p>

      {/* <PostsAuthor
        authorAvatar={authorAvatar}
        authorName={authorName}
        authorJob={authorJob}
      /> */}
    </>
  );
}
