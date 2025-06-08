import * as React from "react";

export function Progress({ value, className }) {
  return (
    <div className={`relative h-3 w-full overflow-hidden rounded-full bg-gray-200 ${className}`}>
      <div
        className="h-full bg-blue-500 transition-all duration-300"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
