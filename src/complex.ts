import { cayleyDickson } from "./cayleyDickson.js";
import { real } from "./real.js";

export const complex = cayleyDickson<number>(real, 2);
