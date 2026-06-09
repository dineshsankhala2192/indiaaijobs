import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with custom agent telemetry
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// Endpoint to automatically analyze, parse, and categorize job circulars/notices
app.post('/api/ai-autodetect', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Please provide the text of the job alert or circular.' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ 
        error: 'GEMINI_API_KEY is not configured in the Secrets panel. Please define it in your environment or Secrets.' 
      });
    }

    // Call the server-side Gemini 3.5 Flash model with structured JSON response configuration
    const prompt = `Analyze the following Indian government document text (job announcement, result declaration, or admit card notice).
Determine the 'documentType' as one of:
- 'job' (New recruitment, vacancy notice, notification)
- 'result' (Result declaration, merit list, cut-off marks)
- 'admit_card' (Admit card release, hall ticket, call letter)

If it's a 'job', extract the details and map it to our structured job category schema.
If it's a 'result' or 'admit_card', provide a concise 'summaryText' (e.g. "SSC CGL Tier 1 Result Declared", "UPSC Prelims Admit Card Download").

The schema allows mapping job categories to one of these category IDs (only required for jobs):
- 'state' (State-wise jobs like Bihar, Maharashtra, Rajasthan, etc.)
- 'psu' (Public Sector Undertaking like ONGC, BHEL, GAIL, etc.)
- 'psc' (Public Service Commission boards like UPSC, BPSC, UPPSC, etc.)
- 'banking' (Banks like SBI PO/Clerk, RBI Grade B, IBPS, LIC, etc.)
- 'railway' (Railways like RRB NTPC, RRB Group D, Metro Rail, etc.)
- 'defense' (Defense & Police like Indian Army, Navy, Air Force, Coast Guard)
- 'department' (Government Departments like Education Dept, Police Dept, Health Dept, Forest Dept)
- 'ministry' (Ministries like Min. of Defence, Min. of Railways, Min. of Education, Min. of Finance)
- 'qualification' (Education levels like 10th Pass, 12th Pass, Diploma, ITI, UG Level, PG Level)
- 'subject' (Degree/Subject specific like M.Sc Chemistry, M.Sc Maths, M.Sc Physics, B.Tech, B.Sc)

Input Document:
"""
${text}
"""`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        systemInstruction: 'You are an advanced AI Government Portal Categorizer for IndiaAIJobs. Extract details precisely, maintaining professional terminology.',
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          required: ['documentType'],
          properties: {
            documentType: {
              type: Type.STRING,
              description: 'One of: "job", "result", "admit_card"'
            },
            summaryText: {
              type: Type.STRING,
              description: 'For result or admit_card, provide a 1-line label to display, e.g. "SSC CHSL Tier 2 Merit List", "UPSC Admit Card Out"'
            },
            title: {
              type: Type.STRING,
              description: 'For job: The job position or exam title, e.g. "Constable GD Recruitment 2026"'
            },
            organization: {
              type: Type.STRING,
              description: 'For job: The recruiting organization in full, e.g. "Staff Selection Commission"'
            },
            categoryId: {
              type: Type.STRING,
              description: 'For job: One of the listed categories like "state", "psu", "subject", etc.'
            },
            categoryName: {
              type: Type.STRING,
              description: 'For job: The sub-category item name, e.g., "Bihar", "M.Sc Chemistry"'
            },
            tag: {
              type: Type.STRING,
              description: 'For job: Main eligibility criteria tag, e.g. "Graduate", "12th Pass", "M.Sc Maths"'
            },
            salary: {
              type: Type.STRING,
              description: 'For job: Starting monthly salary scale or basic pay'
            },
            deadline: {
              type: Type.STRING,
              description: 'For job: Last date to apply in standard human readable format, e.g. "30 Jun 2026"'
            }
          }
        }
      }
    });

    const resultText = response.text?.trim() || '{}';
    const jsonResult = JSON.parse(resultText);

    res.json({ success: true, data: jsonResult });
  } catch (error: any) {
    console.error('Error in AI Autodetect endpoint:', error);
    res.status(500).json({ error: error.message || 'Error processing request' });
  }
});

// Configure Vite middleware or serve static files based on build environment
async function init() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Express server running on http://localhost:${PORT}`);
  });
}

init();
