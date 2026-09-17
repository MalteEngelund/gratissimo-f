// toLocaleDateString mm. virkede ikke 
// https://stackoverflow.com/questions/2388115/get-locale-short-date-format-using-javascript


export function useDanishDate(dateString) {
    return new Intl.DateTimeFormat("da-DK", {
      
    }).format(new Date(dateString));
  }