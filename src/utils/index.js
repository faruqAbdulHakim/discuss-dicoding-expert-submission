const formatDate = (dateString) => new Date(dateString).toLocaleDateString('id-ID', {
  weekday: 'long',
  day: '2-digit',
  month: 'long',
  year: 'numeric',
});

// eslint-disable-next-line import/prefer-default-export
export { formatDate };
