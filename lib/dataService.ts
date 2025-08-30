import { supabase } from './supabaseClient';

export async function fetchPosts() {
    const { data, error } = await supabase.from('posts').select('*');
    if (error) throw error;
    return data;
}

export async function addPost(post: { title: string; content: string }) {
    const { data, error } = await supabase.from('posts').insert([post]);
    if (error) throw error;
    return data;
}