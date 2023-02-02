import { formatDistanceToNow } from 'date-fns';
import { parseISO } from 'date-fns/esm';
import React from 'react';

function TimeAgo({ timeStamp }) {
  let timeAgo = '';

  if (timeStamp) {
    const date = parseISO(timeStamp);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = ` ${timePeriod} ago`;
  }
  return <span>{timeAgo}</span>;
}

export default TimeAgo;
