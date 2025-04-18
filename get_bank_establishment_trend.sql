CREATE OR REPLACE FUNCTION fdic_data.get_bank_establishment_trend()
RETURNS TABLE (
    year TEXT,
    count BIGINT
) 
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    WITH data AS (
        SELECT 
            EXTRACT(YEAR FROM estymd::DATE) AS est_year
        FROM 
            fdic_data.institutions
        WHERE 
            estymd IS NOT NULL
    )
    SELECT 
        est_year::TEXT AS year,
        COUNT(*) AS count
    FROM 
        data
    GROUP BY 
        est_year
    ORDER BY 
        est_year;
END;
$$; 