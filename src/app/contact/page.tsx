export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-24 text-center">
      <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
      <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed mb-8">
        Have questions about your next adventure? Reach out to our 24/7 support team.
      </p>
      
      <div className="flex justify-center">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-blue-500/25">
          Send a Message
        </button>
      </div>
    </div>
  );
}
