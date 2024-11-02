const formatDateAndTime = (date = Date.now()) => {
    const newDate = new Date(date);

    const formattedTime = newDate.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
    });

    const formattedDate = (() => {
        const day = newDate.getDate();
        const month = newDate.toLocaleDateString("en-GB", { month: "long" });
        const year = newDate.getFullYear();
      
        const ordinalSuffix = 
            day % 10 === 1 && day !== 11 ? "st" :
            day % 10 === 2 && day !== 12 ? "nd" :
            day % 10 === 3 && day !== 13 ? "rd" : "th";
      
        return `${day}${ordinalSuffix} ${month}, ${year}`;
    })();

    return {
        date: formattedDate,
        time: formattedTime
    };
};

export default formatDateAndTime;
