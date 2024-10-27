const formatDateAndTime = (date = Date.now()) => {
    const newDate = new Date(date);
    const formattedTime = newDate.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
    });
    const formattedDate = newDate.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return {
        date: formattedDate,
        time: formattedTime
    };
};

export default formatDateAndTime;