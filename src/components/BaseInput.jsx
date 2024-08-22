import { useFormatter } from "@/lib/useFormatter";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { forwardRef, useState } from "react";

const BaseInput = forwardRef(({ label, className, ...props }, ref) => {
  const { cn } = useFormatter();
  const [show, setShow] = useState(false);
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
      <div className="relative">
        <input
          ref={ref}
          {...props}
          type={props.type === "password" && show ? "text" : props.type}
          className={cn(
            `bg-white rounded-md border w-full border-gray-100 outline-none p-2.5 text-sm ${
              props.type === "file" ? "hidden" : ""
            }`,
            className
          )}
        />
        {props.type === "password" && (
          <div
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
            onClick={() => setShow((prev) => !prev)}
          >
            <FontAwesomeIcon icon={show ? faEyeSlash : faEye} size="sm" />
          </div>
        )}
      </div>
    </div>
  );
});

export default BaseInput;

BaseInput.displayName = "BaseInput";
