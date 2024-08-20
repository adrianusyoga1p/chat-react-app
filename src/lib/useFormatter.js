import { clsx } from "clsx";
import moment from "moment";
import { twMerge } from "tailwind-merge";

export function useFormatter() {
  const formatPrice = (price = 0) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(parseFloat((price || "0").toString()) || 0);
  };

  const formatDate = (second) => {
    const secondsMatch = second.match(/seconds=(\d+)/);
    const seconds = secondsMatch ? parseInt(secondsMatch[1], 10) : null;
    const milliseconds = seconds * 1000;
    const date = new Date(milliseconds);
    return moment(date).format("HH:mm");
  };

  const formateTime = (date) => {
    const newDate  = new Date(date)
    return newDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  }

  const cn = (...inputs) => {
    return twMerge(clsx(inputs));
  };

  return { formatPrice, cn, formatDate, formateTime };
}