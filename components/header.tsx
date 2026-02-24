"use client";
import Link from "next/link";
import { useState } from "react";
import { Search, Aperture, Loader2, Compass } from "lucide-react";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
}

export function Header({ onSearch, isLoading }: HeaderProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (query.trim()) onSearch(query);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 transition-all">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* LOGO: Ahora usa Link para volver al inicio suavemente */}
        <a
          href="/"
          className="flex items-center gap-2 cursor-pointer group select-none"
        >
          <div className="flex items-center justify-center rounded-md bg-accent/10 p-1.5 transition-colors group-hover:bg-accent/20">
            <Aperture className="h-5 w-5 text-accent" />
          </div>
          <span className="font-mono text-lg font-semibold tracking-tight text-foreground group-hover:text-accent transition-colors duration-300">
            LUMENS
          </span>
        </a>

        {/* LADO DERECHO: Botón Explorar + Buscador */}
        <div className="flex items-center gap-4 w-full max-w-md justify-end">
          {/* Botón Explorar */}
          <Link
            href="/explore"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-accent/10 text-muted-foreground hover:text-accent transition-colors group"
          >
            <Compass className="h-4 w-4 group-hover:rotate-45 transition-transform duration-300" />
            <span className="font-mono text-xs uppercase tracking-widest font-bold">
              Explorar
            </span>
          </Link>

          {/* Buscador */}
          <form onSubmit={handleSubmit} className="relative w-full max-w-xs">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin text-accent" />
              ) : (
                <Search className="h-4 w-4" />
              )}
            </div>

            <Input
              type="search"
              placeholder="Ej: ciudad lluviosa cyberpunk..."
              className="h-9 w-full bg-secondary/50 pl-9 text-sm placeholder:text-muted-foreground focus-visible:ring-accent transition-all focus:bg-background border-transparent focus:border-accent/50"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              disabled={isLoading}
            />
          </form>
        </div>
      </div>
    </header>
  );
}
