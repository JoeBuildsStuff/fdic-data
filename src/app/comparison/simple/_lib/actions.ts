'use server';

import { getReportedValue, getFields } from './queries';
import { Field } from './types';

// Type for the data returned by the server action
export type ReportedDataForColumn = {
  [field_id: number]: string | number | undefined;
};

/**
 * Server Action to fetch all reported values for a specific
 * institution and report period.
 */
export async function getReportedDataForSelection(
  institutionId: number,
  reportPeriodId: number
): Promise<ReportedDataForColumn> {
  console.log(`Server Action: Fetching data for instId: ${institutionId}, periodId: ${reportPeriodId}`);
  
  // We need the list of fields to know which values to fetch
  const fields: Field[] = await getFields(); 
  const reportedData: ReportedDataForColumn = {};

  // Create promises for all getReportedValue calls
  const fetchPromises = fields.map(async (field) => {
    try {
      const value = await getReportedValue(institutionId, reportPeriodId, field.field_id);
      if (value !== undefined) {
        reportedData[field.field_id] = value;
      }
    } catch (error) {
      console.error(`Error fetching value for field ${field.field_id}:`, error);
      // Decide how to handle errors - maybe return null or a specific error indicator
      reportedData[field.field_id] = undefined; 
    }
  });

  // Wait for all fetches to complete
  await Promise.all(fetchPromises);

  console.log(`Server Action: Returning data for instId: ${institutionId}, periodId: ${reportPeriodId}`, reportedData);
  return reportedData;
} 