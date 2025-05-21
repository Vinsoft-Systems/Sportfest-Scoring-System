export const formatDate = (dateString) => {
  if (!dateString) return '';

  const date = new Date(dateString);

  const dayOfWeek = date.toLocaleString('en-US', { weekday: 'short' });

  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'long' });
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${dayOfWeek}, ${day} ${month} ${year} ${hours}:${minutes}`;
};

export const formatDateNoTime = (dateString) => {
  if (!dateString) return '';

  const date = new Date(dateString);

  const dayOfWeek = date.toLocaleString('en-US', { weekday: 'short' });

  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'long' });
  const year = date.getFullYear();

  return `${dayOfWeek}, ${day} ${month} ${year}`;
};
