import { MapPin } from "react-feather";
import Card from "../Card";
import Link from "next/link";
import Image from "next/image";

interface Props {
  href: string;
  name: string;
  imageUrl: string;
  description: string;
  address: string;
}

const Item = ({ href, name, imageUrl, description, address }: Props) => {
  return (
    <Card className="group flex flex-col items-start justify-between gap-2">
      {imageUrl && (
        <div className="relative h-40 w-full overflow-hidden rounded-t-2xl">
          <Image
            src={imageUrl}
            alt={name + " " + "logo"}
            fill
            className="h-auto overflow-hidden object-cover"
          />
        </div>
      )}
      <div className="flex w-full flex-1 flex-col justify-between gap-4 px-4 py-2">
        <h3 className="text-xl font-semibold leading-6 text-slate-100 group-hover:underline">
          <Link href={href}>{name}</Link>
        </h3>
        <div className="flex w-fit items-center gap-1 rounded-full bg-neutral-800/70 p-2 text-xs text-gray-600 text-slate-300/70">
          <MapPin size={12} />
          <span>{address}</span>
        </div>
        <p className="line-clamp-3 px-3 capitalize text-slate-300/75">
          {description}
        </p>
      </div>
    </Card>
  );
};

export default Item;
