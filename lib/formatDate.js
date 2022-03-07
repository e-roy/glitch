function formatDate(dateStr) {
  const date = new Date(dateStr);
  if (dateStr) {
    return Intl.DateTimeFormat("en-US", {
      dateStyle: "long",
      timeStyle: "short",
    }).format(date);
  } else return;
}

function cardFormatDate(dateStr) {
  const date = new Date(dateStr);
  if (dateStr) {
    return Intl.DateTimeFormat("en-US", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(date);
  } else return;
}

function bannerFormatDate(dateStr) {
  const date = new Date(dateStr);
  if (dateStr) {
    return Intl.DateTimeFormat("en-US", {
      dateStyle: "long",
    }).format(date);
  } else return;
}

export { formatDate, cardFormatDate, bannerFormatDate };
