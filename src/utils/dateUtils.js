const formatDate = (dateString, withTime) => {
    const date = new Date(dateString);

    let options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    if(withTime) {
      options = { ...options, hour: '2-digit', minute: '2-digit', second: '2-digit' };
    }
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }
  
export { formatDate };