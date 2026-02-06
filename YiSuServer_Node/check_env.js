require('dotenv').config();
console.log('Environment Variables Check:');
console.log('SUPABASE_URL:', process.env.SUPABASE_URL ? 'PRESENT (Masked)' : 'MISSING');
console.log('SUPABASE_KEY:', process.env.SUPABASE_KEY ? 'PRESENT (Masked)' : 'MISSING');
console.log('PORT:', process.env.PORT);
