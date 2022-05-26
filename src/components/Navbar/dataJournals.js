import { FiBook } from 'react-icons/fi';
import { IoBookSharp } from 'react-icons/io';
import { BsBucket } from 'react-icons/bs';
import { ImBooks } from 'react-icons/im';
import { IoMdCreate } from 'react-icons/io';

export const itemsJournals = [
  {
    title: 'Personal Journals',
    description: 'Have a look at all the Journals you have created over time.',
    href: 'journal/private',
    icon: FiBook,
  },
  {
    title: 'Public Journals',
    description:
      'All Journals created by everyone that have made them public. Get your inspiration. Read amazing stories.',
    href: 'journal/public',
    icon: ImBooks,
  },
  {
    title: 'Create Journal',
    description:
      "Create your Journals filled with amazing stories. Choose if people can see it in the public list. Or that you'd rather keep it private.",
    href: 'journal/create',
    icon: IoMdCreate,
  },
];
