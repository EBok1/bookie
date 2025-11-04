import type { ReactNode } from "react";

type BookCardGridProps = {children: ReactNode}

function BookCardGrid({ children }: BookCardGridProps) {
  return (
    <div className="max-w-4xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {children}
      </div>
    </div>
  );
}

export default BookCardGrid;
