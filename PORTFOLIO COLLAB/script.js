document.addEventListener('DOMContentLoaded', function () {
	const btn = document.getElementById('theme-toggle');
	const body = document.body;

	function applyTheme(theme) {
		if (theme === 'dark') {
			body.classList.add('dark-theme');
			btn.textContent = 'Light';
		} else {
			body.classList.remove('dark-theme');
			btn.textContent = 'Dark';
		}
	}

	// Load saved preference
	const saved = localStorage.getItem('theme');
	applyTheme(saved === 'dark' ? 'dark' : 'light');

	// Toggle on click
	btn.addEventListener('click', function () {
		const isDark = body.classList.toggle('dark-theme');
		localStorage.setItem('theme', isDark ? 'dark' : 'light');
		btn.textContent = isDark ? 'Light' : 'Dark';
	});

	// Simple placeholder used by project View buttons
	window.showAlert = function () {
		alert('Project details coming soon.');
	};

	// Project modal handling
	const modal = document.getElementById('project-modal');
	const modalTitle = document.getElementById('modal-title');
	const modalDesc = document.getElementById('modal-desc');
	const modalClose = modal.querySelector('.modal-close');

	function openModal(title, desc) {
		modalTitle.textContent = title;
		modalDesc.textContent = desc;
		modal.setAttribute('aria-hidden', 'false');
	}

	function closeModal() {
		modal.setAttribute('aria-hidden', 'true');
	}

	modalClose.addEventListener('click', closeModal);
	modal.addEventListener('click', function (e) {
		if (e.target === modal) closeModal();
	});

	document.querySelectorAll('.view-btn').forEach(function (b) {
		b.addEventListener('click', function () {
			const title = b.dataset.title || 'Project';
			const desc = b.dataset.desc || '';
			openModal(title, desc);
		});
	});

	// Contact form: open mail client with prefilled values
	const contactForm = document.getElementById('contact-form');
	if (contactForm) {
		contactForm.addEventListener('submit', function (e) {
			e.preventDefault();
			const form = new FormData(contactForm);
			const name = form.get('name');
			const email = form.get('email');
			const message = form.get('message');
			const subject = encodeURIComponent('Portfolio contact from ' + name);
			const body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + message);
			window.location.href = 'mailto:yourname@email.com?subject=' + subject + '&body=' + body;
		});
	}

	// Back to top button
	const backBtn = document.getElementById('back-to-top');
	window.addEventListener('scroll', function () {
		if (window.scrollY > 300) backBtn.classList.add('show'); else backBtn.classList.remove('show');
	});
	backBtn.addEventListener('click', function () {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	});
});

