import { createClient } from '@supabase/supabase-js'
const URL = 'https://kanttdilozhgqmyzmqbh.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImthbnR0ZGlsb3poZ3FteXptcWJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODIyNjQzNDUsImV4cCI6MTk5Nzg0MDM0NX0.9GsGf_jyf-KtPUmW1oNXOqfrvl0B7-tuzS2EaXfaXBY';

export const supabase = createClient(URL, API_KEY);