import Image, { type ImageProps } from "next/image";
import blur from "@/data/blur.json";

const map = blur as Record<string, string>;

/** Une photo qui ne laisse jamais de case vide : un aperçu flou s'affiche tout de suite, puis l'image nette arrive. */
export function Photo(props: ImageProps) {
  const data = typeof props.src === "string" ? map[props.src] : undefined;
  return <Image {...props} {...(data ? { placeholder: "blur" as const, blurDataURL: data } : {})} />;
}
