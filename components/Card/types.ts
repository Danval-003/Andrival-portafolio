import type { StaticImageData } from "next/image";

export interface ProjectCardProps {
  title: string;
  description: string;
  image?: StaticImageData | string;
  link: string;
}
