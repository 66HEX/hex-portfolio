import bcrypt from 'bcrypt';
import { createClient } from '@supabase/supabase-js';

// Skonfiguruj połączenie z Supabase
const supabaseUrl = 'https://qrpsmqlrurzqbpluvvca.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFycHNtcWxydXJ6cWJwbHV2dmNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ5MDg0MjYsImV4cCI6MjA0MDQ4NDQyNn0.UhAI3NLMc6CsFskIEWHDI4XkVv1_p8LeeDPOCOxjSe8';
const supabase = createClient(supabaseUrl, supabaseKey);

async function hashPassword(password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

async function addUser(username, plainPassword) {
    const hashedPassword = await hashPassword(plainPassword);

    const { data, error } = await supabase
        .from('Users')
        .insert([{ login: username, password: hashedPassword }]);

    if (error) {
        console.error('Error inserting user:', error.message);
    } else {
        console.log('User added:', data);
    }
}

// Przykład użycia
const username = 'hexthecoder';
const password = 'hexthecoder1A';

addUser(username, password).then(() => {
    console.log('User added successfully.');
}).catch((error) => {
    console.error('Error:', error);
});
