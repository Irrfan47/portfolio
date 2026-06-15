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

// ⚠️ Load Resend API Key from environment or hardcode it securely on the server
// You can define this in your aaPanel environment or replace it here directly
$resendApiKey = getenv('RESEND_API_KEY') ?: 're_HCSxqDr9_6t2uPUYWhGt5f7NV3umJiGXh';

$payload = [
    "from" => "Portfolio Contact <onboarding@resend.dev>", // Or your verified domain email
    "to" => "kaungkhant12359@gmail.com", // Your personal email to receive notifications
    "reply_to" => "$name <$email>",
    "subject" => $subject,
    "html" => "
        <h3>New Message from Portfolio Website</h3>
        <p><strong>Name:</strong> " . htmlspecialchars($name) . "</p>
        <p><strong>Email:</strong> " . htmlspecialchars($email) . "</p>
        <p><strong>Subject:</strong> " . htmlspecialchars($subject) . "</p>
        <p><strong>Message:</strong></p>
        <p>" . nl2br(htmlspecialchars($message)) . "</p>
    "
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
