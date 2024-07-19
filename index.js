$(document).ready(function () {
  var system = new System(isPhrasalVerbsDB)
    .createCards(isPhrasalVerbsDB.map((x) => { if (x.isPhrasalVerb) { return x.title } }).filter(x => { return (x != undefined) }))
    .info();

  let notExist = [];
  Object.keys(system.db).forEach((key) => {

    if (system.db[key].isPhrasalVerb) {
      if (system.db[key].core) {
        if (system.db[system.db[key].core] == undefined) {
          notExist.push(system.db[key].core);
        }
      }

      system.db[key].meanings.forEach(meaning => {
        meaning.synonyms.forEach(synonym => {

          if (system.db[synonym] == undefined) {
            notExist.push(synonym);
          }

        });
      });
    }

  });

  console.log(notExist.join(', '));

});


function capitalizeFirstLetter(str) {
  if (str.length === 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}