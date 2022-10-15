import { cayleyDickson } from "./cayleyDickson.js";
import { real } from "./real.js";

export const octonion = cayleyDickson<number>(real, 8);
