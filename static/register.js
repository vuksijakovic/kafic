
document.addEventListener('DOMContentLoaded', () => {
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

    document.getElementById('registruj').addEventListener('submit', event => {
        event.preventDefault();
        var korisnickoIme = document.getElementById('username').value;
        var sifra = document.getElementById('password').value;
        var tip = document.getElementById('role').value;
      
        if (korisnickoIme === "") {
          alert("Unesi korisničko ime");
          return;
        }
      
        if (sifra.length < 8) {
          alert("Lozinka mora biti duža od 8 karaktera");
          return;
        }
      
        // Proveri postoji li korisnik s istim korisničkim imenom
        fetch(`/korisnik/${korisnickoIme}`)
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            if (data.postoji) {
              alert("Korisničko ime je zauzeto");
            } else {
              // Ako korisničko ime nije zauzeto, dodaj novog korisnika
              return fetch('/dodaj-korisnika', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  korisnickoIme,
                  sifra,
                  tip,
                }),
              });
            }
          })
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            // Ovde možete rukovati odgovorom nakon dodavanja korisnika
            console.log(data);
            window.location.href="index.html";
            alert("Uspešno dodat novi korisnik!");
          })
          .catch(error => {
            console.error('Fetch error:', error);
          });
      });
      
});