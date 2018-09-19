let date = new Date();

let datum = {
  // numberOfMonth : date.getDate(),
  // currentDay : date.getDay(),
  // currentMonth : date.getMonth(),
  currentDayNrInMonth: date.getDate(),
  currentDayNrInWeek: date.getDay(),
  currentMonth: date.getMonth() + 1,
  listaWeek: [],
  fullYear: date.getFullYear(),
  newCurrentMonth:false,

}


function dagensDatum(dayInWeek, dayInMonth, currentMonth) {

  switch (dayInWeek) {
    case 0:
      return "Söndag " + dayInMonth + "/" + currentMonth;
      break;
    case 1:
      return "Måndag " + dayInMonth + "/" + currentMonth;
      break;
    case 2:
      return "Tisdag " + dayInMonth + "/" + currentMonth;
      break;
    case 3:
      return "Onsdag " + dayInMonth + "/" + currentMonth;
      break;
    case 4:
      return "Torsdag " + dayInMonth + "/" + currentMonth;
      break;
    case 5:
      return "Fredag " + dayInMonth + "/" + currentMonth;
      break;
    case 6:
      return "Lördag " + dayInMonth + "/" + currentMonth;
      break;

    default:

  }
}


function checkDate(day, month, year) {


  if (year % 4 === 0) {
    //ÄR ett skottår dagarna är 366 och februari har 29 dagar
    if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) {

      if (day <= 31) {
        return true;
      } else {
        return false;
      }

    } else if (month === 4 || month === 6 || month === 9 || month === 11) {
      if (day <= 30) {
        return true;

      } else {
        return false
      }
    } else {
      // Det är februari månad och den har 29 dagar
      if (day <= 29) {
        return true
      } else {
        return false;
      }

    }
  } else {
    //Inte ett skottår och året har 365 dagar februari har 28 dagar
    if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) {
      if (day <= 31) {
        return true;
      } else {
        return false;
      }
    } else if (month === 4 || month === 6 || month === 9 || month === 11) {
      if (day <= 30) {
        return true;

      } else {
        return false
      }
    } else {
      // Det är februari månad och den har 28 dagar
      if (day <= 28) {
        return true
      } else {
        return false;
      }

    }

  }
}




function createWeekList(currentDayNrInWeek, currentDayNrInMonth, currentMonth, year) {



  let startNr = currentDayNrInWeek;
  let newMonthDay = 1;
  let newCurrentMonth = currentMonth + 1

  let trueOrFalse = true;

  for (let i = 0; i < 7; i++) {


    var pointer = (i + startNr) % 6;
    if (checkDate(currentDayNrInMonth, currentMonth, year)) {




      if (pointer === 0 && i !== 0) {

        console.log("pointer: " + pointer + " och i= " + i)
        datum.listaWeek.push(dagensDatum(currentDayNrInWeek, currentDayNrInMonth, currentMonth))
        currentDayNrInWeek = 0
        currentDayNrInMonth++

      } else {
                console.log("hej "+i)

        datum.listaWeek.push(dagensDatum(currentDayNrInWeek, currentDayNrInMonth, currentMonth))
        currentDayNrInWeek++
        currentDayNrInMonth++
      }

    } else {

      if(trueOrFalse){
        currentDayNrInWeek = 0

        trueOrFalse = false
      }

      datum.newCurrentMonth = newCurrentMonth

      datum.listaWeek.push(dagensDatum(currentDayNrInWeek, newMonthDay, newCurrentMonth))
      currentDayNrInWeek++
      newMonthDay++
    }

  }

}


let dateVariable = {
  date: date,
  datum: datum,
  dagensDatum: dagensDatum,
  createWeekList: createWeekList,
}

export default dateVariable
