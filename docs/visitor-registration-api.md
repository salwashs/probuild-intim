# Visitor Registration API — ProBuild INTIM 2026

Spesifikasi endpoint untuk pendaftaran visitor ProBuild INTIM 2026.

> **Implementasi:** Endpoint ini tersedia sebagai `POST /api/visitor-rsvp` (alias event `probuild-intim-2026`).  
> Field mengikuti skema admin (`prisma/intim-2026-fields.ts`).

**Base URL (production):** `https://admin.probuildintim.com/api`  
**Base URL (development):** `/api` (proxy Vite → admin)

**Halaman form (static, untuk QR admin):** `/registrasi`  
Set env admin `NUXT_PUBLIC_VISITOR_REGISTER_URL` ke URL penuh halaman ini (mis. `https://probuildintim.com/registrasi`). Satu QR cukup untuk satu event.

---

## Endpoint

### Create registration

```http
POST /visitor-rsvp
Content-Type: application/json
Accept: application/json
```

#### Request body

| Field | Type | Required | Validation | Description |
|---|---|---|---|---|
| `email` | string | yes | valid email; unique per event | Email |
| `fullName` | string | yes | min 3 chars | Nama lengkap |
| `whatsapp` | string | yes | 8–16 digits; unique per event | Nomor WhatsApp |
| `institution` | string | yes | min 2 chars | Nama perusahaan/instansi. Kirim `"umum"` jika visitor umum. |
| `position` | string | no | min 2 chars jika diisi | Jabatan (opsional) |

---

## Example request — visitor dari instansi

```json
{
  "email": "budi@contoh.com",
  "fullName": "Budi Santoso",
  "whatsapp": "085705852676",
  "institution": "PT Contoh Konstruksi",
  "position": "Direktur Utama"
}
```

## Example request — visitor umum

```json
{
  "email": "ani@email.com",
  "fullName": "Ani Wijaya",
  "whatsapp": "081234567890",
  "institution": "umum"
}
```

Pada form: jika visitor memilih "umum", UI mengosongkan nama instansi, tetapi body API mengirim `"institution": "umum"`.

---

## Responses

### 201 Created

```json
{
  "success": true,
  "message": "Konfirmasi kehadiran tercatat.",
  "registrationId": "RSVP-2026-00042"
}
```

Setelah `201`, frontend menampilkan **QR code** berisi string `registrationId` (teks mentah, bukan URL) untuk check-in di pintu acara.

### 422 Unprocessable Entity

```json
{
  "success": false,
  "message": "Validasi gagal",
  "errors": {
    "email": ["Format email tidak valid"],
    "whatsapp": ["Format tidak valid"]
  }
}
```

### 409 Conflict

Email atau WhatsApp sudah terdaftar untuk event yang sama:

```json
{
  "success": false,
  "message": "Konfirmasi untuk email ini sudah tercatat."
}
```

---

## QR & check-in

1. **QR link pendaftaran (admin)** — encode URL statis `/registrasi` (satu kali per event).
2. **QR setelah submit (visitor)** — encode `registrationId` dari response 201.
3. Admin scan QR di halaman Check-in → `POST /api/visitors/check-in` dengan `{ "registrationId": "..." }`.

---

## Backend notes

- Endpoint aktif: `POST /api/visitor-rsvp` — tanpa auth, terikat event `probuild-intim-2026`.
- Alternatif generik: `POST /api/events/probuild-intim-2026/visitors` (body sama).
- `registrationId` unik digenerate otomatis (`RSVP-2026-00001`, …).
- Unique per event: `email`, `whatsapp`.
