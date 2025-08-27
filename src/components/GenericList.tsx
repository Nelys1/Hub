import React, { useState } from "react";

type GenericListProps<T> = {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor?: (item: T, index: number) => string;
  title?: string;
  emptyMessage?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  searchFilter?: (item: T, searchTerm: string) => boolean;
};

export default function GenericList<T>({
  items,
  renderItem,
  keyExtractor,
  title = "List Items",
  emptyMessage = "No items to display",
  searchable = false,
  searchPlaceholder = "Search items...",
  searchFilter
}: GenericListProps<T>): JSX.Element {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = searchable && searchTerm
    ? items.filter(item => {
        if (searchFilter) {
          return searchFilter(item, searchTerm);
        }
        // Default search: convert item to string and search
        return String(item).toLowerCase().includes(searchTerm.toLowerCase());
      })
    : items;

  return (
    <div className="bg-gradient-glass backdrop-blur-xl border border-border rounded-2xl p-8 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          {title}
        </h2>
        <div className="text-sm text-muted-foreground">
          {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
        </div>
      </div>

      {searchable && (
        <div className="mb-6">
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-300"
          />
        </div>
      )}

      {filteredItems.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl text-muted-foreground">📋</span>
          </div>
          <p className="text-muted-foreground text-lg">{emptyMessage}</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {filteredItems.map((item, index) => (
            <div
              key={keyExtractor ? keyExtractor(item, index) : index.toString()}
              className="group bg-background/50 border border-border rounded-xl p-4 hover:border-primary/30 hover:shadow-button transition-all duration-300"
            >
              {renderItem(item, index)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
