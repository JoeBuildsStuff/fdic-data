export type InstitutionOld = {
    institutionStatus: 0 | 1
    institutionName: string
    fdicCertificateNumber: number
    federalReserveIdNumber: number
    zipCode: number
    numberOfDomesticOffices: number
    numberOfForeignOffices: number
    interstateBranches: number
  }

export type Institution = {
    id: number
    name: string
    cert: string
    dep: number
}

export type Field = {
    field_id: number
    field_name: string
    title: string
    description: string
    title_alt: string
    description_alt: string
}

export type ReportedValue = {
    report_period_id: number
    field_id: number
    institution_id: number
    value: number | string
}

export type ReportPeriod = {
    report_period_id: number
    report_date: string
    created_at: string
}

