"use client";

export default function TestPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">
          ✅ Redirect Test Successful!
        </h1>
        <p className="text-gray-600">
          If you can see this page, the redirect mechanism is working.
        </p>
      </div>
    </div>
  );
}