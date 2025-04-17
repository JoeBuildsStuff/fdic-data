import { type Institution } from "./schema";
import {
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsInteger,
  parseAsStringEnum,
} from "nuqs/server";
import * as z from "zod";

import { getFiltersStateParser, getSortingStateParser } from "@/lib/parsers";

export const searchParamsCache = createSearchParamsCache({
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(10),
  sort: getSortingStateParser<Institution>().withDefault([
    { id: "name", desc: true },
  ]),
  filters: getFiltersStateParser().withDefault([]),
  joinOperator: parseAsStringEnum(["and", "or"]).withDefault("and"),
  // define columns to retrieve from the database
  columns: parseAsArrayOf(z.string()).withDefault([
    "cert", // FDIC Certificate #
    "estymd", // Established Date
    "name", // Institution name
    "stalp", // State Alpha code
    // 'webaddr',   // Primary Internet Web Address
    "dep", // Total deposits
  ]),
});

export type GetInstitutionsSchema = Awaited<
  ReturnType<typeof searchParamsCache.parse>
>;
