import InfoPost from "@components/InfoPost";
import Link from "next/link";

export default function CardPost({ id, images, ...infoPost }) {
  // Check if images array exists and has length greater than 0
  const thumbnail = images && images.length > 0 ? images[0] : null;

  return (
    <article>
      <Link href={`/post/${id}`}>
        {/* Check if thumbnail exists before rendering */}
        {thumbnail && <img src={thumbnail} className="x-full rounded" />}
      </Link>
      <InfoPost {...infoPost} />
    </article>
  );
}
