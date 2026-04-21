import { Sun, Wind, Zap, Cpu, HardHat, LineChart, Leaf, Battery, Globe2, ShieldCheck, Award, type LucideIcon } from "lucide-react";

const MAP: Record<string, LucideIcon> = {
  Sun, Wind, Zap, Cpu, HardHat, LineChart, Leaf, Battery, Globe2, ShieldCheck, Award,
};

export function getIcon(name: string): LucideIcon {
  return MAP[name] ?? Sun;
}

export const ICON_OPTIONS = Object.keys(MAP);
