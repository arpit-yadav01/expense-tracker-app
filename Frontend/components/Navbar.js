

// import Link from 'next/link';
// import { useUser } from '../context/UserContext';

// export default function Navbar() {
//   const { user, logout } = useUser();

//   return (
//     <header className="navbar text-white py-4 px-6 rounded-b-lg shadow-md bg-indigo-600">
//       <div className="max-w-6xl mx-auto flex justify-between items-center">
//         <div className="text-2xl font-bold">Expense Tracker</div>
//         <div className="flex items-center space-x-4">
//           <Link href="/dashboard" className="px-3 py-1 bg-white/20 rounded-md">
//             Dashboard
//           </Link>

//           {user ? (
//             <>
//               <div className="text-sm">
//                 Hi, <span className="font-semibold">{user.email}</span>
//               </div>
//               <Link href="/profile" className="px-3 py-1 bg-white/20 rounded-md">
//                 Profile
//               </Link>
//               <button
//                 onClick={logout}
//                 className="px-3 py-1 bg-red-500 rounded-md text-white"
//               >
//                 Logout
//               </button>
//             </>
//           ) : (
//             <>
//               <Link href="/login" className="px-3 py-1 bg-white/20 rounded-md">
//                 Login
//               </Link>
//               <Link href="/signup" className="px-3 py-1 bg-white/20 rounded-md">
//                 Signup
//               </Link>
//             </>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// }

import Link from 'next/link';
import { useUser } from '../context/UserContext';

export default function Navbar() {
  const { user, logout } = useUser();

  return (
    <header className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 shadow-xl">
      {/* Background overlay with subtle pattern */}
      <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
      
      <div className="relative max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <Link href="/" className="group flex items-center space-x-3 transition-all duration-300 hover:scale-105">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300 backdrop-blur-md border border-white/30">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div className="text-2xl font-bold text-white group-hover:text-blue-100 transition-colors duration-300">
              Expense Tracker
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="flex items-center space-x-2">
            {/* Home Button */}
            <Link 
              href="/" 
              className="px-4 py-2 text-white/90 hover:text-white hover:bg-white/20 rounded-lg transition-all duration-300 font-medium backdrop-blur-sm border border-transparent hover:border-white/30 hover:shadow-lg"
            >
              Home
            </Link>

            {/* Dashboard Button */}
            <Link 
              href="/dashboard" 
              className="px-4 py-2 text-white/90 hover:text-white hover:bg-white/20 rounded-lg transition-all duration-300 font-medium backdrop-blur-sm border border-transparent hover:border-white/30 hover:shadow-lg"
            >
              Dashboard
            </Link>

            {user ? (
              <div className="flex items-center space-x-3">
                {/* Welcome Message */}
                <div className="hidden md:flex items-center px-3 py-2 bg-white/10 rounded-lg backdrop-blur-md border border-white/20">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-sm text-white/90">
                    Welcome, <span className="font-semibold text-white">{user.email.split('@')[0]}</span>
                  </span>
                </div>

                {/* Profile Button */}
                <Link 
                  href="/profile" 
                  className="px-4 py-2 text-white/90 hover:text-white hover:bg-white/20 rounded-lg transition-all duration-300 font-medium backdrop-blur-sm border border-transparent hover:border-white/30 hover:shadow-lg"
                >
                  Profile
                </Link>

                {/* Logout Button */}
                <button
                  onClick={logout}
                  className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 border border-red-400/30"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                {/* Login Button */}
                <Link 
                  href="/login" 
                  className="px-4 py-2 text-white/90 hover:text-white hover:bg-white/20 rounded-lg transition-all duration-300 font-medium backdrop-blur-sm border border-transparent hover:border-white/30 hover:shadow-lg"
                >
                  Login
                </Link>

                {/* Signup Button */}
                <Link 
                  href="/signup" 
                  className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-lg transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 border border-emerald-400/30"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>

      {/* Bottom border gradient */}
      <div className="h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
    </header>
  );
}