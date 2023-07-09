import Image from "next/image";

interface Props {
  name: string;
}
const Avatar = ({ name }: Props) => {
  return (
    <div className="relative aspect-square h-10 w-10 overflow-hidden">
      <Image
        src={`https://source.boringavatars.com/beam/120/${name}?colors=264653,2a9d8f,e9c46a,f4a261,e76f51`}
        alt="avatar"
        fill
        className="object-cover"
      />
    </div>
  );
};

export default Avatar;
