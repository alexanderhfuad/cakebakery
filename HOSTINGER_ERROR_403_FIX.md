# Analisis dan Solusi Error 403 Hostinger

## 🔍 Diagnosis Error 403

Error 403 = **Forbidden Access** - Server menerima request tapi menolak akses. Bukan server down (502/503).

---

## 📊 Kemungkinan Penyebab & Solusi

### 1️⃣ **ROUTING & ENTRY POINT (90% kemungkinan)**

**Gejala:** Browser menampilkan error 403 saat mengakses domain

**Penyebab:**
- Frontend build files tidak tersimpan di `public_html`
- Tidak ada `index.html` di root public_html
- Backend tidak running/accessible

**Solusi:**

```bash
# Step 1: Build frontend
npm run build --workspace=frontend

# Step 2: Struktur yang benar di Hostinger public_html
public_html/
├── index.html          # ⭐ PENTING! Buat file index.html yang mengarahkan ke frontend
├── app.js              # Backend Express server (jika menggunakan Node.js hosting)
├── dist/               # Frontend build output (Vite)
│   ├── index.html
│   ├── assets/
│   └── ...
├── .env                # Environment variables
├── node_modules/       # (hanya jika diupload)
└── package.json
```

**File `public_html/index.html` untuk SPA (Single Page App):**
```html
<!DOCTYPE html>
<html>
  <head>
    <title>Brielicious Bakery</title>
  </head>
  <body>
    <div id="app"></div>
    <!-- Redirect semua request ke frontend app -->
    <script>
      window.location.href = '/dist/index.html';
    </script>
  </body>
</html>
```

---

### 2️⃣ **FILE PERMISSIONS (15% kemungkinan)**

**Gejala:** File diunggah tapi 403 pada beberapa file/folder

**Solusi - Set permissions via Hostinger cPanel:**

```
Folder (directories):    755
File (files):            644
Sensitive files (.env):  600
```

**Cara di cPanel:**
1. Masuk cPanel → File Manager
2. Klik kanan folder → Change Permissions
3. Set ke **755**
4. Apply to All Files & Folders

**Via SSH (jika available):**
```bash
cd ~/public_html
chmod -R 755 .
chmod 644 *.html
chmod 600 .env
```

---

### 3️⃣ **DNS & A RECORD (10% kemungkinan)**

**Gejala:** Domain tidak loading sama sekali atau menunjuk ke server lain

**Check DNS:**
```bash
nslookup yourdomain.com
# atau
dig yourdomain.com

# Expected output:
# yourdomain.com A 123.45.67.89 (IP Hostinger Anda)
```

**Solusi:**
1. Masuk Hostinger Dashboard → Domains → Your Domain
2. Lihat "A Record" value
3. Sesuaikan dengan IP server Hostinger
4. Tunggu 24 jam untuk DNS propagation

---

### 4️⃣ **.HTACCESS CONFIGURATION (10% kemungkinan)**

**Gejala:** React routing tidak bekerja (page blank saat refresh/direct URL)

**Solusi - Buat `.htaccess` di `public_html`:**

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Cegah rewrite untuk file/folder yang exists
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d

  # Route semua ke dist/index.html untuk SPA
  RewriteRule ^(.*)$ /dist/index.html [L]
</IfModule>

# Optional: Redirect HTTP ke HTTPS
<IfModule mod_ssl.c>
  RewriteEngine On
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
</IfModule>

# Optional: Disable directory listing
<IfModule mod_autoindex.c>
  Options -Indexes
</IfModule>
```

---

### 5️⃣ **BACKEND API ROUTING (jika ada)**

**Setup untuk Express Backend di Hostinger:**

**File `app.js` di public_html:**
```javascript
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Serve frontend static files
app.use(express.static(path.join(__dirname, 'dist')));

// API routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.post('/api/contact', async (req, res) => {
  const { name, email, phone, message } = req.body;
  // ... handle contact form
});

// SPA fallback - serve index.html untuk semua route yang tidak match
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

## 🚀 Checklist Deployment Hostinger

- [ ] **Build frontend:** `npm run build --workspace=frontend`
- [ ] **Upload ke public_html:**
  - [ ] `dist/` folder (output dari Vite)
  - [ ] `.env` file dengan credentials
  - [ ] Backend files (`app.js`, `package.json`, dll)
  - [ ] `.htaccess` (jika menggunakan Apache)
  
- [ ] **Set Permissions:**
  - [ ] Folder: 755
  - [ ] Files: 644
  - [ ] .env: 600

- [ ] **Verify DNS:**
  - [ ] A Record menunjuk ke IP Hostinger
  - [ ] Domain sudah propagate (ping domain)

- [ ] **Check Backend:**
  - [ ] Node.js add-on aktif (jika menggunakan backend)
  - [ ] Environment variables terconfigurasi
  - [ ] API endpoints accessible

- [ ] **Browser Testing:**
  - [ ] Clear cache: Ctrl+Shift+Delete
  - [ ] Test direct URL access
  - [ ] Check browser console untuk errors

---

## 🔧 Troubleshooting Commands

```bash
# SSH ke server Hostinger
ssh user@yourdomain.com

# Check structure
ls -la ~/public_html

# View error logs
tail -f /var/log/apache2/error.log
tail -f /var/log/apache2/access.log

# Test Node.js
node --version
npm --version

# Check port availability
netstat -tuln | grep 3001
```

---

## 📝 Error 403 Specific Cases

| Kasus | Gejala | Solusi |
|-------|--------|--------|
| **Index.html missing** | Blank page, 403 | Upload frontend build ke `dist/` |
| **Wrong permissions** | 403 pada file tertentu | `chmod 755 folder`, `chmod 644 files` |
| **DNS salah** | Connection refused / timeout | Update A Record ke IP Hostinger |
| **API routing | 403 pada `/api/*` routes | Setup `.htaccess` atau gunakan Node.js backend |
| **Malware** | Random 403 atau redirect | Scan dengan antivirus, check `.htaccess` |

---

## ✅ Verifikasi Sukses Deployment

1. **Homepage loading**: Domain menampilkan website ✓
2. **Navigation bekerja**: Click routes tidak error ✓
3. **API responsive**: Contact form bisa submit ✓
4. **HTTPS working**: Padlock icon di URL bar ✓
5. **Assets loaded**: CSS/JS/Images tampil ✓

Jika masih ada error, cek **Hostinger Dashboard → Logs** untuk detail error message.
