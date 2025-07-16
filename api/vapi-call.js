// File: api/vapi-call.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  const VAPI_API_KEY = 'f6e063e2-0c8c-48f7-9c90-10f427680db0';
  const endpoint = 'https://api.vapi.ai/calls'; // ✅ Actual Vapi endpoint

  try {
    const vapiResponse = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${VAPI_API_KEY}`,
      },
      body: JSON.stringify(req.body),
    });

    const data = await vapiResponse.json();
    return res.status(vapiResponse.status).json(data);
  } catch (err) {
    return res.status(500).json({ error: 'Proxy error', message: err.message });
  }
}
