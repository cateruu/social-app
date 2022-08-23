import { Timestamp } from 'firebase/firestore';

export const postCreationTime = (timestamp: Timestamp) => {
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const date = timestamp.toDate();

  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  const hour = date.getHours();
  const minutes = date.getMinutes();

  return `${hour}:${minutes} ${month} ${day}, ${year}`;
};
