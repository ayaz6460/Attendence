  export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const googleAppsScriptURL = 'https://script.google.com/macros/s/AKfycbzon1fPlptEirip8R8GGhoDSJaCLuZXpXR4ddmzFAQQyaegM37pfD6AHMjoo0IktslcMA/exec';

    // Forward the POST body as-is to Google Apps Script
    const forward = await fetch(googleAppsScriptURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body)
    });

    const text = await forward.text();

    // Try to parse as JSON — fallback to text if it fails
    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch (err) {
      parsed = { success: true, message: text };
    }

    return res.status(200).json(parsed);

  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

