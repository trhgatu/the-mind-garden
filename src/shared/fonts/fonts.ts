import { Quintessential, Inter, Lora } from "next/font/google";

export const quintessential = Quintessential({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});


export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const lora = Lora({
  subsets: ["latin"],
  display: "swap",
});
