import React from 'react';

interface SearchHighlightProps {
  text: string;
  query: string;
}

export default function SearchHighlight({ text, query }: SearchHighlightProps) {
  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  const highlightedText = parts.map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <span key={index} className="font-bold">
        {part}
      </span>
    ) : (
      part
    ),
  );

  return highlightedText;
}
