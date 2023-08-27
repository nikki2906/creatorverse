import { createClient } from '@supabase/supabase-js';

const URL = 'https://nnuhnrmjudxdnvbtazsg.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5udWhucm1qdWR4ZG52YnRhenNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTMwODM1NjgsImV4cCI6MjAwODY1OTU2OH0.CTjUkFB1xgo_pKfQeSzLf4BPPgEocqtIdpU-of7pkbQ';

export const supabase = createClient(URL, API_KEY);
