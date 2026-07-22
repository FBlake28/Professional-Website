'use strict';

document.getElementById('year').textContent = new Date().getFullYear();

(function initNavToggle() {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('primary-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', function () {
    var isOpen = nav.classList.toggle('primary-nav--open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close the mobile menu after a nav link is activated, and move focus to
  // the target section so keyboard/screen-reader users land where they jump.
  nav.addEventListener('click', function (event) {
    var link = event.target.closest('a[href^="#"]');
    if (!link) return;

    nav.classList.remove('primary-nav--open');
    toggle.setAttribute('aria-expanded', 'false');

    var target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.setAttribute('tabindex', '-1');
      target.addEventListener('blur', function onBlur() {
        target.removeAttribute('tabindex');
        target.removeEventListener('blur', onBlur);
      });
      // Let the smooth-scroll (CSS scroll-behavior) start before moving focus.
      window.requestAnimationFrame(function () {
        target.focus({ preventScroll: true });
      });
    }
  });
})();

(function initResumeViewer() {
  var details = document.querySelector('.resume-viewer');
  if (!details) return;

  var closeButton = details.querySelector('.resume-viewer__close');
  var summary = details.querySelector('summary');

  details.addEventListener('toggle', function () {
    document.body.classList.toggle('resume-panel-open', details.open);
  });

  if (closeButton) {
    closeButton.addEventListener('click', function () {
      details.open = false;
    });
  }

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && details.open) {
      details.open = false;
      if (summary) summary.focus();
    }
  });
})();

(function initContactForm() {
  var FORMSPREE_ENDPOINT = 'https://formspree.io/f/mdaqdble';

  var form = document.getElementById('contact-form');
  if (!form) return;

  var status = document.getElementById('contact-form-status');
  var fields = ['name', 'email', 'message'];

  function setFieldError(input, message) {
    var errorEl = document.getElementById(input.id + '-error');
    if (errorEl) errorEl.textContent = message;
    input.classList.toggle('has-error', Boolean(message));
    if (message) {
      input.setAttribute('aria-invalid', 'true');
    } else {
      input.removeAttribute('aria-invalid');
    }
  }

  function validate() {
    var valid = true;
    fields.forEach(function (name) {
      var input = form.elements[name];
      if (input.checkValidity()) {
        setFieldError(input, '');
        return;
      }
      valid = false;
      if (input.validity.valueMissing) {
        setFieldError(input, 'This field is required.');
      } else if (input.validity.typeMismatch) {
        setFieldError(input, 'Enter a valid email address.');
      } else {
        setFieldError(input, 'Please check this field.');
      }
    });
    return valid;
  }

  function setStatus(message, kind) {
    status.textContent = message;
    status.classList.remove('form-status--success', 'form-status--error');
    if (kind) {
      status.classList.add('form-status--' + kind);
    }
  }

  form.addEventListener('input', function (event) {
    if (fields.indexOf(event.target.name) === -1) return;
    if (event.target.checkValidity()) {
      setFieldError(event.target, '');
    }
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    if (!validate()) {
      setStatus('Please fix the highlighted fields before submitting.', 'error');
      return;
    }

    var submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    setStatus('Sending…');

    fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(form)
    })
      .then(function (response) {
        if (response.ok) {
          setStatus("Thanks — your message has been sent. I'll get back to you soon.", 'success');
          form.reset();
          return;
        }
        return response.json().then(function (data) {
          var message = data && data.errors && data.errors.length
            ? data.errors.map(function (e) { return e.message; }).join(' ')
            : 'Something went wrong sending your message. Please try again.';
          throw new Error(message);
        });
      })
      .catch(function (err) {
        var message = err instanceof TypeError
          ? "Couldn't reach the server. Please check your connection and try again — your message hasn't been lost."
          : (err.message || 'Something went wrong sending your message. Please try again.');
        setStatus(message, 'error');
      })
      .finally(function () {
        submitButton.disabled = false;
      });
  });
})();
