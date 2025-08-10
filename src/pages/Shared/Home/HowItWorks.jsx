import {
  PhotoIcon,
  MagnifyingGlassIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

const steps = [
  {
    title: 'Post Your Item',
    description: 'Create a detailed post about your lost or found item with photos and description',
    icon: PhotoIcon,
  },
  {
    title: 'Search & Match',
    description: 'Browse through posts or get notified when someone posts a matching item',
    icon: MagnifyingGlassIcon,
  },
  {
    title: 'Reunite',
    description: 'Connect safely with the other person and arrange for the return of the item',
    icon: UserGroupIcon,
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-emerald-50 dark:bg-gray-900 py-12 px-6 md:px-12 lg:px-20 transition-colors duration-300">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">How It Works</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-10 transition-colors duration-300">Simple steps to find or return lost items</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <step.icon className="h-12 w-12 text-indigo-600 dark:text-indigo-400 mb-4 transition-colors duration-300" />
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 transition-colors duration-300">{step.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 transition-colors duration-300">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
