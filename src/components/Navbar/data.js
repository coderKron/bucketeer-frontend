import {
  FiBarChart,
  FiFileText,
  FiGrid,
  FiMousePointer,
  FiRepeat,
  FiShield,
} from 'react-icons/fi';
import { GiHighKick } from 'react-icons/gi';
import { BsBucket } from 'react-icons/bs';
import { FaUserFriends } from 'react-icons/fa';

export const items = [
  {
    title: 'Friends',
    description: 'Have a look at what your friends have created!',
    href: '#',
    icon: FaUserFriends,
  },
  {
    title: 'Kicks',
    description: 'Create, edit, delete and add kicks to your inventory.',
    href: '#',
    icon: GiHighKick,
  },
  {
    title: 'Buckets',
    description:
      "Have a look at all your buckets! They're listed so that you can search through them quick.",
    href: '#',
    icon: BsBucket,
  },
  {
    title: 'Travel Blog',
    description:
      "After you've visited your bucket kicks you can mark them as visited. To which you can write a cool story in them!",
    href: '#',
    icon: FiFileText,
  },
];
