import { supabase } from '../../utils/supabaseClient';

export async function GET(req) {
    console.log("Request received for /api/checkConnection");

    const { data, error, status } = await supabase
        .from('Users')
        .select('*');

    console.log("Query status:", status);
    console.log("Query error:", error);
    console.log("Query data:", data);

    if (error) {
        console.error("Error fetching users:", error.message);
        return new Response(JSON.stringify({ success: false, error: error.message }), {
            status: 500,
        });
    }

    if (data.length === 0) {
        console.log("No users found.");
    }

    return new Response(JSON.stringify({ success: true, data }), {
        status: 200,
    });
}
