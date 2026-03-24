'use strict';

/* ─────────────────────────────────────────────────
   INIT
───────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
    updateTopbarDate();
    setInterval(updateTopbarDate, 60000);

    // ESC đóng modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-overlay.show')
                .forEach(m => closeModal(m.id));
        }
    });
});

/* ─────────────────────────────────────────────────
   NAVIGATION
───────────────────────────────────────────────── */
function showPage(pageId, el) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

    document.getElementById('page-' + pageId)?.classList.add('active');
    el?.classList.add('active');
}

/* ─────────────────────────────────────────────────
   DATE
───────────────────────────────────────────────── */
function updateTopbarDate() {
    const el = document.getElementById('currentDate');
    if (!el) return;
    el.textContent = new Date().toLocaleDateString('vi-VN');
}

/* ─────────────────────────────────────────────────
   MODAL
───────────────────────────────────────────────── */
function openModal(id) {
    document.getElementById(id)?.classList.add('show');
}

function closeModal(id) {
    document.getElementById(id)?.classList.remove('show');
}

/* ─────────────────────────────────────────────────
   CONFIRM
───────────────────────────────────────────────── */
function showConfirm(title, text, onConfirm) {
    if (confirm(title + '\n' + text)) {
        onConfirm && onConfirm();
    }
}

/* ─────────────────────────────────────────────────
   TOAST
───────────────────────────────────────────────── */
function showToast(msg) {
    alert(msg);
}