export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const googleAppsScriptURL = 'https://script.google.com/macros/s/AKfycbzon1fPlptEirip8R8GGhoDSJaCLuZXpXR4ddmzFAQQyaegM37pfD6AHMjoo0IktslcMA/exec';

    // Debug: log incoming request body
    console.log('Incoming request body:', req.body);

    const forward = await fetch(googleAppsScriptURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body)
    });

    const text = await forward.text();

    // Debug: log response from Google Apps Script
    console.log('Google Apps Script response:', text);

    // 🧠 Try to parse as JSON — fallback to text if it fails
    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch (err) {
      parsed = { success: true, message: text };
    }

    return res.status(200).json(parsed);

  } catch (err) {
    console.error('Backend error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
}
