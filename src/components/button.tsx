import type { ButtonHTMLAttributes } from "react";

export default function Button({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
}) {
  return <button {...props} className={`mt-auto cursor-pointer rounded-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ${props.className}`}>
    {children}
  </button>;
}
