"use client";

import { useState } from "react";
import { Search, Aperture, Loader2 } from "lucide-react";
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
        <div
          className="flex items-center gap-2 cursor-pointer group select-none"
          onClick={() => window.location.reload()}
        >
          <div className="flex items-center justify-center rounded-md bg-accent/10 p-1.5 transition-colors group-hover:bg-accent/20">
            <Aperture className="h-5 w-5 text-accent" />
          </div>
          <span className="font-mono text-lg font-semibold tracking-tight text-foreground group-hover:text-accent transition-colors duration-300">
            LUMENS
          </span>
        </div>

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
            placeholder="Buscar destino (ej: Tokyo)..."
            className="h-9 w-full bg-secondary/50 pl-9 text-sm placeholder:text-muted-foreground focus-visible:ring-accent transition-all focus:bg-background border-transparent focus:border-accent/50"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={isLoading}
          />
        </form>
      </div>
    </header>
  );
}
