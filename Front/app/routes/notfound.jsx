import { Link } from 'react-router';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
                <p className="text-xl text-gray-600 mb-8">页面未找到</p>
                <Link 
                    to="/login"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    返回登录页面
                </Link>
            </div>
        </div>
    );
}