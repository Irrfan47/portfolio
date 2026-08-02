<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
    exit();
}

$input = json_decode(file_get_contents('php://input'), true);
$message = $input['message'] ?? '';
$history = $input['history'] ?? [];

if (empty($message)) {
    http_response_code(400);
    echo json_encode(["error" => "Message is required"]);
    exit();
}

// Helper to load .env variables
function loadEnv($path) {
    if (!file_exists($path)) return;
    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) continue;
        if (strpos($line, '=') === false) continue;
        list($name, $value) = explode('=', $line, 2);
        $name = trim($name);
        $value = trim($value);
        if (!array_key_exists($name, $_SERVER) && !array_key_exists($name, $_ENV)) {
            putenv("{$name}={$value}");
            $_ENV[$name] = $value;
            $_SERVER[$name] = $value;
        }
    }
}

// Load env values
loadEnv(__DIR__ . '/../../.env');

$geminiApiKey = getenv('GEMINI_API_KEY');

$systemPrompt = "You are the \"OS_ASSISTANT v2.0\", a warm, professional, and highly efficient digital companion for Kaung Khant Mg Mg. Your tone is helpful and welcoming, but you value the user's time by keeping every response ULTRA-CONCISE.\n\nBackground Info:\n- Name: Kaung Khant Mg Mg\n- Role: Full Stack Web Developer based in Yangon, Myanmar (3+ years experience).\n- Focus: Bridging the gap between design & engineering with premium, minimalist aesthetics.\n- Experience: Current Freelance Developer. Previously Fullstack Intern at Nurkamal Network (built 5+ apps) and AMSA Officer.\n- Core Tech: React, TypeScript, Next.js, Tailwind, Node.js, PHP, Laravel, MySQL, and Python.\n\nKey Projects Data:\n- Filmophia: Premium movie platform using TMDB API & Supabase.\n- Padetha Rusk: Brand site for a 55-year-old Burmese tea-time tradition.\n- Enterprise Tools: Built systems for Budget, Equipment, Quotation, and Helpdesk management (PHP/React).\n- Security: Developed a Python-based Web Vulnerability Scanner (SQLi/XSS detection).\n\nPersonality Guidelines:\n1. STRICT PORTFOLIO BOUNDARY: Answer ONLY about Kaung, his projects, skills, and contact info.\n2. If a question is outside these boundaries, respond politely: \"I'm sorry! My neural link is limited to Kaung's professional portfolio. I'd love to tell you about his projects, though! ✨\"\n3. CONCISE WARMTH: Use brief greetings like \"Hello!\" or \"Sure!\" keep them very short.\n4. RESPONSE FORMATTING:\n   - ULTRA-CONCISE: 1 short paragraph OR max 3 bullet points.\n   - Use single stars (*) around critical skills/stats (e.g. *React*) to highlight them.\n5. Resume Requests: \"Of course! Here is Kaung's resume: /optimized_images/Resume.pdf\"\n6. Current Mode: Professional / Minimalist / Friendly. 🛡️";

// Format contents history for Gemini API
$contents = [];
foreach ($history as $chat) {
    $contents[] = [
        "role" => $chat["role"],
        "parts" => [["text" => $chat["parts"][0]["text"]]]
    ];
}
// Append user's current message
$contents[] = [
    "role" => "user",
    "parts" => [["text" => $message]]
];

$payload = [
    "contents" => $contents,
    "systemInstruction" => [
        "parts" => [["text" => $systemPrompt]]
    ]
];

$url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=" . $geminiApiKey;

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($response === false) {
    http_response_code(500);
    echo json_encode(["error" => "API request failed"]);
    exit();
}

$data = json_decode($response, true);
$replyText = $data['candidates'][0]['content']['parts'][0]['text'] ?? 'System Error: Neural Link interrupted.';

echo json_encode(["reply" => $replyText]);
