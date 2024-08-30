import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase URL or key is missing');
}

const supabase = createClient(supabaseUrl, supabaseKey);

const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Login", type: "text" },
                password: { label: "Password", type: "password" }
            },
            authorize: async (credentials) => {
                if (!credentials) {
                    console.error('No credentials provided');
                    return null;
                }

                const { username, password } = credentials;

                const { data, error } = await supabase
                    .from('Users')
                    .select('*')
                    .eq('login', username)
                    .single();

                if (error) {
                    console.error('Error fetching user:', error.message);
                    return null;
                }

                if (!data) {
                    console.error('No user found with this username');
                    return null;
                }

                const { password: storedPassword } = data;

                console.log('Comparing passwords:', password, storedPassword);

                const isPasswordValid = await bcrypt.compare(password, storedPassword);

                if (isPasswordValid) {
                    console.log('Password is valid');
                    return { id: data.id, name: username };
                } else {
                    console.error('Invalid password');
                    return null;
                }
            }
        })
    ],
    pages: {
        signIn: '/app/admin/login',
        signOut: '/',
    },
    callbacks: {
        async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
            return url.startsWith(baseUrl) ? url : `${baseUrl}/app/admin/dashboard`;
        }
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
