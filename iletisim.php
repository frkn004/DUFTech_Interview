<?php
// CORS ayarları
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');

// Yanıt dizisi
$response = array(
  'success' => false,
  'message' => ''
);

// Sadece POST isteklerini kabul et
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  // Form verilerini al ve temizle
  $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
  $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
  $subject = filter_input(INPUT_POST, 'subject', FILTER_SANITIZE_STRING);
  $message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING);
  $privacy = isset($_POST['privacy']) ? true : false;
  
  // Form doğrulama
  if (empty($name)) {
    $response['message'] = 'Lütfen adınızı girin.';
    echo json_encode($response);
    exit;
  }
  
  if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $response['message'] = 'Geçerli bir e-posta adresi girin.';
    echo json_encode($response);
    exit;
  }
  
  if (empty($message)) {
    $response['message'] = 'Lütfen mesajınızı girin.';
    echo json_encode($response);
    exit;
  }
  
  if (!$privacy) {
    $response['message'] = 'Gizlilik politikasını kabul etmelisiniz.';
    echo json_encode($response);
    exit;
  }
  
  // Konu boşsa varsayılan konu ata
  if (empty($subject)) {
    $subject = 'DUFTech Web Sitesi İletişim Formu';
  }
  
  // E-posta ayarları
  $to = 'info@duftech.com'; // Alıcı e-posta
  $headers = "From: $name <$email>\r\n";
  $headers .= "Reply-To: $email\r\n";
  $headers .= "MIME-Version: 1.0\r\n";
  $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
  
  // E-posta içeriği (HTML formatında)
  $email_content = '
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>İletişim Formu Mesajı</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; }
        .header { background-color: #8A2BE2; color: white; padding: 15px; border-radius: 5px 5px 0 0; margin: -20px -20px 20px; text-align: center; }
        .footer { background-color: #f5f5f5; padding: 15px; border-radius: 0 0 5px 5px; margin: 20px -20px -20px; text-align: center; font-size: 12px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #8A2BE2; }
        .value { margin-top: 5px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>Yeni İletişim Formu Mesajı</h2>
        </div>
        
        <div class="field">
          <div class="label">Gönderen:</div>
          <div class="value">' . $name . ' (' . $email . ')</div>
        </div>
        
        <div class="field">
          <div class="label">Konu:</div>
          <div class="value">' . $subject . '</div>
        </div>
        
        <div class="field">
          <div class="label">Mesaj:</div>
          <div class="value">' . nl2br($message) . '</div>
        </div>
        
        <div class="footer">
          Bu e-posta DUFTech web sitesi iletişim formundan gönderilmiştir.
        </div>
      </div>
    </body>
    </html>
  ';
  
  // E-postayı gönder
  if (mail($to, $subject, $email_content, $headers)) {
    // Başarılı
    $response['success'] = true;
    $response['message'] = 'Mesajınız başarıyla gönderildi!';
    
    // Otomatik yanıt gönder
    sendAutoResponse($name, $email);
    
    // Veritabanına kaydet (isteğe bağlı)
    // saveToDatabase($name, $email, $subject, $message);
  } else {
    // Başarısız
    $response['message'] = 'Mesajınız gönderilirken bir hata oluştu.';
  }
} else {
  // POST isteği değilse
  $response['message'] = 'Geçersiz istek.';
}

// JSON yanıt döndür
echo json_encode($response);
exit;

/**
 * Kullanıcıya otomatik yanıt gönderir
 */
function sendAutoResponse($name, $email) {
  $subject = 'DUFTech - Mesajınız Alındı';
  $headers = "From: DUFTech <info@duftech.com>\r\n";
  $headers .= "Reply-To: info@duftech.com\r\n";
  $headers .= "MIME-Version: 1.0\r\n";
  $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
  
  $auto_message = '
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Mesajınız Alındı</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; }
        .header { background: linear-gradient(135deg, #8A2BE2, #9370DB); color: white; padding: 20px; border-radius: 5px 5px 0 0; margin: -20px -20px 20px; text-align: center; }
        .header img { max-width: 150px; margin-bottom: 15px; }
        .content { padding: 0 20px; }
        .button { display: inline-block; background-color: #8A2BE2; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 20px; }
        .footer { background-color: #f5f5f5; padding: 15px; border-radius: 0 0 5px 5px; margin: 20px -20px -20px; text-align: center; font-size: 12px; }
        .social { margin-top: 20px; }
        .social a { margin: 0 10px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="https://duftech.com/images/logo.png" alt="DUFTech Logo">
          <h2>Mesajınız Alındı</h2>
        </div>
        
        <div class="content">
          <p>Sayın ' . $name . ',</p>
          <p>İletişim formu aracılığıyla gönderdiğiniz mesaj başarıyla alınmıştır. En kısa sürede size geri dönüş yapacağız.</p>
          <p>Şirketimiz ve yapay zeka çözümlerimiz hakkında daha fazla bilgi edinmek için web sitemizi ziyaret edebilirsiniz.</p>
          <p><a href="https://duftech.com" class="button">Web Sitemizi Ziyaret Edin</a></p>
          
          <div class="social">
            <p>Bizi sosyal medyada takip edin:</p>
            <a href="https://facebook.com/duftech"><img src="https://duftech.com/images/social/facebook.png" alt="Facebook"></a>
            <a href="https://twitter.com/duftech"><img src="https://duftech.com/images/social/twitter.png" alt="Twitter"></a>
            <a href="https://linkedin.com/company/duftech"><img src="https://duftech.com/images/social/linkedin.png" alt="LinkedIn"></a>
          </div>
        </div>
        
        <div class="footer">
          <p>&copy; ' . date('Y') . ' DUFTech. Tüm Hakları Saklıdır.</p>
          <p>Bu e-posta otomatik yanıt sistemi tarafından gönderilmiştir. Lütfen bu e-postayı yanıtlamayınız.</p>
        </div>
      </div>
    </body>
    </html>
  ';
  
  mail($email, $subject, $auto_message, $headers);
}

/**
 * Form verilerini veritabanına kaydeder
 * Not: Bu fonksiyon sadece örnek olarak eklenmiştir. Kullanmak için veritabanı bağlantısı kurulmalıdır.
 */
function saveToDatabase($name, $email, $subject, $message) {
  /*
  // Veritabanı bağlantısı
  $host = 'localhost';
  $db = 'duftech';
  $user = 'db_user';
  $pass = 'db_password';
  
  try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8mb4", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo->prepare("INSERT INTO contact_messages (name, email, subject, message, created_at) VALUES (?, ?, ?, ?, NOW())");
    $stmt->execute([$name, $email, $subject, $message]);
  } catch (PDOException $e) {
    // Hata durumunda loglama yapılabilir
    error_log("Veritabanı hatası: " . $e->getMessage());
  }
  */
}
?> 