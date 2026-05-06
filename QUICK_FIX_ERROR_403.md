# HOSTINGER DEPLOYMENT - QUICK START GUIDE

## 🎯 Solusi Cepat Error 403

### Error 403 Anda kemungkinan karena **file/folder missing atau permissions salah**.

---

## 5 LANGKAH PERBAIKAN (Selesai 15 menit)

### 1️⃣ REBUILD & DOWNLOAD

```bash
# Di local machine Anda
cd brieliciousbakery

# Build frontend
npm run build --workspace=frontend

# Sekarang Anda punya:
# - frontend/dist/   ← files ini yang upload ke server
```

### 2️⃣ STRUKTUR FOLDER DI HOSTINGER (public_html)

Pastikan struktur folder di **Hostinger cPanel → File Manager → public_html** seperti ini:

```
public_html/
├── .htaccess                ← Copy dari project root
├── index.html               ← Buat file baru (lihat kode di bawah)
├── dist/                    ← Upload frontend/dist/ folder
│   ├── index.html
│   ├── assets/
│   └── ...
└── [OPTIONAL] app.js        ← Jika mau pake backend Express
```

### 3️⃣ BUAT FILE `index.html` DI ROOT (public_html)

Masuk **Hostinger cPanel → File Manager → public_html**
- Buat file baru: **index.html**
- Copy-paste kode ini:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Brielicious Bakery - Loading...</title>
  <style>
    body { margin: 0; padding: 0; }
  </style>
</head>
<body>
  <!-- Redirect to React app -->
  <script>
    // Jika user akses root, arahkan ke app
    if (window.location.pathname === '/') {
      window.location.href = '/dist/';
    }
  </script>
</body>
</html>
```

### 4️⃣ SET FILE PERMISSIONS

**Di Hostinger cPanel:**

1. **Klik kanan folder `dist/`** → Change Permissions
   - Set ke: **755**
   - ✓ Recursive: Check "Apply to All Files & Folders"

2. **Klik kanan file `.htaccess`** → Change Permissions
   - Set ke: **644**

**Atau via SSH (jika available):**
```bash
cd ~/public_html
chmod -R 755 dist/
chmod 644 .htaccess index.html
chmod 600 .env  # Jika ada file .env
```

### 5️⃣ CLEAR CACHE & TEST

- Buka domain Anda: https://yourdomain.com
- **Ctrl+Shift+Delete** → Clear browser cache
- Hard refresh: **Ctrl+F5** atau **Cmd+Shift+R**
- Jika masih error: Tunggu 5 menit (DNS cache)

---

## 🐛 JIKA MASIH ERROR 403

### Check 1: Verifikasi DNS A Record
```bash
nslookup yourdomain.com
# atau
ping yourdomain.com

# Harusnya menunjuk ke IP Hostinger Anda
```

**Solusi:** Hostinger Dashboard → Domains → Update A Record

### Check 2: Lihat Hostinger Error Logs
**cPanel → File Manager → Logs:**
- `public_html/../logs/access_log`
- `public_html/../logs/error_log`

Cari entry error untuk tahu penyebab pastinya.

### Check 3: Test via SSH
```bash
ssh admin@yourdomain.com

# Verifikasi struktur
ls -la ~/public_html/
ls -la ~/public_html/dist/

# Cek permissions
stat ~/public_html/dist/index.html

# Test curl
curl -I http://localhost/dist/index.html
```

### Check 4: Malware/Hack?
Jika ada file aneh atau `.htaccess` yang tidak Anda buat:
- Hapus file tersebut
- Update password hosting
- Scan file dengan antivirus

---

## 🔐 SECURITY CHECKLIST

- [ ] `.env` file: **TIDAK** di-commit ke git
- [ ] `.env` file permission: **600**
- [ ] `dist/` folder permission: **755**
- [ ] `.htaccess` melindungi `.env`: ✓ (sudah ada di file kami)
- [ ] Tidak ada `node_modules/` di production

---

## ✅ TESTING SETELAH DEPLOY

Buka browser dev tools (**F12**) dan test:

```javascript
// Console tab - cek domain terload
console.log(window.location.origin);
// Harusnya: https://yourdomain.com

// Network tab - cek assets loading
// Harusnya 200 OK untuk:
// - /dist/index.html
// - /dist/assets/*.js
// - /dist/assets/*.css
```

---

## 📱 COMMON ERRORS & FIXES

| Error | Penyebab | Solusi |
|-------|----------|--------|
| **403 Forbidden** | dist/ tidak ada atau permission salah | Upload dist/ & chmod 755 |
| **Blank page** | React app tidak load | Clear cache, cek network tab |
| **API 404** | Backend routes tidak ada | Setup Express app.js atau pakai backend service |
| **Mixed Content** | HTTP → HTTPS issue | .htaccess auto-redirect ke HTTPS |
| **Page blank saat refresh** | React routing salah | `.htaccess` RewriteRule sudah included |

---

## 🆘 JIKA MASIH STUCK

**Get help dengan info ini:**

```bash
# Di local machine
uname -a                              # OS info
node --version                        # Node version
npm --version                         # NPM version
git log --oneline -1                  # Last commit

# Di server (SSH)
cat ~/public_html/.htaccess           # Verify .htaccess
curl -I https://yourdomain.com        # Check response headers
tail -50 /var/log/apache2/error.log   # Error logs
```

---

**💡 TIP:** Jika deployment pertama kali, backup dulu folder public_html lama sebelum upload yang baru.
