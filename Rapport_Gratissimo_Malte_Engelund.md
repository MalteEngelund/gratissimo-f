### Gratissimo

af Malte Engelund
<br><br>
hold: h1we080125
<br><br>
login til API:
* email: info@webudvikler.dk
* password: password
<br><br>

## Vurdering af egen indsats:

Jeg er ikke helt tilfreds med min egen indsats eller det endelige resultat. <br>
Jeg har fået siden til at matche looket på designet nogenlunde. Funktionaliteten har jeg dog ikke ramt særligt godt. <br>
Jeg er løbet ind i en del flere problemer end jeg havde håbet på, og har ikke løst mange af problemerne. <br>
Jeg har måtte sætte mange ting til side, for at nå et nogenlunde funktionelt resultat. <br>
Søgefunktionen på forsiden er blevet flyttet til alle jobs-siden. <br>

Der er en liste over fejl og mangler til sidst i rapporten. <br>




<br>
<br>
<br>

## Redegørelse for kodeelementer
* React hook form til validering af forms
* React cookie til at sætte og hente cookies
* Tailwind

## Fremhævelse af eventuelle særlige punkter til bedømmelse:
* Login
* Routing


## Tidsplan
### mandag:
Jeg har brugt mandag på at opsætte og strukturere projektet, og generelt bare fået et overblik over hvordan jeg vil gribe projektet an. Jeg har sat router, pages, layouts, footer og header op på siden.


### tirsdag:
Jeg har brugt tirsdag på at lave det meste af forsiden, nyhedssiden og jeg er startet på searchPage. forsiden mangler stadig søgefunktionaliteten, men ellers er den stort set færdig.
<br>
Jeg har lavet mange af de cardcomponent som går igen på hjemmesiden.
<br>
Jeg brugte en del tid på at gennemskue, hvordan søgefunktionalitet bedst kan laves. Jeg endte med at sætte det lidt til side, for at prioritere de andre ting på forsiden.  


### onsdag:
Jeg har brugt onsdag på at lave login, mine annoncer tabben i myPage og opret annonce siden. Jeg er dog løbet ind i en del problemer med post til annoncer. 
<br>
Jeg får en fejl fra API'et med region/regionId, som jeg stadig ikke har gennemskuet. Efter lang tids fejlsøgning uden held, måtte jeg gå videre til andre ting.



### torsdag:
Jeg har brugt torsdag lave en kategori, 404, og rediger bruger-side. <br>
Jeg har gjort det meste af siden responssiv og finjusteret noget CSS.
<br>

Jeg har udover det brugt det meste af dagen på at fikse ting med post, mest forgæves.

### fredag:
Færdiggøre rapport, finjustere CSS, tilføjet pagination. Jeg har fikset småting på siden. 
<br>


## obs
Der skal oprettes en .env-fil som skal indeholde: VITE_PUBLIC_BASE_URL=http://localhost:4000
<br>
## Fejl og mangler:
* forsiden har ikke en søge funktion som navigere til searchPage med søgekriterier. Jeg har tilføjet en knap som bare videresender brugen til søgesiden.
* Kategori sender brugeren til en kategori side hvor man kan søge i den specifikke kategori i stedet.
* filtrering på search mangler
* Opret/rediger annonce virker ikke
* gem-knappen skifter ikke til "fjern" når man gemmer, det er kun muligt at fjerne annoncer på min-side
* Brugeren får ikke feedback når en favorit slettes fra min-side (og API'et giver en fejl, men favoritten bliver slettet. Man skal refresh for at opdatere)
* Generelt er feedback til brugeren, når der skal postes til API mangelfuld.
* Rediger Bruger virker ikke.
