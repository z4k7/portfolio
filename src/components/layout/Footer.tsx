import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/common/Icons";
import { PERSONAL } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left">
          <div className="text-sm font-bold gradient-text-accent mb-1">
            {PERSONAL.name}
          </div>
          <div className="text-xs text-zinc-600">
            &copy; {new Date().getFullYear()} — Built with Next.js & Framer Motion
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={PERSONAL.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-600 hover:text-zinc-300 transition-colors"
          >
            <GithubIcon size={16} />
          </a>
          <a
            href={PERSONAL.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-600 hover:text-zinc-300 transition-colors"
          >
            <LinkedinIcon size={16} />
          </a>
          <a
            href={`mailto:${PERSONAL.email}`}
            className="text-zinc-600 hover:text-zinc-300 transition-colors"
          >
            <Mail size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
