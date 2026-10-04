
import { Institution, Field, ReportPeriod, ReportedValue } from "./types";

export async function getInstitutions(): Promise<Institution[]> {
    return [
    {
        id: 130445,
        name: 'JPMorgan Chase Bank, National Association',
        cert: '628',
        dep: 2516998000
    },
    {
      id: 132265,
      name: 'Bank of America, National Association',
      cert: '3510',
      dep: 2055465000
    },
    {
      id: 132266,
      name: 'Wells Fargo Bank, National Association',
      cert: '3511',
      dep: 1435051000
    },
    {
      id: 134785,
      name: 'Citibank, National Association',
      cert: '7213',
      dep: 1324835000
    },
    {
      id: 134409,
      name: 'U.S. Bank National Association',
      cert: '6548',
      dep: 528517873
    },
    {
      id: 134313,
      name: 'PNC Bank, National Association',
      cert: '6384',
      dep: 433565511
    },
    { id: 136326, name: 'Truist Bank', cert: '9846', dep: 402078000 },
    {
      id: 154489,
      name: 'Goldman Sachs Bank USA',
      cert: '33124',
      dep: 389733000
    },
    {
      id: 132845,
      name: 'Capital One, National Association',
      cert: '4297',
      dep: 385442165
    },
    {
      id: 155143,
      name: 'Wachovia Bank, National Association',
      cert: '33869',
      dep: 355574000
    }
  ]
}

export async function getReportPeriods(): Promise<ReportPeriod[]> {
  return [
    {
      report_period_id: 3,
      report_date: '2024-12-31',
      created_at: '2025-04-21T04:18:37.111128+00:00'
    },
    {
      report_period_id: 4,
      report_date: '2023-12-31',
      created_at: '2025-04-23T03:56:11.154936+00:00'
    }
  ]
}

export async function getFields(): Promise<Field[]> {
  return [
    {
      field_id: 112,
      field_name: 'NAMEHCR',
    title: 'Bank Holding Company (Regulatory Top Holder)',
    description: "Regulatory top holder is assigned by the Federal Reserve Board based on ownership and control percentages. Note: Information on bank holding companies is only as of quarter-end. Regulatory top holder is any company that directly or indirectly owns, controls or has power to vote 25 percent or more of a bank's or direct holding company's shares or  controls in any manner the election of a majority of the directors or trustees of a bank or direct holding company or  exercises a controlling influence over the management or policies of a bank or direct holding company.   Information on Thrift Holding Companies that own Savings Associations but do not own banks is not currently available in the ID System.  Source: Federal Reserve Board National Information Center data base.",
    title_alt: 'Name of Bank Holding Company (Regulatory Top Holder)',
    description_alt: "Regulatory top holder is assigned by the Federal Reserve Board based on ownership and control percentages. Note: Information on bank holding companies is only as of quarter-end. Regulatory top holder is any company that directly or indirectly owns, controls or has power to vote 25 percent or more of a bank's or direct holding company's shares or controls in any manner the election of a majority of the directors or trustees of a bank or direct holding company or exercises a controlling influence over the management or policies of a bank or direct holding company. Information on Thrift Holding Companies that own Savings Associations but do not own banks is not currently available in the ID System. Source: Federal Reserve Board National Information Center data base.\n" +
      ' \n' +
      " Note: Information on bank holding companies is only as of quarter-end. Regulatory top holder is any company that directly or indirectly owns, controls or has power to vote 25 percent or more of a bank's or direct holding company's shares or controls in any manner the election of a majority of the directors or trustees of a bank or direct holding company or exercises a controlling influence over the management or policies of a bank or direct holding company. Information on Thrift Holding Companies that own Savings Associations but do not own banks is not currently available in the ID System. Source: Federal Reserve Board National Information Center data base."
  },
   {
    field_id: 75,
    field_name: 'CERT',
    title: 'FDIC Certificate #',
    description: 'A unique NUMBER assigned by the FDIC used to identify institutions and for the issuance of insurance certificates.',
    title_alt: 'FDIC Certificate #',
    description_alt: 'A unique number assigned by the FDIC used to identify institutions and for the issuance of insurance certificates.'
  },
   {
    field_id: 1891,
    field_name: 'RSSDID',
    title: 'FEDERAL RESERVE ID NUMBER',
    description: '',
    title_alt: 'Federal Reserve ID Number',
    description_alt: "A unique number assigned by the Federal Reserve Board as the entity's unique identifier (RSSDID) for the Regulatory top holder. note: information on bank holding companies is only as of quarter-end. Regulatory top holder is any company that directly or indirectly owns, controls or has power to vote 25 percent or more of a bank's or direct holding company's shares or controls in any manner the election of a majority of the directors or trustees of a bank or direct holding company or exercises a controlling influence over the management or policies of a bank or direct holding company. Information on Thrift Holding Companies that own Savings Associations but do not own banks is not currently available in the ID System. Source: Federal Reserve Board National Information Center data base."
  },
  {
    field_id: 1337,
    field_name: 'NAME',
    title: 'INSTITUTION NAME',
    description: '',
    title_alt: 'Institution name',
    description_alt: 'The legal title or name of the institution.\n' +
      ' \n' +
      ' Note: If you are having trouble finding an FDIC-Insured Institution: Type only part of the name. By typing a part of the name -- for example, type NET instead of NET.B@NK -- you can list all institutions that have net anywhere in their name. Then, you can look at the list and select the bank or thrift you are seeking.'
  },
  {
    field_id: 652,
    field_name: 'CITY',
    title: 'CITY',
    description: '',
    title_alt: 'City',
    description_alt: "City in which an institution's headquarters or one of its branches is physically located. Either the entire name or part of the name of a specific city may be entered to produce an Institution List."
  },
  {
    field_id: 559,
    field_name: 'STALP',
    title: 'FIPS STATE ALPHA CODE',
    description: '',
    title_alt: 'State Code',
    description_alt: "The state abbreviation of the location of the institution's main office."
  },
  {
    field_id: 2247,
    field_name: 'ZIP',
    title: 'ZIP CODE',
    description: '',
    title_alt: 'Zip Code',
    description_alt: "The ZIP code associated with the physical address of the institution's headquarters."
  },
  {
    field_id: 118,
    field_name: 'OFFDOM',
    title: 'Number of Domestic Offices',
    description: 'The number of domestic offices (including headquarters) operated by active institutions in the 50 states of the U.S.A.',
    title_alt: 'Number of Domestic Offices',
    description_alt: 'The number of domestic offices (including headquarters) operated by active institutions in the 50 states of the U.S.A.'
  },
  {
    field_id: 119,
    field_name: 'OFFFOR',
    title: 'Number of Foreign Offices',
    description: 'The number of foreign offices (outside the U.S.) operated by the institution.',
    title_alt: 'Number of Foreign Offices',
    description_alt: 'The number of foreign offices (outside the U.S. and U.S.territories) operated by active FDIC Insured institutions.'
  },
  {
    field_id: 56,
    field_name: 'STMULT',
    title: 'Multi State Offices Flag',
    description: 'Multi State Offices Flag',
    title_alt: 'Interstate Branches',
    description_alt: "A 'yes' indicates that an institution has branches that can accept FDIC-Insured deposits in more than one state. this item is not available (na) for TFR Reporters. The FDIC Act defines state as any State of the United States, the District of Columbia, and any territory of the United States, Puerto Rico, Guam, American Samoa, the Trust Territory of the Pacific Islands, the Virgin Island, and the Northern Mariana Islands."
  },
  {
    field_id: 120,
    field_name: 'OFFOA',
    title: 'Number of US Offices',
    description: 'The number of offices operated by an FDIC-Insured institution in all commonwealths and terrirtories of the US, along with those in freely associated states under the Compact of Free Association',
    title_alt: 'Number of Offices in Insured Other Areas',
    description_alt: 'The number of offices operated by an FDIC-Insured institution in all commonwealths and territories of the U.S.A., along with those in freely associated states under the Compact of Free Association. the list includes American Samoa, Guam, northern Mariana islands (cnmi), u.s. virgin islands, Puerto rico, republic of the Marshall islands (rmi), federal states of Micronesia (fsm), and the republic of Palau (ROP).'
  },
  {
    field_id: 135,
    field_name: 'SPECGRPDESC',
    title: 'Asset Concentration Hierarchy Description',
    description: "An indicator of an institution's primary specialization in terms of asset concentration Description",
    title_alt: '',
    description_alt: ''
  },
  {
    field_id: 137,
    field_name: 'SUBCHAPS',
    title: 'Subchapter S Corporations',
    description: "The Small Business Job Protection Act of 1996 changed the Internal Revenue Code to allow financial institutions to elect Subchapter S corporation status, beginning in 1997. Banks are required to indicate on the Call Report whether there is currently in effect an election to file under Subchapter S. Thrifts have a similar requirement as of March 1998.  The most important IRS requirements to elect and maintain Subchapter S status are: There can be no more than 75 eligible shareholders and no more than one class of stock. (In general, shareholders can only be individuals, estates, and certain types of trusts. Certain retirement plans and charitable organizations will be eligible in 1998.) All shareholders must consent.  Banks and thrifts converting to Subchapter S status must use the specific charge-off method for tax purposes rather than the reserve method of accounting for bad debts and recapture tax bad debt reserves over a period of six years, if the reserve method had been used prior to conversion. (Note: even though the specific charge-off method is required for tax purposes, an adequate allowance for loan and lease losses must still be maintained on the financial statements and Call Reports.) Banks and thrifts are subject to a built-in gains (BIG) tax, if the aggregate fair market value of assets is greater than their aggregate adjusted bases on the date of conversion to Subchapter S status.     [Banks are required to indicate separately on the Call Report in December of each year, the deferred portion of income taxes reported in net income. For Subchapter S banks, some or all of their deferred tax assets and liabilities may be eliminated upon conversion to Subchapter S status; however, deferred taxes related to the BIG tax and the recapture of bad debt reserves must be recognized.].   A Subchapter S corporation is treated as a pass-through entity, similar to a partnership, for federal income tax purposes. It is generally not subject to any federal income taxes at the corporate level. Its taxable income flows through to its shareholders in proportion to their stock ownership, and the shareholders generally pay federal income taxes on their share of this taxable income. This can have the effect of reducing institutions' reported income tax expense and increasing their after-tax earnings..   The election of Subchapter S status may result in an increase in shareholders' personal tax liabilities. Therefore, S corporations typically increase the amount of earnings distributed as dividends to compensate for higher personal taxes.",
    title_alt: 'Subchapter S Corporations',
    description_alt: "The Small Business Job Protection Act of 1996 changed the Internal Revenue Code to allow financial institutions to elect Subchapter S corporation status, beginning in 1997. Banks are required to indicate on the Call Report whether there is currently in effect an election to file under Subchapter S. Thrifts have a similar requirement as of March 1998. The most important IRS requirements to elect and maintain Subchapter S status are: There can be no more than 75 eligible shareholders and no more than one class of stock. (In general, shareholders can only be individuals, estates, and certain types of trusts. Certain retirement plans and charitable organizations will be eligible in 1998.) All shareholders must consent. Banks and thrifts converting to Subchapter S status must use the specific charge-off method for tax purposes rather than the reserve method of accounting for bad debts and recapture tax bad debt reserves over a period of six years, if the reserve method had been used prior to conversion. (Note: even though the specific charge-off method is required for tax purposes, an adequate allowance for loan and lease losses must still be maintained on the financial statements and Call Reports.) Banks and thrifts are subject to a built-in gains (BIG) tax, if the aggregate fair market value of assets is greater than their aggregate adjusted bases on the date of conversion to Subchapter S status. [Banks are required to indicate separately on the Call Report in December of each year, the deferred portion of income taxes reported in net income. For Subchapter S banks, some or all of their deferred tax assets and liabilities may be eliminated upon conversion to Subchapter S status; however, deferred taxes related to the BIG tax and the recapture of bad debt reserves must be recognized.]. A Subchapter S corporation is treated as a pass-through entity, similar to a partnership, for federal income tax purposes. It is generally not subject to any federal income taxes at the corporate level. Its taxable income flows through to its shareholders in proportion to their stock ownership, and the shareholders generally pay federal income taxes on their share of this taxable income. This can have the effect of reducing institutions' reported income tax expense and increasing their after-tax earnings.. The election of Subchapter S status may result in an increase in shareholders' personal tax liabilities. Therefore, S corporations typically increase the amount of earnings distributed as dividends to compensate for higher personal taxes."
    },
   {
    field_id: 2335,
    field_name: 'STCNTY',
    title: 'State and County Nunber',
    description: '',
    title_alt: 'State and County Number',
    description_alt: 'A five digit number representing the state and county in which the institution is physically located. The first two digits represent the FIPS state numeric code and the last three digits represent the FIPS county numeric code.'
  } , {
    field_id: 2336,
    field_name: 'CBSA',
    title: 'Metropolitan Statistical Area',
    description: '',
    title_alt: 'Core Based Statistical Area Name',
    description_alt: 'The name associated with the numeric code that the U.S. Census Bureau Office of Management and Budget assigns for the CBSA. The 2000 standards provide that each CBSA must contain at least one urban area of 10,000 or more population. Metropolitan and Micropolitan statistical areas are two categories of core based statistical areas. If an institution is not defined as a CBSA, the value of the field will be zero. For more information see: http: //www.census.gov/population/www/estimates/metroarea.html'
  }, {
    field_id: 958,
    field_name: 'ESTYMD',
    title: 'ESTABLISHED DATE',
    description: '',
    title_alt: 'Established Date',
    description_alt: 'The date on which the institution or branch began operations.'
  },{
    field_id: 2337,
    field_name: 'INSDATE',
    title: 'Date of Deposit Insurance',
    description: '',
    title_alt: '',
    description_alt: ''
  }, {
    field_id: 906,
    field_name: 'EFFDATE',
    title: 'EFFECTIVE DATE',
    description: '',
    title_alt: 'Last Structure Change Effective Date',
    description_alt: "A date indicating when an institution's change/event is effective."
  }, {
    field_id: 111,
    field_name: 'MUTUAL',
    title: 'Ownership Type',
    description: 'Banking institutions fall into one of two ownership types, stock or non-stock. An institution which sells stock to raise capital is called a stock institution. It is owned by the shareholders who benefit from profits earned by the institution. A non-stock institution, or mutual institution, is owned and controlled solely by its depositors. A mutual does not issue capital stock.',
    title_alt: 'Ownership Type',
    description_alt: 'Banking institutions fall into one of two ownership types, stock or non-stock. A non-stock institution, or mutual institution, is owned and controlled solely by its depositors. A mutual does not issue capital stock. (1=Yes, a mutual) An institution which sells stock to raise capital is called a stock institution. It is owned by the shareholders who benefit from profits earned by the institution. (0=No, not a mutual.)'
  }, {
        field_id: 121,
    field_name: 'PARCERT',
    title: 'Directly owned by another bank (CERT)',
    description: 'The PARCERT number identifies the subsidiary institutions parent certificate number. Beginning in March 1997, both the Thrift Financial Reports and Call Reports are completed on a fully consolidated basis.  Previously, the consolidation of subsidiary depository institutions was prohibited.  Now, parent institutions are required to file consolidated reports, while their subsidiary financial institutions are still required to file separate reports.',
    title_alt: 'Directly Owned By Another Bank (Cert)',
    description_alt: 'Beginning in March 1997, both the Thrift Financial Reports and Call Reports are completed on a fully consolidated basis. Previously, the consolidation of subsidiary depository institutions was prohibited. Now, parent institutions are required to file consolidated reports, while their subsidiary financial institutions are still required to file separate reports. Select the certificate number to identify the parent bank or thrift.'
  }, {
    field_id: 53,
    field_name: 'CB',
    title: 'Community Bank',
    description: 'FDIC community banks are identified based on criteria defined in the FDIC Community Banking Study. Using detailed balance sheet and geographic data, the study defines communtiy banks in terms of their traditional relationship banking and limited geographic scope of operations',
    title_alt: 'Community Bank',
    description_alt: "FDIC Community banks are identified based on criteria defined in the FDIC community banking study. using detailed balance sheet and geographic data, the study defines community banks primarily in terms of their traditional relationship banking and limited geographic scope of operations. Summary of FDIC Research Definition of Community Banking Organizations Community banks are designated at the level of the banking. (All charters under designated holding companies are considered community banking charters.) Exclude: Any organization with: - No loans or no core deposits - Foreign Assets &#8805;10% of total assets - More than 50% of assets in certain specialty banks, including: credit card specialists consumer nonbank banks1 industrial loan companies trust companies bankers' banks Include: All remaining banking organizations with: - Total assets 2 - Total assets &#8805;indexed size threshold, where: Loan to assets > 33% Core deposits to assets > 50% More than 1 office but no more than the indexed maximum number of offices.3 Number of large MSAs with offices &#8804;2 Number of states with offices &#8804;3 No single office with deposits > indexed maximum branch deposit size.4 1 Consumer nonbank banks are financial institutions with limited charters that can make commercial loans or take deposits, but not both. 2 Asset size threshold indexed to equal $250 million in 1985 and $1 billion in 2010. 3 Maximum number of offices indexed to equal 40 in 1985 and 75 in 2010. 4 Maximum branch deposit size indexed to equal $1.25 billion in 1985 and $5 billion in 2010."
  }, {
    field_id: 139,
    field_name: 'TRUST',
    title: 'Trust Powers',
    description: "A flag used to indicate an institution's Trust Powers Granted status. 0 = No Trust Power Granted 1 = Trust Power Granted Where Trust Power has been granted specific codes are: 00 - Trust powers not know 10 - Full trust powers granted 11 - Full trust powers granted, exercised 12 - Full trust powers granted, not exercised 20 - Limited trust powers granted 21 - Limited trust powers granted, exercised 22 - Limited trust powers granted, not exercised 30 - Trust powers not granted 31 - Trust powers not granted, but exercised",
    title_alt: 'Trust Powers',
    description_alt: 'A number corresponding to a valid type of trust power that an institution can possess and exercise:\n' +
      ' 00 - Trust Powers Not Known; \n' +
      ' 10 - Full Trust Powers Granted; \n' +
      ' 11 - Full Trust Powers Granted, Exercised; \n' +
      ' 12 - Full Trust Powers Granted, Not Exercised; \n' +
      ' 20 - Limited Trust Powers Granted; \n' +
      ' 21 - Limited Trust Powers Granted, Exercised; \n' +
      ' 30 - Trust Powers Not Granted; \n' +
      ' 31 - Trust Powers Not Granted, But Exercised; \n' +
      ' 40 - Trust Powers Grandfathered'
  }, {
    field_id: 142,
    field_name: 'BKCLASS',
    title: 'INSTITUTION CLASS',
    description: "A classification code assigned by the FDIC based on the institution's charter type (commercial bank or savings institution), charter agent (state or federal), Federal Reserve membership status (Fed member, Fed non-member) and its primary federal regulator (state chartered institutions are subject to both federal and state supervision). N - Commercial bank, national (federal) charter, Fed member, and supervised by the Office of the Comptroller of the Currency (OCC); NM - Commercial bank, state charter, Fed non-member, and supervised by the Federal Deposit Insurance Corporation (FDIC); OI - Insured U.S. branch of a foreign chartered institution (IBA) and supervised by the OCC or FDIC; SB – Federal savings banks, federal charter, supervised by the OCC or before July 21,2011 the Office of Thrift Supervision (OTS); SI - State chartered stock savings banks, supervised by the FDIC; SL - State chartered stock savings and loan associations, supervised by the FDIC or before July 21,2011 the OTS; SM - Commercial bank, state charter, Fed member, and supervised by the Federal Reserve Bank (FRB); NC – Noninsured non-deposit commercial banks and/or trust companies regulated by the OCC, a state, or a territory; NS - Noninsured stock savings bank supervised by a state or territory; CU - state or federally chartered credit unions supervised by the National Credit Union Association (NCUA).",
    title_alt: 'Institution Class',
    description_alt: "A classification code assigned by the FDIC based on the institution's charter type (commercial bank or savings institution), charter agent (state or federal), Federal Reserve membership status (Fed member, Fed non-member) and its primary federal regulator (state chartered institutions are subject to both federal and state supervision). \n" +
      ' N - Commercial bank, national (federal) charter, Fed member, and supervised by the Office of the Comptroller of the Currency (OCC); \n' +
      ' NM - Commercial bank, state charter, Fed non-member, and supervised by the Federal Deposit Insurance Corporation (FDIC); \n' +
      ' OI - Insured U.S. branch of a foreign chartered institution (IBA) and supervised by the OCC or FDIC; \n' +
      ' SB Federal savings banks, federal charter, supervised by the OCC or before July 21,2011 the Office of Thrift Supervision (OTS); \n' +
      ' SI - State chartered stock savings banks, supervised by the FDIC; \n' +
      ' SL - State chartered stock savings and loan associations, supervised by the FDIC or before July 21,2011 the OTS; \n' +
      ' SM - Commercial bank, state charter, Fed member, and supervised by the Federal Reserve Bank (FRB); \n' +
      ' NC - Noninsured non-deposit commercial banks and/or trust companies regulated by the OCC, a state, or a territory; \n' +
      ' NS - Noninsured stock savings bank supervised by a state or territory; \n' +
      ' CU - state or federally chartered credit unions supervised by the National Credit Union Association (NCUA).\n' +
      ' \n' +
      ' Note: The BKCLASS value represents the institution’s class as of the SOD survey date.'
  }, {
    field_id: 521,
    field_name: 'REGAGNT',
    title: 'PRIMARY REGULATING AGENCY',
    description: '',
    title_alt: 'Primary Federal Regulator (Institution)',
    description_alt: 'There are now three federal regulators of banks and savings and loan institutions. Before July 21, 2011, there were four federal regulators: federal deposit insurance corporation (FDIC) - primary federal regulator responsible for state-chartered banks not members of the Federal Reserve System, state chartered savings banks and as of July 21, 2011, state chartered thrifts. Federal Reserve Board (FRB) - Primary federal regulator responsible for state-chartered commercial and savings bank members of the Federal Reserve System. Office of the Comptroller of the Currency (OCC) - Primary federal regulator responsible for nationally chartered commercial banks, and as of July 21, 2011, federally chartered thrifts. Office of Thrift Supervision (OTS) - Prior to its merger into the OCC on July 21, 2011, primary federal regulator responsible for federally chartered savings and loan associations, federal savings banks and state-chartered savings and loan associations. FDIC Insured depository institutions are members of the Deposit Insurance Fund (DIF).'
  }, {
    field_id: 1021,
    field_name: 'INSAGNT1',
    title: 'PRIMARY INSURER',
    description: '',
    title_alt: '',
    description_alt: ''
  }, {
    field_id: 517,
    field_name: 'QBPRCOMLDESC',
    title: 'QBP COMMERCIAL BANK REGION DESC',
    description: '',
    title_alt: '',
    description_alt: ''
  }, {
    field_id: 253,
    field_name: 'FDICDBSDESC',
    title: 'FDIC REGION DESC',
    description: '',
    title_alt: '',
    description_alt: ''
  }, {
    field_id: 255,
    field_name: 'FDICSUPVDESC',
    title: 'FDIC REGION - SUPERVISORY DESC',
    description: '',
    title_alt: '',
    description_alt: ''
  }, {
    field_id: 259,
    field_name: 'FLDOFF',
    title: 'FDIC RISK MANAGEMENT FIELD OFFICE',
    description: '',
    title_alt: 'FDIC Field Office',
    description_alt: 'The FDIC Field Office where an institution is physically located.'
  }, {
    field_id: 257,
    field_name: 'FEDDESC',
    title: 'FED DISTRICT DESC',
    description: '',
    title_alt: '',
    description_alt: ''
  }, {
    field_id: 471,
    field_name: 'OCCDISTDESC',
    title: 'OCC DISTRICT DESC',
    description: '',
    title_alt: '',
    description_alt: ''
  }, {
    field_id: 52,
    field_name: 'CALLFORM',
    title: 'Call Form Number',
    description: 'TBD',
    title_alt: 'Regulatory reporting form number (FFIEC Call report number or before 2012 100 indicates FHLB TFR reporter)',
    description_alt: 'The type of financial report filed by an institution to the regulators. Thrift Financial Report Filers: 100 - Savings institution Thrift Financial Report or TFR filer (3/1984 - 12/2011) FFIEC Call Report Filers: 002 – International Banking Act Institution (6/1980-present) 031 – Banks with domestic and foreign offices (3/1984 - present) 032 - Banks with domestic offices only and total assets of $300 million or more ( 3/1984 - 12/2000) 033 - Banks with domestic offices only and total assets of over $100 million but less than $300 million (3/1984 - 12/2000) 034 - Banks with domestic offices only and total assets less than $100 million (3/1984 - 12/2000) 041 - Banks with domestic offices only (3/2001 - present) 051 - Banks with domestic offices only and total assets less than $5 billion (9/2019 - present). Banks with domestic offices only and total assets less than $1 billion. (3/2017 - 6/2019) For further information on FFIEC Call Reports , click here. For further information on Thrift Financial Reports, click here.'
  }, {
    field_id: 141,
    field_name: 'ACTIVE',
    title: 'ACTIVE INSTITUTION FLAG',
    description: '',
    title_alt: 'Institution Status',
    description_alt: "A number indicating the status of an institution. 1='Institutions that are currently open and insured by the FDIC'; 0='Institution closed or not insured by FDIC'"
  }
]
}

const reportedValues: ReportedValue[] = [
    // JPMorgan Chase Bank, NA (institution_id: 130445), report_period_id: 3
    { institution_id: 130445, report_period_id: 3, field_id: 112, value: "JPMorgan Chase & Co." },
    { institution_id: 130445, report_period_id: 3, field_id: 75, value: "628" },
    { institution_id: 130445, report_period_id: 3, field_id: 1891, value: 852218 },
    { institution_id: 130445, report_period_id: 3, field_id: 1337, value: "JPMorgan Chase Bank, National Association" },
    { institution_id: 130445, report_period_id: 3, field_id: 652, value: "New York" },
    { institution_id: 130445, report_period_id: 3, field_id: 559, value: "NY" },
    { institution_id: 130445, report_period_id: 3, field_id: 2247, value: "10013" },
    { institution_id: 130445, report_period_id: 3, field_id: 118, value: 5000 },
    { institution_id: 130445, report_period_id: 3, field_id: 119, value: 198 },
    { institution_id: 130445, report_period_id: 3, field_id: 56, value: 1 },
    { institution_id: 130445, report_period_id: 3, field_id: 120, value: 20 },
    { institution_id: 130445, report_period_id: 3, field_id: 135, value: "Commercial Banking" },
    { institution_id: 130445, report_period_id: 3, field_id: 137, value: 0 },
    { institution_id: 130445, report_period_id: 3, field_id: 2335, value: "36061" },
    { institution_id: 130445, report_period_id: 3, field_id: 2336, value: "New York–Newark–Jersey City, NY–NJ–PA" },
    { institution_id: 130445, report_period_id: 3, field_id: 958, value: "1799-09-13" },
    { institution_id: 130445, report_period_id: 3, field_id: 2337, value: "1934-01-01" },
    { institution_id: 130445, report_period_id: 3, field_id: 906, value: "2004-12-31" },
    { institution_id: 130445, report_period_id: 3, field_id: 111, value: 0 },
    { institution_id: 130445, report_period_id: 3, field_id: 121, value: 0 },
    { institution_id: 130445, report_period_id: 3, field_id: 53, value: 0 },
    { institution_id: 130445, report_period_id: 3, field_id: 139, value: 10 },
    { institution_id: 130445, report_period_id: 3, field_id: 142, value: "N" },
    { institution_id: 130445, report_period_id: 3, field_id: 521, value: "OCC" },
    { institution_id: 130445, report_period_id: 3, field_id: 1021, value: "FDIC" },
    { institution_id: 130445, report_period_id: 3, field_id: 517, value: "National" },
    { institution_id: 130445, report_period_id: 3, field_id: 253, value: "Region I – New York" },
    { institution_id: 130445, report_period_id: 3, field_id: 255, value: "Region I – NY Supervision" },
    { institution_id: 130445, report_period_id: 3, field_id: 259, value: "New York" },
    { institution_id: 130445, report_period_id: 3, field_id: 257, value: "Federal Reserve Bank of New York" },
    { institution_id: 130445, report_period_id: 3, field_id: 471, value: "Northeast District" },
    { institution_id: 130445, report_period_id: 3, field_id: 52, value: "041" },
    { institution_id: 130445, report_period_id: 3, field_id: 141, value: 1 },
  
    // Bank of America, NA (institution_id: 132265), report_period_id: 3
    { institution_id: 132265, report_period_id: 3, field_id: 112, value: "Bank of America Corporation" },
    { institution_id: 132265, report_period_id: 3, field_id: 75, value: "3510" },
    { institution_id: 132265, report_period_id: 3, field_id: 1891, value: 409309 },
    { institution_id: 132265, report_period_id: 3, field_id: 1337, value: "Bank of America, National Association" },
    { institution_id: 132265, report_period_id: 3, field_id: 652, value: "Charlotte" },
    { institution_id: 132265, report_period_id: 3, field_id: 559, value: "NC" },
    { institution_id: 132265, report_period_id: 3, field_id: 2247, value: "28255" },
    { institution_id: 132265, report_period_id: 3, field_id: 118, value: 4500 },
    { institution_id: 132265, report_period_id: 3, field_id: 119, value: 50 },
    { institution_id: 132265, report_period_id: 3, field_id: 56, value: 1 },
    { institution_id: 132265, report_period_id: 3, field_id: 120, value: 25 },
    { institution_id: 132265, report_period_id: 3, field_id: 135, value: "Commercial Banking" },
    { institution_id: 132265, report_period_id: 3, field_id: 137, value: 0 },
    { institution_id: 132265, report_period_id: 3, field_id: 2335, value: "37119" },
    { institution_id: 132265, report_period_id: 3, field_id: 2336, value: "Charlotte–Concord–Gastonia, NC–SC" },
    { institution_id: 132265, report_period_id: 3, field_id: 958, value: "1904-10-17" },
    { institution_id: 132265, report_period_id: 3, field_id: 2337, value: "1934-01-01" },
    { institution_id: 132265, report_period_id: 3, field_id: 906, value: "2008-01-01" },
    { institution_id: 132265, report_period_id: 3, field_id: 111, value: 0 },
    { institution_id: 132265, report_period_id: 3, field_id: 121, value: 0 },
    { institution_id: 132265, report_period_id: 3, field_id: 53, value: 0 },
    { institution_id: 132265, report_period_id: 3, field_id: 139, value: 10 },
    { institution_id: 132265, report_period_id: 3, field_id: 142, value: "N" },
    { institution_id: 132265, report_period_id: 3, field_id: 521, value: "OCC" },
    { institution_id: 132265, report_period_id: 3, field_id: 1021, value: "FDIC" },
    { institution_id: 132265, report_period_id: 3, field_id: 517, value: "National" },
    { institution_id: 132265, report_period_id: 3, field_id: 253, value: "Region IV – Atlanta" },
    { institution_id: 132265, report_period_id: 3, field_id: 255, value: "Region IV – Atlanta Supervision" },
    { institution_id: 132265, report_period_id: 3, field_id: 259, value: "Atlanta" },
    { institution_id: 132265, report_period_id: 3, field_id: 257, value: "Federal Reserve Bank of Richmond" },
    { institution_id: 132265, report_period_id: 3, field_id: 471, value: "Southeast District" },
    { institution_id: 132265, report_period_id: 3, field_id: 52, value: "041" },
    { institution_id: 132265, report_period_id: 3, field_id: 141, value: 1 },
  
    // Wells Fargo Bank, NA (institution_id: 132266), report_period_id: 3
    { institution_id: 132266, report_period_id: 3, field_id: 112, value: "Wells Fargo & Company" },
    { institution_id: 132266, report_period_id: 3, field_id: 75, value: "3511" },
    { institution_id: 132266, report_period_id: 3, field_id: 1891, value: 1533224 },
    { institution_id: 132266, report_period_id: 3, field_id: 1337, value: "Wells Fargo Bank, National Association" },
    { institution_id: 132266, report_period_id: 3, field_id: 652, value: "San Francisco" },
    { institution_id: 132266, report_period_id: 3, field_id: 559, value: "CA" },
    { institution_id: 132266, report_period_id: 3, field_id: 2247, value: "94104" },
    { institution_id: 132266, report_period_id: 3, field_id: 118, value: 4800 },
    { institution_id: 132266, report_period_id: 3, field_id: 119, value: 32 },
    { institution_id: 132266, report_period_id: 3, field_id: 56, value: 1 },
    { institution_id: 132266, report_period_id: 3, field_id: 120, value: 15 },
    { institution_id: 132266, report_period_id: 3, field_id: 135, value: "Commercial Banking" },
    { institution_id: 132266, report_period_id: 3, field_id: 137, value: 0 },
    { institution_id: 132266, report_period_id: 3, field_id: 2335, value: "06075" },
    { institution_id: 132266, report_period_id: 3, field_id: 2336, value: "San Francisco–Oakland–Berkeley, CA" },
    { institution_id: 132266, report_period_id: 3, field_id: 958, value: "1870-03-18" },
    { institution_id: 132266, report_period_id: 3, field_id: 2337, value: "1934-01-01" },
    { institution_id: 132266, report_period_id: 3, field_id: 906, value: "1998-05-11" },
    { institution_id: 132266, report_period_id: 3, field_id: 111, value: 0 },
    { institution_id: 132266, report_period_id: 3, field_id: 121, value: 0 },
    { institution_id: 132266, report_period_id: 3, field_id: 53, value: 0 },
    { institution_id: 132266, report_period_id: 3, field_id: 139, value: 10 },
    { institution_id: 132266, report_period_id: 3, field_id: 142, value: "N" },
    { institution_id: 132266, report_period_id: 3, field_id: 521, value: "OCC" },
    { institution_id: 132266, report_period_id: 3, field_id: 1021, value: "FDIC" },
    { institution_id: 132266, report_period_id: 3, field_id: 517, value: "National" },
    { institution_id: 132266, report_period_id: 3, field_id: 253, value: "Region IX – San Francisco" },
    { institution_id: 132266, report_period_id: 3, field_id: 255, value: "Region IX – SF Supervision" },
    { institution_id: 132266, report_period_id: 3, field_id: 259, value: "San Francisco" },
    { institution_id: 132266, report_period_id: 3, field_id: 257, value: "Federal Reserve Bank of San Francisco" },
    { institution_id: 132266, report_period_id: 3, field_id: 471, value: "Western District" },
    { institution_id: 132266, report_period_id: 3, field_id: 52, value: "041" },
    { institution_id: 132266, report_period_id: 3, field_id: 141, value: 1 },
  ];
  
  /**
   * Returns the reported value for a given institution, report period, and field.
   */
  export async function getReportedValue(
    institution_id: number,
    report_period_id: number,
    field_id: number
  ): Promise<string | number | undefined> {
    const record = reportedValues.find(
      (r) => r.institution_id === institution_id && r.report_period_id === report_period_id && r.field_id === field_id
    );
    return record ? record.value : undefined;
  }
  