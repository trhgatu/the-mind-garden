import { Quintessential, Inter, Lora, Playfair_Display } from "next/font/google";

export const quintessential = Quintessential({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const playfairDisPlay = Playfair_Display({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap"
})

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const lora = Lora({
  subsets: ["latin"],
  display: "swap",
});
