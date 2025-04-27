'use server';

import { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/lib/database.types';

export async function getReportPeriods(supabase: SupabaseClient<Database, 'fdic_data'>) {
  const { data, error } = await supabase
    .schema('fdic_data')
    .from('report_periods')
    .select('*')
    .limit(10);

  if (error) {
    console.error('Error fetching report_periods:', error);
    // Optionally, re-throw the error or return a specific error object
    return { data: null, error };
  }
  return { data, error: null };
}

export async function getInstitutions(supabase: SupabaseClient<Database, 'fdic_data'>) {
  const { data, error } = await supabase
    .schema('fdic_data')
    .from('institutions')
    .select('id, name, cert, dep')
    .not('dep', 'is', null)
    .order('dep', { ascending: false })
    .limit(10);

  if (error) {
    console.error('Error fetching institutions:', error);
    return { data: null, error };
  }
  return { data, error: null };
}

export async function getFields(supabase: SupabaseClient<Database, 'fdic_data'>) {
  const { data, error } = await supabase
    .schema('fdic_data')
    .from('fields')
    .select('*')
    .limit(10);

  if (error) {
    console.error('Error fetching fields:', error);
    return { data: null, error };
  }
  return { data, error: null };
}

export async function getFieldByName(supabase: SupabaseClient<Database, 'fdic_data'>, fieldName: string) {
  const { data, error } = await supabase
    .schema('fdic_data')
    .from('fields')
    .select('*')
    .eq('field_name', fieldName)
    .single(); // Use single() to expect only one row

  if (error) {
    console.error(`Error fetching field by name "${fieldName}":`, error);
    return { data: null, error };
  }
  return { data, error: null };
}

export async function getReportedValue(
  supabase: SupabaseClient<Database, 'fdic_data'>,
  reportPeriodId: number,
  fieldId: number,
  institutionId: number
) {
  const { data, error } = await supabase
    .schema('fdic_data')
    .from('reported_values')
    .select('value')
    .eq('report_period_id', reportPeriodId)
    .eq('field_id', fieldId)
    .eq('institution_id', institutionId)
    .maybeSingle();

  if (error) {
    console.error(
      `Error fetching reported value for report_period_id ${reportPeriodId}, field_id ${fieldId}, institution_id ${institutionId}:`,
      error
    );
    return { data: null, error };
  }

  // Return the value directly if found, otherwise null
  return { data: data ? data.value : null, error: null };
}
