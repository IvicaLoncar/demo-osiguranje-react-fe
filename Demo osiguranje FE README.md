# Opis funkcionalnosti Demo osiguranje react FE 

## Tehnologije

Koriste se:
- react
- react-redux  
- react-router 
- primereact   -> kompnente
- primeflex    -> layout/stilovi komponenti
- axios        -> pristup preko REST na BFF server

## Implementirano

Unutar demo projekta implementirano je:
- menu - pokretanje dijelova aplikacije, pozicioniran s lijeve strane
- header i footer pozicionirani na vrh i dno, trenutno prazno ali moguće je dodavati sadržaj po potrebi
- prilagođavanje različitim rezolucijama dijelova web aplikacije (npr. kad se promijeni zoom)
- prikaz podataka za tri pojednostavljena slučaja (vrste osiguranja, klijenti, police)
- prikaz u obliku tablice (prilagođava se visini web aplikacije)
- dohvat podataka na zahtjev (ikona povećala)
- korištenje filtera za dohvat samo željenih podataka, npr. naziv klijenta
- dohvat manje količine podataka (data pagging)
- blokiranje UI i prikaz spinner kontrole kad se događa nešto što duže traje
- brisanje preko ikone u tablici 
- otvaranje message box-a koji pita treba li brisati slog
- otvaranje komponente za detaljni pregled sloga ili kod dodavanja novog sloga (viewer)
- spremanje novog sloga preko ikone diskete
- u slučaju greške u podacima iskočiti će poruke što je pogrešno, npr. nije upisan naziv klijenta
- mogućnost slanja poruka i kad se ne dogodi greška, npr. poruka o uspješnom spremanju podataka
- korištenje raznih kontrola za prikaz podataka, npr. text, brojevi, odabir ponuđene vrijednosti
- korištenje react redux data store za pohranu podataka
- dohvat podataka preko axios bibilioteke i ovisno o statusu, spremanje u react redux
- dohvat tzv. list-of-values (LOV) podataka u react redux tj. šifrarnika koji se često prikazuju unutar neke kontrole za odabir npr. dropdown kontrole
- korištenje primereact tema
- korištenje flex i grid za layout kontrola u web aplikaciji


## U postupku implementacije

U postupku:
- posebna komponenta za pretraživanje većih količina podataka koji nisu prikladni za dohvat odjednom, npr. za traženje klijenta
