const supabase = require('./config/supabase');

async function probeRole() {
    console.log('Probing user roles in Supabase...');
    try {
        // Just try to get one user
        const { data, error } = await supabase
            .from('user')
            .select('user_id, role')
            .limit(10);

        if (error) {
            console.error('Supabase error:', error.message);
            process.exit(1);
        }

        if (data && data.length > 0) {
            console.log('Found users with roles:', data.map(u => ({ id: u.user_id, role: u.role })));
        } else {
            console.log('No users found in database to probe.');
        }
        process.exit(0);
    } catch (err) {
        console.error('Probe failed:', err.message);
        process.exit(1);
    }
}

probeRole();
