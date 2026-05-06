import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.post('/api/contact', async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  const { error } = await supabase.from('contact_messages').insert([
    { name, email, phone, message },
  ]);

  if (error) {
    console.error('Supabase error:', error);
    return res.status(500).json({ error: 'Failed to save message.' });
  }

  return res.json({ success: true, message: 'Message received.' });
});

app.get('/api/messages', async (_req, res) => {
  const { data, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  return res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
