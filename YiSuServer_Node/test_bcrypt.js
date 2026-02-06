const bcrypt = require('bcrypt');

async function test() {
    console.log('Testing bcrypt...');
    try {
        const start = Date.now();
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash('123456', salt);
        const end = Date.now();
        console.log('Hash complete:', hash);
        console.log('Time taken:', end - start, 'ms');

        const isMatch = await bcrypt.compare('123456', hash);
        console.log('Compare match:', isMatch);
        process.exit(0);
    } catch (err) {
        console.error('Bcrypt error:', err.message);
        process.exit(1);
    }
}

test();
