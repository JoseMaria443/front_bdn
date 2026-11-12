const form = document.getElementById('login-form');
const errorBox = document.getElementById('form-error');
const submitBtn = document.getElementById('submit-btn');
const passInput = document.getElementById('contrasena');
const toggle = document.getElementById('toggle-pass');

toggle.addEventListener('click', () => {
  const show = passInput.type === 'password';
  passInput.type = show ? 'text' : 'password';
  toggle.textContent = show ? 'Ocultar' : 'Mostrar';
  toggle.setAttribute('aria-label', show ? 'Ocultar contraseña' : 'Mostrar contraseña');
});

function showError(msg) {
  errorBox.textContent = msg;
  errorBox.hidden = false;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  errorBox.hidden = true;

  const identificador = form.identificador.value.trim();
  const contrasena = form.contrasena.value;

  for (const input of [form.identificador, form.contrasena]) {
    input.setAttribute('aria-invalid', String(!input.value.trim()));
  }
  if (!identificador || !contrasena) return showError('Completa todos los campos.');

  submitBtn.disabled = true;
  submitBtn.textContent = 'Ingresando…';

  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identificador, contrasena }),
    });
    const data = await res.json().catch(() => ({}));

    if (!res.ok) return showError(data.error || 'No se pudo iniciar sesión.');

    sessionStorage.setItem('token', data.token);
    window.location.href = '/dashboard';
  } catch {
    showError('No se pudo conectar con el servidor.');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Iniciar sesión';
  }
});
