#  Mensa Uni Halle Telegram Bot 


A bot to display the canteen menu via a telegram bot




### How it works

It uses the nice telegram bot js framework `telegraf.js` https://github.com/telegraf/telegraf


To get the actual menu data it uses `axios` https://github.com/axios/axios to make the request and get the html of the menu site

Then the html is parsed via `xmldom` https://github.com/jindw/xmldom and post-processed via `html-entities` https://github.com/mdevils/node-html-entities (to get the \&euro; to €)

After that we have a dom and can use `xpath` https://github.com/goto100/xpath to execute xpath on that dom  
However I needed to change `xpath` because it was not working (took me quite some time to recognize this) with the html dom created by `xmldom`, see https://github.com/janisdd/xpath for changes


To store the days to add a plain js object is used (see `inMemorySessionStorage.ts`) 



### Command list

```text
m - gibt das Menü von heute zurück
m1 - gibt das Menü von morgen zurück
m2 - gibt das Menü in 2 Tagen zurück
m3 - gibt das Menü in 3 Tagen zurück
abbrechen - bricht einen der /m Befehle ab
about - zeigt about daten an
help - zeigt die Hilfe an
```


To add this to the bot

- goto botfather
- `/setcommands`

and enter the above list



## Project structure

- `constants` - some constants
- `enums` - important values (canteens)
- `helper` - some helpers
- `inMemorySessionStorage` - used to store data per chat & user
- `main` - main entry point, bot with commands is set up here  
- `mensaDataHelper` - helper for canteen data related stuff (http request and xpath are done here) 
- `types` - some global types
  - other types are kept close to where they are used



## Run locally

You need to have the typescript compiler (tsc) installed globally

then do
```bash
tsc -w
```

this will compile and watch the files for changes

run the main file

```bash
node dist/main.js
```
