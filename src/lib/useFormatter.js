import { clsx } from "clsx";
import Swal from "sweetalert2";
import { twMerge } from "tailwind-merge";

export function useFormatter() {
  const formatPrice = (price = 0) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(parseFloat((price || "0").toString()) || 0);
  };

  const cn = (...inputs) => {
    return twMerge(clsx(inputs));
  };

  return { formatPrice, cn };
}