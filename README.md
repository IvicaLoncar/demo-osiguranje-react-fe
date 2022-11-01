# Opis funkcionalnosti Demo osiguranje react FE 

## Programirano u 

Visual Studio Code

## Kratki opis

Demo služi za demonstraciju poslovne aplikacije koja u pozadini ima bazu podataka, koriste se standardni pregledi podataka, tablični i pregled pojedinačnog sloga, te osnovne operacije nad podacima (pregled, dodavanje, promjena i brisanje).

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
- posebna komponenta za pretraživanje većih količina podataka koji nisu prikladni za dohvat odjednom, npr. za traženje klijenta


## U postupku implementacije

U postupku:
- update polica ne radi, problem je u BFF kojeg treba doraditi


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
