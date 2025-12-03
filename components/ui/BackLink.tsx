import { cn } from "@/lib/utils";
import Link from "next/link";

interface BackLink {
  title: string;
  link: string;
  className?: string;
}

export default function BackLink({ title, link, className }: BackLink) {
  return (
    <Link
      href={link ?? "#"}
      className={cn(
        "text-indigo-400 hover:text-indigo-300",
        className
      )}
    >
      {title}
    </Link>
  );
}
