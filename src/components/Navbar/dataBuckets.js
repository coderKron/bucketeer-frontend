import { FiFileText } from 'react-icons/fi';
import { GiHighKick } from 'react-icons/gi';
import { BsBucket } from 'react-icons/bs';
import { FaUserFriends } from 'react-icons/fa';
import { GiBeachBucket } from 'react-icons/gi';

export const itemsBuckets = [
  {
    title: 'Buckets List',
    description:
      "Have a look at all your buckets! They're listed so that you can search through them quick.",
    href: 'buckets',
    icon: BsBucket,
  },
  {
    title: 'Create Buckets',
    description:
      'Create, edit, delete and add Buckets to your inventory. To which you can add your kicks!',
    href: 'buckets/create',
    icon: GiBeachBucket,
  },
];
