const form = document.getElementById('form');
const input = document.getElementById('password');
const result = document.getElementById('result');
const bar = document.getElementById('bar');
const tip = document.getElementById('tip');

// To parametere: passordet og minste lengde.
function checkPassword(password, minLength) {
  // string: password, number: score, boolean: hasNumber.
  let score = 0;
  let hasNumber = false;
  let hasSymbol = false;

  // for sjekker hvert tegn. includes() betyr «inneholder».
  for (let i = 0; i < password.length; i++) {
    if ('0123456789'.includes(password[i])) {
      hasNumber = true;
    }
  }

  // while leter etter et spesialtegn og stopper når det er funnet.
  let i = 0;
  while (i < password.length && !hasSymbol) {
    if ('!@#$%&*+-=?'.includes(password[i])) {
      hasSymbol = true;
    }
    i++;
  }

  // match() leter etter store eller små bokstaver.
  let hasUpper = password.match(/[A-ZÆØÅ]/) !== null;
  let hasLower = password.match(/[a-zæøå]/) !== null;

  // = og += gir en verdi. >= sammenligner. && betyr «og».
  if (password.length >= minLength) {
    score += 20;
  }
  if (password.length >= 16) {
    score += 20;
  }
  if (hasUpper && hasLower) {
    score += 20;
  }
  if (hasNumber) {
    score += 20;
  }
  if (hasSymbol) {
    score += 20;
  }

  let lower = password.toLowerCase();
  let common = lower.includes('password') || lower.includes('passord');
  // || betyr «eller». Korte eller vanlige passord får maks 40.
  if ((password.length < minLength || common) && score > 40) {
    score = 40;
  }

  // Første valgtype: if / else if / else velger nivået.
  let level;
  if (password.length === 0) {
    level = 'Tomt felt';
  } else if (score < 60) {
    level = 'Lav poengsum';
  } else if (score < 80) {
    level = 'Middels poengsum';
  } else {
    level = 'Høy poengsum';
  }

  // Andre valgtype: switch velger fargen.
  let color;
  switch (level) {
    case 'Lav poengsum':
      color = 'red';
      break;
    case 'Middels poengsum':
      color = 'orange';
      break;
    case 'Høy poengsum':
      color = 'green';
      break;
    default:
      color = 'gray';
  }

  result.textContent = level + ': ' + score + ' av 100 poeng';
  tip.textContent = 'Se listen under for å få flere poeng. Høy poengsum garanterer ikke sikkerhet.';
  if (password.length === 0) {
    tip.textContent = 'Skriv et testpassord først.';
  } else if (common) {
    tip.textContent = 'Unngå ordene password og passord.';
  } else if (password.length < 16) {
    tip.textContent = 'Prøv å bruke minst 16 tegn.';
  }

  // Endrer CSS når brukeren sjekker passordet.
  bar.style.width = score + '%';
  bar.style.backgroundColor = color;
  document.getElementById('meter').setAttribute('aria-valuenow', score);
}

form.addEventListener('submit', function (event) {
  event.preventDefault(); // Hindrer at siden lastes på nytt.
  checkPassword(input.value, 12);
});
