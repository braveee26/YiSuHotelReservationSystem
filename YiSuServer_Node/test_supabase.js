const supabase = require('./config/supabase');

async function test() {
    console.log('Testing Supabase connection...');
    try {
        const { data, error } = await supabase
            .from('user')
            .select('count', { count: 'exact', head: true });

        if (error) {
            console.error('Supabase error:', error.message);
            process.exit(1);
        }
        console.log('Connection successful! Data count fetched.');
        process.exit(0);
    } catch (err) {
        console.error('Unexpected error:', err.message);
        process.exit(1);
    }
}

test();
