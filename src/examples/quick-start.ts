import { assertEquals } from "./assert.js";

import { real as R } from "../index.js";

assertEquals(R.add(1, 2), 3);

import { complex as C } from "../index.js";

assertEquals(C.add([1, 0], [2, 0]), [3, 0]);
