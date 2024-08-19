import { useFormatter } from "@/lib/useFormatter";
import { forwardRef } from "react";

const BaseInput = forwardRef(({ label, className, ...props }, ref) => {
  const { cn } = useFormatter();
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          className={`font-semibold text-gray-700 text-sm ${
            props.type === "file"
              ? "bg-white cursor-pointer border-dashed border border-black/15 rounded-md p-4 block text-center text-sm"
              : ""
          }`}
          htmlFor={props.type === "file" ? "uploadImg" : null}
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        {...props}
        className={cn(
          `bg-white rounded-md border border-gray-100 outline-none p-2.5 text-sm ${
            props.type === "file" ? "hidden" : ""
          }`,
          className
        )}
      />
    </div>
  );
});

export default BaseInput;

BaseInput.displayName = "BaseInput";
