// types/fdic.ts

/**
 * Represents an item within the EVENTS array of an institution.
 */
export interface FdicEvent {
    ACT_EVT_NUM?: number;
    ACT_EVT_DESC?: string;
    LOCN_PHY_CNTY_NUM?: number;
    LOCN_PHY_ST_NUM?: number;
    ORG_ACQ_CERT_NUM?: number;
    INST_FIN_ACTV_FLG?: string;
    ACTIVE?: string; // Consider mapping '0'/'1' to boolean if appropriate later
    ADDRESS?: string;
    BKCLASS?: 'N' | 'SM' | 'NM' | 'SB' | 'SA' | 'OI';
    CERT?: string;
    CFPBEFFDTE?: string; // format: date-time
    CFPBENDDTE?: string; // format: date-time
    CHARTER?: string;
    CHRTAGNT?: string;
    CITY?: string;
    CLCODE?: string; // Note: Description mentions CU, N, NC, NM, NS, OI, SB, SI, SL, SM - but YAML only shows string type
    CMSA_NO?: string;
    CMSA?: string;
    CONSERVE?: string; // '1' or '0'
    COUNTY?: string;
    DOCKET?: string;
    EFFDATE?: string; // format: date-time
    ENDEFYMD?: string; // format: date-time
    INSAGNT1?: string;
    INSAGNT2?: string;
    INSDATE?: string; // format: date-time
    LAW_SASSER_FLG?: string; // 'y' or 'n' potentially, mapped to '1'/'0'
    MSA?: string;
    MSA_NO?: string;
    NAME?: string;
    OCCDIST?: string;
    OTSDIST?: string;
    OTSREGNM?: string;
    PROCDATE?: string; // format: date-time
    REGAGNT?: string; // OCC, FDIC, FRB, NCUA, OTS
    REGAGENT2?: string; // CFPB, OTS
    STALP?: string;
    STNAME?: string;
    STNUM?: string;
    SUPRV_FD?: string; // 02, 05, 09, 11, 13, 14, 16
    ZIP_RAW?: string;
    ZIP?: string; // Potentially formatted zip code
    // Note: Added based on context, not explicitly in YAML EVENT properties section but seems intended
    CHANGE_ORDER?: number;
  }
  
  /**
   * Represents the main data properties of an FDIC institution.
   */
  export interface FdicInstitutionData {
    ACTIVE?: string; // '1' or '0'
    ADDRESS?: string;
    ASSET?: number;
    BKCLASS?: 'N' | 'SM' | 'NM' | 'SB' | 'SA' | 'OI';
    CB?: string; // Community Bank flag? Description implies boolean-like
    CBSA?: string;
    CBSA_DIV?: string;
    CBSA_DIV_FLG?: string; // '1' = Yes
    CBSA_DIV_NO?: string;
    CBSA_METRO?: string; // CBSA_NO or '0'
    CBSA_METRO_FLG?: string; // '1' = Yes
    CBSA_METRO_NAME?: string; // CBSA or '0'
    CBSA_MICRO_FLG?: string; // '1' = Yes
    CBSA_NO?: string;
    CERT?: string;
    CERTCONS?: string;
    CFPBEFFDTE?: string; // format: date-time
    CFPBENDDTE?: string; // format: date-time
    CFPBFLAG?: string; // '1' or '0'
    PRIORNAME1?: string;
    PRIORNAME2?: string;
    PRIORNAME3?: string;
    PRIORNAME4?: string;
    PRIORNAME5?: string;
    PRIORNAME6?: string;
    PRIORNAME7?: string;
    PRIORNAME8?: string;
    PRIORNAME9?: string;
    PRIORNAME10?: string;
    CHANGEC1?: string;
    CHANGEC2?: string;
    CHANGEC3?: string;
    CHANGEC4?: string;
    CHANGEC5?: string;
    CHANGEC6?: string;
    CHANGEC7?: string;
    CHANGEC8?: string;
    CHANGEC9?: string;
    CHANGEC10?: string;
    CHANGEC11?: string;
    CHANGEC12?: string;
    CHANGEC13?: string;
    CHANGEC14?: string;
    CHANGEC15?: string;
    CHARTER?: string;
    CHRTAGNT?: string; // State, OCC, OTS
    CITY?: string;
    CITYHCR?: string;
    CLCODE?: number; // Note: Description seems different from Event CLCODE
    CMSA_NO?: string;
    CMSA?: string;
    CONSERVE?: string; // '1' or '0'
    COUNTY?: string;
    CSA?: string;
    CSA_NO?: string;
    CSA_FLG?: string; // '1' or '0'
    DATEUPDT?: string; // MM/dd/yyyy format from script
    DENOVO?: string; // '1' = Yes
    DEP?: number;
    DEPDOM?: number;
    DOCKET?: string;
    EFFDATE?: string; // MM/dd/yyyy format from script
    ENDEFYMD?: string; // MM/dd/yyyy format from script
    EQ?: string; // Should likely be number based on description
    ESTYMD?: string; // MM/dd/yyyy format from script
    FDICDBS?: string;
    FDICREGN?: string;
    FDICSUPV?: string;
    FED?: string; // 01-12
    FED_RSSD?: string;
    FEDCHRTR?: string; // '1' or '0'
    FLDOFF?: string;
    FORM31?: string; // '1' or '0'
    HCTMULT?: string; // '1' or '0'
    IBA?: string; // '1' or '0'
    INACTIVE?: string; // '1' or '0'
    INSAGNT1?: string; // BIF, SAIF, DIF, NONE
    INSAGNT2?: string;
    INSBIF?: string; // '1' or '0'
    INSCOML?: string; // '1' or '0'
    INSDATE?: string; // MM/dd/yyyy format from script
    INSDROPDATE_RAW?: string; // Raw date string potentially yyyyMMdd
    INSDROPDATE?: string; // MM/dd/yyyy format from script
    INSDIF?: string; // '1' or '0'
    INSFDIC?: number; // Always 1 based on script
    INSSAIF?: string; // Always 0 based on script
    INSSAVE?: string; // Always 0 based on script
    INSTAG?: string;
    INSTCRCD?: string; // '1' or '0' (set to 0 in script?)
    LATITUDE?: number;
    LAW_SASSER_FLG?: string; // 'y' or 'n'
    LONGITUDE?: number;
    MDI_STATUS_CODE?: string;
    MDI_STATUS_DESC?: string;
    MSA?: string;
    MSA_NO?: string;
    MUTUAL?: string;
    NAME?: string;
    NAMEHCR?: string;
    NETINC?: number;
    NETINCQ?: number;
    NEWCERT?: string; // Cert number or '0'
    OAKAR?: string; // '1' or '0'
    OCCDIST?: string;
    OFFDOM?: number;
    OFFFOR?: number;
    OFFICES?: number; // Source unclear, marked 'test'
    OFFOA?: number;
    OTSDIST?: string;
    OTSREGNM?: string;
    PARCERT?: string;
    PROCDATE?: string; // MM/dd/yyyy format from script
    QBPRCOML?: string;
    REGAGNT?: string; // OCC, FDIC, FRB, NCUA, OTS
    REGAGENT2?: string; // CFPB, OTS
    REPDTE?: string; // MM/dd/yyyy format from script
    RISDATE?: string; // MM/dd/yyyy format from script
    ROA?: number;
    ROAPTX?: number;
    ROAPTXQ?: number;
    ROAQ?: number;
    ROE?: number;
    ROEQ?: number;
    RSSDHCR?: string;
    RUNDATE?: string; // MM/dd/yyyy format from script
    SASSER?: string; // '1' or '0'
    SPECGRP?: number;
    SPECGRPN?: string; // Derived name based on SPECGRP
    STALP?: string;
    STALPHCR?: string;
    STCHRTR?: string; // '1' or '0'
    STCNTY?: string; // 5 digit state/county FIPS
    STNAME?: string;
    STNUM?: string; // State FIPS code
    SUBCHAPS?: string;
    SUPRV_FD?: string; // 02, 05, 09, 11, 13, 14, 16
    TE01N528?: string; // URL
    TE02N528?: string; // URL
    TE03N528?: string; // URL
    TE04N528?: string; // URL
    TE05N528?: string; // URL
    TE06N528?: string; // URL
    TE07N528?: string; // URL
    TE08N528?: string; // URL
    TE09N528?: string; // URL
    TE10N528?: string; // URL
    TE01N529?: string; // Trade Name
    TE02N529?: string; // Trade Name
    TE03N529?: string; // Trade Name
    TE04N529?: string; // Trade Name
    TE05N529?: string; // Trade Name
    TE06N529?: string; // Trade Name
    TRACT?: string;
    TRUST?: string; // Trust power code
    ULTCERT?: string; // Cert number
    UNINUM?: string;
    WEBADDR?: string; // URL
    ZIP?: string; // Formatted 5-digit zip
    ZIP_RAW?: string; // Raw zip from source
    // Note: Added based on script dependencies, might not be final output fields
    ORG_EFF_NUM_DTE?: string; // yyyyMMdd used for EFFDATE
    ORG_END_NUM_DTE?: string; // yyyyMMdd used for ENDEFYMD
    REPDTE_RAW?: string; // Date string used for REPDTE/RISDATE
    PARSED_EVENTS?: FdicEvent[]; // Internal processing field from script?
  }
  
  /**
   * Represents the overall structure of an FDIC institution record.
   */
  export interface FdicInstitution {
    data?: FdicInstitutionData;
    EVENTS?: FdicEvent[];
  }
  