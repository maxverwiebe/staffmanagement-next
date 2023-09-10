import Layout from "@/components/dashboard/layout";
export default function Profile() {
    return (
        <Layout>
            <div className="flex items-center">
                <div className="flex-none mr-5">
                    <div className="relative">
                        <img
                            className="w-20 h-20 rounded-full ring-2 p-1 ring-green-300"
                            src="https://avatars.githubusercontent.com/u/66183307?v=4"
                            alt="Avatar"
                        />
                    </div>
                </div>
                <div className="flex-grow">
                    <h3 className="text-3xl font-bold text-neutral-400">Maximilian Verwiebe</h3>
                    <p className="text-xl text-neutral-600">@maxverwiebe</p>
                </div>
            </div>

            <hr className="w-48 h-1 my-6 bg-gray-100 border-0 rounded bg-neutral-700" />

            <div className="w-64">
                {/* Hier kannst du den Inhalt für den zweiten Bereich einfügen */}
                {/* Zum Beispiel: */}
                <div className="p-4 bg-white rounded-lg shadow-md">
                    <h4 className="text-xl text-neutral-400">Weitere Informationen</h4>
                    <p className="text-neutral-600">Hier könnten weitere Informationen stehen.</p>
                </div>
            </div>
        </Layout>
    );
}
