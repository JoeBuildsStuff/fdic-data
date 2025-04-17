import { z } from "zod";

// Import the Database type
import type { Database } from "@/lib/database.types";

// Define the Row type alias for brevity
type InstitutionRow = Database['fdic_data']['Tables']['fdic_data_institutions']['Row'];

// Keep the Zod schema for runtime validation if needed.
// Ensure this manually stays in sync with the actual DB schema / InstitutionRow type.
export const institutionSchema = z.object({
  id: z.number().int(), // Mapped from bigint
  active: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  asset: z.number().optional().nullable(), // Mapped from numeric
  bkclass: z.string().optional().nullable(),
  cb: z.string().optional().nullable(),
  cbsa: z.string().optional().nullable(),
  cbsa_div: z.string().optional().nullable(),
  cbsa_div_flg: z.string().optional().nullable(),
  cbsa_div_no: z.string().optional().nullable(),
  cbsa_metro: z.string().optional().nullable(),
  cbsa_metro_flg: z.string().optional().nullable(),
  cbsa_metro_name: z.string().optional().nullable(),
  cbsa_micro_flg: z.string().optional().nullable(),
  cbsa_no: z.string().optional().nullable(),
  cert: z.string().optional().nullable(),
  certcons: z.string().optional().nullable(),
  cfpbeffdte: z.string().datetime({ offset: true }).optional().nullable(), // Mapped from timestamptz
  cfpbenddte: z.string().datetime({ offset: true }).optional().nullable(), // Mapped from timestamptz
  cfpbflag: z.string().optional().nullable(),
  priorname1: z.string().optional().nullable(),
  priorname2: z.string().optional().nullable(),
  priorname3: z.string().optional().nullable(),
  priorname4: z.string().optional().nullable(),
  priorname5: z.string().optional().nullable(),
  priorname6: z.string().optional().nullable(),
  priorname7: z.string().optional().nullable(),
  priorname8: z.string().optional().nullable(),
  priorname9: z.string().optional().nullable(),
  priorname10: z.string().optional().nullable(),
  changec1: z.string().optional().nullable(),
  changec2: z.string().optional().nullable(),
  changec3: z.string().optional().nullable(),
  changec4: z.string().optional().nullable(),
  changec5: z.string().optional().nullable(),
  changec6: z.string().optional().nullable(),
  changec7: z.string().optional().nullable(),
  changec8: z.string().optional().nullable(),
  changec9: z.string().optional().nullable(),
  changec10: z.string().optional().nullable(),
  changec11: z.string().optional().nullable(),
  changec12: z.string().optional().nullable(),
  changec13: z.string().optional().nullable(),
  changec14: z.string().optional().nullable(),
  changec15: z.string().optional().nullable(),
  charter: z.string().optional().nullable(),
  chrtagnt: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  cityhcr: z.string().optional().nullable(),
  clcode: z.number().optional().nullable(), // Mapped from numeric
  cmsa_no: z.string().optional().nullable(),
  cmsa: z.string().optional().nullable(),
  conserve: z.string().optional().nullable(),
  county: z.string().optional().nullable(),
  csa: z.string().optional().nullable(),
  csa_no: z.string().optional().nullable(),
  csa_flg: z.string().optional().nullable(),
  dateupdt: z.string().datetime({ offset: true }).optional().nullable(), // Mapped from timestamptz
  denovo: z.string().optional().nullable(),
  dep: z.number().optional().nullable(), // Mapped from numeric
  depdom: z.number().optional().nullable(), // Mapped from numeric
  docket: z.string().optional().nullable(),
  effdate: z.string().datetime({ offset: true }).optional().nullable(), // Mapped from timestamptz
  endefymd: z.string().datetime({ offset: true }).optional().nullable(), // Mapped from timestamptz
  eq: z.string().optional().nullable(),
  estymd: z.string().datetime({ offset: true }).optional().nullable(), // Mapped from timestamptz
  fdicdbs: z.string().optional().nullable(),
  fdicregn: z.string().optional().nullable(),
  fdicsupv: z.string().optional().nullable(),
  fed: z.string().optional().nullable(),
  fed_rssd: z.string().optional().nullable(),
  fedchrtr: z.string().optional().nullable(),
  fldoff: z.string().optional().nullable(),
  form31: z.string().optional().nullable(),
  hctmult: z.string().optional().nullable(),
  iba: z.string().optional().nullable(),
  inactive: z.string().optional().nullable(),
  insagnt1: z.string().optional().nullable(),
  insagnt2: z.string().optional().nullable(),
  insbif: z.string().optional().nullable(),
  inscoml: z.string().optional().nullable(),
  insdate: z.string().datetime({ offset: true }).optional().nullable(), // Mapped from timestamptz
  insdropdate_raw: z.string().optional().nullable(),
  insdropdate: z.string().datetime({ offset: true }).optional().nullable(), // Mapped from timestamptz
  insdif: z.string().optional().nullable(),
  insfdic: z.number().optional().nullable(), // Mapped from numeric
  inssaif: z.string().optional().nullable(),
  inssave: z.string().optional().nullable(),
  instag: z.string().optional().nullable(),
  instcrcd: z.string().optional().nullable(),
  latitude: z.number().optional().nullable(), // Mapped from numeric
  law_sasser_flg: z.string().optional().nullable(),
  longitude: z.number().optional().nullable(), // Mapped from numeric
  mdi_status_code: z.string().optional().nullable(),
  mdi_status_desc: z.string().optional().nullable(),
  msa: z.string().optional().nullable(),
  msa_no: z.string().optional().nullable(),
  mutual: z.string().optional().nullable(),
  name: z.string(), // Assumed required
  namehcr: z.string().optional().nullable(),
  netinc: z.number().optional().nullable(), // Mapped from numeric
  netincq: z.number().optional().nullable(), // Mapped from numeric
  newcert: z.string().optional().nullable(),
  oakar: z.string().optional().nullable(),
  occdist: z.string().optional().nullable(),
  offdom: z.number().optional().nullable(), // Mapped from numeric
  offfor: z.number().optional().nullable(), // Mapped from numeric
  offices: z.number().optional().nullable(), // Mapped from numeric
  offoa: z.number().optional().nullable(), // Mapped from numeric
  otsdist: z.string().optional().nullable(),
  otsregnm: z.string().optional().nullable(),
  parcert: z.string().optional().nullable(),
  procdate: z.string().datetime({ offset: true }).optional().nullable(), // Mapped from timestamptz
  qbprcoml: z.string().optional().nullable(),
  regagnt: z.string().optional().nullable(),
  regagent2: z.string().optional().nullable(),
  repdte: z.string().datetime({ offset: true }).optional().nullable(), // Mapped from timestamptz
  risdate: z.string().datetime({ offset: true }).optional().nullable(), // Mapped from timestamptz
  roa: z.number().optional().nullable(), // Mapped from numeric
  roaptx: z.number().optional().nullable(), // Mapped from numeric
  roaptxq: z.number().optional().nullable(), // Mapped from numeric
  roaq: z.number().optional().nullable(), // Mapped from numeric
  roe: z.number().optional().nullable(), // Mapped from numeric
  roeq: z.number().optional().nullable(), // Mapped from numeric
  rssdhcr: z.string().optional().nullable(),
  rundate: z.string().datetime({ offset: true }).optional().nullable(), // Mapped from timestamptz
  sasser: z.string().optional().nullable(),
  specgrp: z.number().optional().nullable(), // Mapped from numeric
  specgrpn: z.string().optional().nullable(),
  stalp: z.string().optional().nullable(),
  stalphcr: z.string().optional().nullable(),
  stchrtr: z.string().optional().nullable(),
  stcnty: z.string().optional().nullable(),
  stname: z.string().optional().nullable(),
  stnum: z.string().optional().nullable(),
  subchaps: z.string().optional().nullable(),
  suprv_fd: z.string().optional().nullable(),
  te01n528: z.string().optional().nullable(),
  te02n528: z.string().optional().nullable(),
  te03n528: z.string().optional().nullable(),
  te04n528: z.string().optional().nullable(),
  te05n528: z.string().optional().nullable(),
  te06n528: z.string().optional().nullable(),
  te07n528: z.string().optional().nullable(),
  te08n528: z.string().optional().nullable(),
  te09n528: z.string().optional().nullable(),
  te10n528: z.string().optional().nullable(),
  te01n529: z.string().optional().nullable(),
  te02n529: z.string().optional().nullable(),
  te03n529: z.string().optional().nullable(),
  te04n529: z.string().optional().nullable(),
  te05n529: z.string().optional().nullable(),
  te06n529: z.string().optional().nullable(),
  tract: z.string().optional().nullable(),
  trust: z.string().optional().nullable(),
  ultcert: z.string().optional().nullable(),
  uninum: z.string().optional().nullable(),
  webaddr: z.string().url().optional().nullable(), // Added URL validation
  zip: z.string().optional().nullable(),
  // Ensure this matches the fields defined in InstitutionRow
});

// Derive the Institution type directly from the database types
export type Institution = InstitutionRow;