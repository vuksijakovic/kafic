const showPasswordBtn = document.getElementById('showPassword');
    const passwordInput = document.getElementById('password');

    showPasswordBtn.addEventListener('click', () => {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            showPasswordBtn.textContent = "Sakrij";
        } else {
            passwordInput.type = 'password';
            showPasswordBtn.textContent = "Prikaži";
        }
    });
    document.getElementById('uloguj').addEventListener('submit', event=>{
        event.preventDefault();
        const data = {
            korisnickoIme: document.getElementById('username').value,
            sifra: document.getElementById('password').value,
          };
          
          fetch('/provjera-korisnika', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              // Add any additional headers if needed
            },
            body: JSON.stringify(data),
          })
            .then(response => response.json())
            .then(result => {
              if(result.postoji == true){
              
                localStorage.setItem('id', result.id);
                window.location.href = "preusmjeri.html";
              }
              else {
                alert("Pogresno korisnicko ime ili lozinka");
              }
            })
            .catch(error => {
              console.error('Error:', error);
              
            });
    });