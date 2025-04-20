
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  fdic_data: {
    Tables: {
      institutions: {
        Row: {
          active: string | null
          address: string | null
          asset: number | null
          bkclass: string | null
          cb: string | null
          cbsa: string | null
          cbsa_div: string | null
          cbsa_div_flg: string | null
          cbsa_div_no: string | null
          cbsa_metro: string | null
          cbsa_metro_flg: string | null
          cbsa_metro_name: string | null
          cbsa_micro_flg: string | null
          cbsa_no: string | null
          cert: string | null
          certcons: string | null
          cfpbeffdte: string | null
          cfpbenddte: string | null
          cfpbflag: string | null
          changec1: string | null
          changec10: string | null
          changec11: string | null
          changec12: string | null
          changec13: string | null
          changec14: string | null
          changec15: string | null
          changec2: string | null
          changec3: string | null
          changec4: string | null
          changec5: string | null
          changec6: string | null
          changec7: string | null
          changec8: string | null
          changec9: string | null
          charter: string | null
          chrtagnt: string | null
          city: string | null
          cityhcr: string | null
          clcode: number | null
          cmsa: string | null
          cmsa_no: string | null
          conserve: string | null
          county: string | null
          csa: string | null
          csa_flg: string | null
          csa_no: string | null
          dateupdt: string | null
          denovo: string | null
          dep: number | null
          depdom: number | null
          docket: string | null
          effdate: string | null
          endefymd: string | null
          eq: string | null
          estymd: string | null
          fdicdbs: string | null
          fdicregn: string | null
          fdicsupv: string | null
          fed: string | null
          fed_rssd: string | null
          fedchrtr: string | null
          fldoff: string | null
          form31: string | null
          hctmult: string | null
          iba: string | null
          id: number | null
          inactive: string | null
          insagnt1: string | null
          insagnt2: string | null
          insbif: string | null
          inscoml: string | null
          insdate: string | null
          insdif: string | null
          insdropdate: string | null
          insdropdate_raw: string | null
          insfdic: number | null
          inssaif: string | null
          inssave: string | null
          instag: string | null
          instcrcd: string | null
          latitude: number | null
          law_sasser_flg: string | null
          longitude: number | null
          mdi_status_code: string | null
          mdi_status_desc: string | null
          msa: string | null
          msa_no: string | null
          mutual: string | null
          name: string | null
          namehcr: string | null
          netinc: number | null
          netincq: number | null
          newcert: string | null
          oakar: string | null
          occdist: string | null
          offdom: number | null
          offfor: number | null
          offices: number | null
          offoa: number | null
          otsdist: string | null
          otsregnm: string | null
          parcert: string | null
          priorname1: string | null
          priorname10: string | null
          priorname2: string | null
          priorname3: string | null
          priorname4: string | null
          priorname5: string | null
          priorname6: string | null
          priorname7: string | null
          priorname8: string | null
          priorname9: string | null
          procdate: string | null
          qbprcoml: string | null
          regagent2: string | null
          regagnt: string | null
          repdte: string | null
          risdate: string | null
          roa: number | null
          roaptx: number | null
          roaptxq: number | null
          roaq: number | null
          roe: number | null
          roeq: number | null
          rssdhcr: string | null
          rundate: string | null
          sasser: string | null
          specgrp: number | null
          specgrpn: string | null
          stalp: string | null
          stalphcr: string | null
          stchrtr: string | null
          stcnty: string | null
          stname: string | null
          stnum: string | null
          subchaps: string | null
          suprv_fd: string | null
          te01n528: string | null
          te01n529: string | null
          te02n528: string | null
          te02n529: string | null
          te03n528: string | null
          te03n529: string | null
          te04n528: string | null
          te04n529: string | null
          te05n528: string | null
          te05n529: string | null
          te06n528: string | null
          te06n529: string | null
          te07n528: string | null
          te08n528: string | null
          te09n528: string | null
          te10n528: string | null
          tract: string | null
          trust: string | null
          ultcert: string | null
          uninum: string | null
          webaddr: string | null
          zip: string | null
        }
        Insert: {
          active?: string | null
          address?: string | null
          asset?: number | null
          bkclass?: string | null
          cb?: string | null
          cbsa?: string | null
          cbsa_div?: string | null
          cbsa_div_flg?: string | null
          cbsa_div_no?: string | null
          cbsa_metro?: string | null
          cbsa_metro_flg?: string | null
          cbsa_metro_name?: string | null
          cbsa_micro_flg?: string | null
          cbsa_no?: string | null
          cert?: string | null
          certcons?: string | null
          cfpbeffdte?: string | null
          cfpbenddte?: string | null
          cfpbflag?: string | null
          changec1?: string | null
          changec10?: string | null
          changec11?: string | null
          changec12?: string | null
          changec13?: string | null
          changec14?: string | null
          changec15?: string | null
          changec2?: string | null
          changec3?: string | null
          changec4?: string | null
          changec5?: string | null
          changec6?: string | null
          changec7?: string | null
          changec8?: string | null
          changec9?: string | null
          charter?: string | null
          chrtagnt?: string | null
          city?: string | null
          cityhcr?: string | null
          clcode?: number | null
          cmsa?: string | null
          cmsa_no?: string | null
          conserve?: string | null
          county?: string | null
          csa?: string | null
          csa_flg?: string | null
          csa_no?: string | null
          dateupdt?: string | null
          denovo?: string | null
          dep?: number | null
          depdom?: number | null
          docket?: string | null
          effdate?: string | null
          endefymd?: string | null
          eq?: string | null
          estymd?: string | null
          fdicdbs?: string | null
          fdicregn?: string | null
          fdicsupv?: string | null
          fed?: string | null
          fed_rssd?: string | null
          fedchrtr?: string | null
          fldoff?: string | null
          form31?: string | null
          hctmult?: string | null
          iba?: string | null
          id?: number | null
          inactive?: string | null
          insagnt1?: string | null
          insagnt2?: string | null
          insbif?: string | null
          inscoml?: string | null
          insdate?: string | null
          insdif?: string | null
          insdropdate?: string | null
          insdropdate_raw?: string | null
          insfdic?: number | null
          inssaif?: string | null
          inssave?: string | null
          instag?: string | null
          instcrcd?: string | null
          latitude?: number | null
          law_sasser_flg?: string | null
          longitude?: number | null
          mdi_status_code?: string | null
          mdi_status_desc?: string | null
          msa?: string | null
          msa_no?: string | null
          mutual?: string | null
          name?: string | null
          namehcr?: string | null
          netinc?: number | null
          netincq?: number | null
          newcert?: string | null
          oakar?: string | null
          occdist?: string | null
          offdom?: number | null
          offfor?: number | null
          offices?: number | null
          offoa?: number | null
          otsdist?: string | null
          otsregnm?: string | null
          parcert?: string | null
          priorname1?: string | null
          priorname10?: string | null
          priorname2?: string | null
          priorname3?: string | null
          priorname4?: string | null
          priorname5?: string | null
          priorname6?: string | null
          priorname7?: string | null
          priorname8?: string | null
          priorname9?: string | null
          procdate?: string | null
          qbprcoml?: string | null
          regagent2?: string | null
          regagnt?: string | null
          repdte?: string | null
          risdate?: string | null
          roa?: number | null
          roaptx?: number | null
          roaptxq?: number | null
          roaq?: number | null
          roe?: number | null
          roeq?: number | null
          rssdhcr?: string | null
          rundate?: string | null
          sasser?: string | null
          specgrp?: number | null
          specgrpn?: string | null
          stalp?: string | null
          stalphcr?: string | null
          stchrtr?: string | null
          stcnty?: string | null
          stname?: string | null
          stnum?: string | null
          subchaps?: string | null
          suprv_fd?: string | null
          te01n528?: string | null
          te01n529?: string | null
          te02n528?: string | null
          te02n529?: string | null
          te03n528?: string | null
          te03n529?: string | null
          te04n528?: string | null
          te04n529?: string | null
          te05n528?: string | null
          te05n529?: string | null
          te06n528?: string | null
          te06n529?: string | null
          te07n528?: string | null
          te08n528?: string | null
          te09n528?: string | null
          te10n528?: string | null
          tract?: string | null
          trust?: string | null
          ultcert?: string | null
          uninum?: string | null
          webaddr?: string | null
          zip?: string | null
        }
        Update: {
          active?: string | null
          address?: string | null
          asset?: number | null
          bkclass?: string | null
          cb?: string | null
          cbsa?: string | null
          cbsa_div?: string | null
          cbsa_div_flg?: string | null
          cbsa_div_no?: string | null
          cbsa_metro?: string | null
          cbsa_metro_flg?: string | null
          cbsa_metro_name?: string | null
          cbsa_micro_flg?: string | null
          cbsa_no?: string | null
          cert?: string | null
          certcons?: string | null
          cfpbeffdte?: string | null
          cfpbenddte?: string | null
          cfpbflag?: string | null
          changec1?: string | null
          changec10?: string | null
          changec11?: string | null
          changec12?: string | null
          changec13?: string | null
          changec14?: string | null
          changec15?: string | null
          changec2?: string | null
          changec3?: string | null
          changec4?: string | null
          changec5?: string | null
          changec6?: string | null
          changec7?: string | null
          changec8?: string | null
          changec9?: string | null
          charter?: string | null
          chrtagnt?: string | null
          city?: string | null
          cityhcr?: string | null
          clcode?: number | null
          cmsa?: string | null
          cmsa_no?: string | null
          conserve?: string | null
          county?: string | null
          csa?: string | null
          csa_flg?: string | null
          csa_no?: string | null
          dateupdt?: string | null
          denovo?: string | null
          dep?: number | null
          depdom?: number | null
          docket?: string | null
          effdate?: string | null
          endefymd?: string | null
          eq?: string | null
          estymd?: string | null
          fdicdbs?: string | null
          fdicregn?: string | null
          fdicsupv?: string | null
          fed?: string | null
          fed_rssd?: string | null
          fedchrtr?: string | null
          fldoff?: string | null
          form31?: string | null
          hctmult?: string | null
          iba?: string | null
          id?: number | null
          inactive?: string | null
          insagnt1?: string | null
          insagnt2?: string | null
          insbif?: string | null
          inscoml?: string | null
          insdate?: string | null
          insdif?: string | null
          insdropdate?: string | null
          insdropdate_raw?: string | null
          insfdic?: number | null
          inssaif?: string | null
          inssave?: string | null
          instag?: string | null
          instcrcd?: string | null
          latitude?: number | null
          law_sasser_flg?: string | null
          longitude?: number | null
          mdi_status_code?: string | null
          mdi_status_desc?: string | null
          msa?: string | null
          msa_no?: string | null
          mutual?: string | null
          name?: string | null
          namehcr?: string | null
          netinc?: number | null
          netincq?: number | null
          newcert?: string | null
          oakar?: string | null
          occdist?: string | null
          offdom?: number | null
          offfor?: number | null
          offices?: number | null
          offoa?: number | null
          otsdist?: string | null
          otsregnm?: string | null
          parcert?: string | null
          priorname1?: string | null
          priorname10?: string | null
          priorname2?: string | null
          priorname3?: string | null
          priorname4?: string | null
          priorname5?: string | null
          priorname6?: string | null
          priorname7?: string | null
          priorname8?: string | null
          priorname9?: string | null
          procdate?: string | null
          qbprcoml?: string | null
          regagent2?: string | null
          regagnt?: string | null
          repdte?: string | null
          risdate?: string | null
          roa?: number | null
          roaptx?: number | null
          roaptxq?: number | null
          roaq?: number | null
          roe?: number | null
          roeq?: number | null
          rssdhcr?: string | null
          rundate?: string | null
          sasser?: string | null
          specgrp?: number | null
          specgrpn?: string | null
          stalp?: string | null
          stalphcr?: string | null
          stchrtr?: string | null
          stcnty?: string | null
          stname?: string | null
          stnum?: string | null
          subchaps?: string | null
          suprv_fd?: string | null
          te01n528?: string | null
          te01n529?: string | null
          te02n528?: string | null
          te02n529?: string | null
          te03n528?: string | null
          te03n529?: string | null
          te04n528?: string | null
          te04n529?: string | null
          te05n528?: string | null
          te05n529?: string | null
          te06n528?: string | null
          te06n529?: string | null
          te07n528?: string | null
          te08n528?: string | null
          te09n528?: string | null
          te10n528?: string | null
          tract?: string | null
          trust?: string | null
          ultcert?: string | null
          uninum?: string | null
          webaddr?: string | null
          zip?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_bank_age_distribution: {
        Args: Record<PropertyKey, never>
        Returns: {
          age_range: string
          count: number
        }[]
      }
      get_bank_deposit_distribution: {
        Args: Record<PropertyKey, never>
        Returns: {
          deposit_range: string
          count: number
        }[]
      }
      get_bank_establishment_trend: {
        Args: Record<PropertyKey, never>
        Returns: {
          year: string
          count: number
        }[]
      }
      get_key_statistics: {
        Args: Record<PropertyKey, never>
        Returns: {
          total_assets: number
          total_deposits: number
          total_branches: number
          total_institutions: number
        }[]
      }
      get_market_share_of_top_assets: {
        Args: Record<PropertyKey, never>
        Returns: {
          group_name: string
          percentage_of_total: number
          bank_count: number
        }[]
      }
      get_market_share_of_top_deposits: {
        Args: Record<PropertyKey, never>
        Returns: {
          group_name: string
          percentage_of_total: number
          bank_count: number
        }[]
      }
      get_market_share_of_top_eq: {
        Args: Record<PropertyKey, never>
        Returns: {
          group_name: string
          percentage_of_total: number
          bank_count: number
        }[]
      }
      get_market_share_of_top_netinc: {
        Args: Record<PropertyKey, never>
        Returns: {
          group_name: string
          percentage_of_total: number
          bank_count: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  fdic_data: {
    Enums: {},
  },
} as const
