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
    <Card className="group flex flex-col items-start justify-between shadow-lg">
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
        <h3 className="text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600 group-hover:underline">
          <Link href={href}>{name}</Link>
        </h3>
        <div className="flex w-fit items-center gap-1 rounded-full bg-gray-50 px-2 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100">
          <MapPin size={16} />
          <span>{address}</span>
        </div>
        <p className="px-3 text-sm capitalize leading-6 text-gray-600 line-clamp-3">
          {description}
        </p>
      </div>
    </Card>
  );
};

export default Item;
