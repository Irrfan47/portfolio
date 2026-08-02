<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

// Handle CORS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
    exit();
}

$input = json_decode(file_get_contents('php://input'), true);

$name = $input['name'] ?? '';
$email = $input['email'] ?? '';
$subject = $input['subject'] ?? 'New Contact Form Submission';
$message = $input['message'] ?? '';

if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(["error" => "Required fields are missing."]);
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

$resendApiKey = getenv('RESEND_API_KEY');

$payload = [
    "to" => "kaungkhant12359@gmail.com",
    "reply_to" => "$name <$email>",
    "template" => [
        "id" => "05744e3e-c8f3-47ad-afe0-9de2dba890c4",
        "variables" => [
            "name" => $name,
            "email" => $email,
            "subject" => $subject,
            "message" => $message
        ]
    ]
];

$ch = curl_init('https://api.resend.com/emails');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // Bypass local SSL certificate verification issues
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Authorization: Bearer ' . $resendApiKey
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

if ($response === false) {
    http_response_code(500);
    echo json_encode(["error" => "CURL Error: " . $curlError]);
    exit();
}

if ($httpCode >= 200 && $httpCode < 300) {
    echo json_encode(["success" => true, "message" => "Email sent successfully"]);
} else {
    http_response_code($httpCode);
    echo json_encode([
        "error" => "Failed to send email through Resend API",
        "http_code" => $httpCode,
        "details" => json_decode($response, true) ?: $response
    ]);
}
