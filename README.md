# ROSE - Fashion E-commerce Website

## Descriere Proiect
ROSE este un magazin online modern de modă, dezvoltat folosind React și alte tehnologii moderne pentru web. Aplicația oferă o experiență de cumpărături completă, intuitivă și responsivă pentru diverse categorii de îmbrăcăminte și accesorii pentru femei, bărbați și copii.

## Tehnologii Utilizate
- React 19
- Vite (pentru build rapid și server de dezvoltare)
- React Router 7
- Framer Motion (pentru animații)
- Tailwind CSS 4 (pentru stilizare)
- Context API (pentru state management)
- LocalStorage (pentru persistența datelor)
- Lucide React (pentru iconițe)
- Chart.js și recharts (pentru vizualizări date în admin)

## Funcționalități Principale

### Navigare și Browsing
- **Pagină principală** cu slideshow principal și navigare către secțiunile Femei, Bărbați și Copii
- **Pagini dedicate** pentru categorii de gen (în cazul în care videoclipurile nu se încarcă corect, dați un refresh paginii, încă nu mi-am dat seama de problemă)
- **Categorii și subcategorii** de produse bine organizate (nu am reușit să adaug foarte multe produse, așa că există o incoerență între poză și titlul produsului. Există și categorii care încă nu sunt populate, dar pentru a vizualiza faptul că am afișat produsele pe pagini, intrați pe meniul din stânga și selectați Femei - VIZUALIZAȚI TOT)
- **Filtrare și căutare** avansată a produselor
- **Responsive design** adaptat pentru dispozitive mobile și desktop

### Autentificare și Profil Utilizator
- **Înregistrare** și **autentificare** utilizator cu validări de formular (pentru că nu am implementat partea de backend, cu orice cont vă veți loga, în pagina Contul meu va apărea detaliile pentru Maria Popescu)
- **Profil utilizator** cu secțiuni pentru:
  - Informații personale (editabile)
  - Istoric comenzi cu detalii și status
  - Metode de plată
  - Setări cont și preferințe
  - Posibilitatea de deconectare și ștergere cont
-**Tipuri de utilizatori**:
  - Utilizator cu cont
  - Guest (momentan are aceleași funcționalități ca cel cu cont, diferența va fi când voi implementa și backend-ul, pentru nu voi reține ce adaugă în coș și la favorite)
  - Admin

### Gestionare Produse
- **Vizualizare detaliată** a produselor cu imagini, descrieri și specificații (pentru a vedea cum arată pagina unui produs, vă rog să intrați pe pagina Femei, primul produs de la Noutăți (Sacou cu două rânduri de nasturi))
- **Selectare mărime și cantitate** cu validări de stoc
- **Adăugare în coș** din pagina de produs sau direct din listare
- **Adăugare la favorite** pentru produsele preferate
- **Afișare produse noi** și populare prin marcaje speciale
- 

### Coșul de Cumpărături
- **Adăugare/eliminare** produse din coș cu dialog de confirmare
- **Modificare cantitate** pentru produse direct din coș
- **Calculare automată** a subtotalului, taxelor și totalului
- **Persistența coșului** între sesiuni pentru utilizatorii autentificați
- **Livrare gratuită** pentru comenzi peste un anumit prag

### Checkout și Comenzi
- **Proces de checkout** în trei pași: date livrare, metodă plată, confirmare
- **Validări de formular** pentru asigurarea datelor complete și corecte
- **Metode multiple de plată**: card și ramburs la livrare
- **Confirmări de comandă** cu generare de număr unic de comandă
- **Istoric comenzi** cu detalii complete și status actualizat
- **Pagină detaliată** pentru fiecare comandă cu timeline de progres

### Lista de Favorite
- **Salvare produse** în lista de favorite prin icon heart
- **Vizualizare și gestionare** produse favorite
- **Adăugare directă** în coșul de cumpărături din lista de favorite
- **Persistența favoritelor** între sesiuni pentru utilizatorii autentificați

### Admin Panel
- **Dashboard** cu indicatori cheie și grafice
- **Gestionare produse** (adăugare, editare, ștergere)
- **Gestionare comenzi** cu posibilitatea de actualizare status
- **Gestionare utilizatori** și permisiuni
- **Setări generale** ale magazinului
- **Conectare admin**: email: administrator@gmail.com
                       parola: admin

### Alte Funcționalități
- **Newsletter** cu validare email și confirmare de înscriere
- **Pagină Contact** pentru asistență clienți
- **Pagini informative** (Termeni și condiții, Politica de confidențialitate, etc.)
- **Protecția proiectului** cu informații despre garanții și siguranța tranzacțiilor
- **Navigare intuitivă** cu breadcrumbs și meniuri organizate logic
- **Performanță optimizată** prin utilizarea Vite pentru build rapid


## Structura Proiectului
- **/src/components** - Componente reutilizabile (Header, Footer, ProductCard, etc.)
- **/src/pages** - Paginile principale ale aplicației
- **/src/context** - Contexte React pentru state management (CartContext, FavoritesContext)
- **/src/assets** - Resurse statice (imagini, fonturi, etc.)
- **/src/data** - Date mock pentru demonstrație (doar pentru copii)

## Instalare și Rulare
1. Clonați repository-ul
   ```bash
   git clone <repository-url>
   cd rose
   ```

2. Instalați dependențele
   ```bash
   npm install
   ```

3. Rulați aplicația în modul dezvoltare
   ```bash
   npm run dev
   ```

4. Accesați aplicația la adresa afișată în terminal (implicit: `http://localhost:5173`)


