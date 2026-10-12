<?php
/**
 * Logout Handler - AI ChatBox (NovaAI)
 */
session_start();
$_SESSION = array();
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
    );
}
session_destroy();
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Logging Out...</title>
</head>
<body>
<script>
    localStorage.removeItem('ai_user_logged_in');
    window.location.href = 'login.php';
</script>
</body>
</html>
