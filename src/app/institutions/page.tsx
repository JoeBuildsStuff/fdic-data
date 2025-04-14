import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

interface InstitutionsProps {
  searchParams?: {
    page?: string;
  };
}

export default async function Institutions({ searchParams }: InstitutionsProps) {
  const supabase = await createClient();
  const pageSize = 10;
  const currentPage = parseInt(searchParams?.page || '1', 10);

  if (isNaN(currentPage) || currentPage < 1) {
    // Handle invalid page number, maybe redirect to page 1 or show an error
    // For simplicity, let's treat it as page 1 for now
    // In a real app, consider redirecting: redirect('/institutions?page=1')
  }

  const offset = (currentPage - 1) * pageSize;

  const { count, error: countError } = await supabase
    .from('fdic_data_institutions')
    .select('*', { count: 'exact', head: true });

  if (countError) {
    console.error('Error fetching institution count:', countError);
    return <div className="text-red-500">Error loading data count.</div>;
  }

  const { data: institutions, error: dataError } = await supabase
    .from('fdic_data_institutions')
    .select('*')
    .range(offset, offset + pageSize - 1);

  if (dataError) {
    console.error('Error fetching institutions:', dataError);
    return <div className="text-red-500">Error loading data.</div>;
  }

  if (!institutions || institutions.length === 0) {
    if (currentPage > 1) {
       return (
         <div className="p-4">
           <h1 className="text-2xl font-bold mb-4">FDIC Institutions</h1>
           <div>No institution data found for this page.</div>
           <div className="flex justify-between mt-4">
            <Link href={`/institutions?page=${currentPage - 1}`}>
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                Previous
              </button>
            </Link>
            <span>Page {currentPage}</span>
            <span></span>
          </div>
         </div>
       );
    }
    return <div className="p-4">No institution data found at all.</div>;
  }

  const totalPages = Math.ceil((count || 0) / pageSize);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">FDIC Institutions (Page {currentPage}/{totalPages})</h1>
      <pre className="bg-gray-100 p-4 rounded overflow-auto">
        {JSON.stringify(institutions, null, 2)}
      </pre>

      <div className="flex justify-between items-center mt-4">
        {currentPage > 1 ? (
          <Link href={`/institutions?page=${currentPage - 1}`}>
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 disabled:opacity-50">
              Previous
            </button>
          </Link>
        ) : (
          <button className="px-4 py-2 bg-gray-300 text-gray-500 rounded cursor-not-allowed" disabled>
            Previous
          </button>
        )}

        <span>Page {currentPage} of {totalPages}</span>

        {currentPage < totalPages ? (
          <Link href={`/institutions?page=${currentPage + 1}`}>
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 disabled:opacity-50">
              Next
            </button>
          </Link>
        ) : (
          <button className="px-4 py-2 bg-gray-300 text-gray-500 rounded cursor-not-allowed" disabled>
            Next
          </button>
        )}
      </div>
    </div>
  );
}
  