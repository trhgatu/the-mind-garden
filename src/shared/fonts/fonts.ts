import { Quintessential, Inter, Lora, Playfair_Display, Mea_Culpa, Lato } from "next/font/google";

export const quintessential = Quintessential({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const meaCulpa = Mea_Culpa({
  weight: ["400"],
  subsets: ["latin", "latin-ext", "vietnamese"]
})

export const playfairDisPlay = Playfair_Display({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap"
})
export const lato = Lato({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "100", "300", "700", "900"],
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
