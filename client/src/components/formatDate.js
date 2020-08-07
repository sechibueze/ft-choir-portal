export default function (scrappyDate) {
  let day, _day, month, _month, year
   let date = new Date(scrappyDate);
   _day = date.getDate()
   _month = date.getMonth() + 1 
   year = date.getFullYear()

   day = _day < 10 ? `0${_day}` : _day
   month = _month < 10 ? `0${_month}` : _month

  return `${day}-${month}-${year}`
}