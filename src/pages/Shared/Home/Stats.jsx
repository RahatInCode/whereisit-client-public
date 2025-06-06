
import {
  UserGroupIcon,
  CheckBadgeIcon,
  StarIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const Stats = () => {
  return (
    <section className="py-10 bg-emerald-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Trusted By Thousands</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gray-50 rounded-2xl shadow-md p-6">
            <div className="flex justify-center mb-4">
              <UserGroupIcon className="h-10 w-10 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700">10,000+</h3>
            <p className="text-sm text-gray-500">Active Users</p>
          </div>

          <div className="bg-gray-50 rounded-2xl shadow-md p-6">
            <div className="flex justify-center mb-4">
              <CheckBadgeIcon className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700">5,000+</h3>
            <p className="text-sm text-gray-500">Items Recovered</p>
          </div>

          <div className="bg-gray-50 rounded-2xl shadow-md p-6">
            <div className="flex justify-center mb-4">
              <StarIcon className="h-10 w-10 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700">4.9 / 5</h3>
            <p className="text-sm text-gray-500">User Rating</p>
          </div>

          <div className="bg-gray-50 rounded-2xl shadow-md p-6">
            <div className="flex justify-center mb-4">
              <ChartBarIcon className="h-10 w-10 text-orange-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700">95%</h3>
            <p className="text-sm text-gray-500">Success Rate</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
