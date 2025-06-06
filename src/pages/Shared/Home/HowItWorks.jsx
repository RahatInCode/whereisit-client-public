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
    <section className="bg-emerald-50  py-12 px-6 md:px-12 lg:px-20">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
        <p className="text-gray-600 mb-10">Simple steps to find or return lost items</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <step.icon className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-800">{step.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
